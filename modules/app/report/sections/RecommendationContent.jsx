import * as f from 'data/formatters'
import {Map as IMap, List as IList} from 'immutable'
import React from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {connect} from 'react-redux'
import imagesLoaded from 'vendor/images-loaded'
import withContext from 'util/withContext'
import ReportNotes from 'app/report/components/ReportNotesBlock'
import ReportPhotoRow from 'app/report/components/ReportPhotoRow'
import NowAndGoal from '../components/NowAndGoal'
import PaginatingPhotoRow from '../components/PaginatingPhotoRow'
import * as c from 'data/constants'
import {getNowAndGoalFn} from 'data/definition-helpers'

function recommendationContentData(state, {uuid, jobId, recDefId, health}) {
  const report = state.fn.reportByJobId(jobId)
  const hasCaptionRows = report.get('element_photos')
  const captionRows = hasCaptionRows ? state.fn.captionRowsByRecUuid(uuid) : null
  return {
    jobId,
    uuid,
    health,
    hasCaptionRows,
    captionRows,
    recDefId,
    hasHomeownerNotes: report.get('element_homeowner_notes'),
    hasContractorNotes: report.get('element_contractor_notes'),
    hasNowAndGoal: recDefId && report.get('element_now_and_goal'),
    elementSortOrder: report.get('element_sort_order') || DEFAULT_SORT_ORDER
  }
}
const DEFAULT_SORT_ORDER = IList(c.ELEMENT_SORT)

@connect(recommendationContentData)
export default class RecommendationContent extends React.Component {

  renderElement = (element) =>  {
    const {
      props: {jobId, uuid, captionRows, hasCaptionRows, hasHomeownerNotes, hasContractorNotes, hasNowAndGoal, recDefId, printing}
    } = this
    if (element === 'element_photos' && hasCaptionRows) {
      return (
        <div key='element_photos'>
          {captionRows.map(row => (
            <ReportPhotoRow key={row.get('uuid')} uuid={row.get('uuid')} captionRow={row} />
          ))}
          <Snugg.Buttons.CollectionAdd bare collection="recommendationCaptionRows" variant="light" label="Add a caption row" recUuid={uuid} />
        </div>
      )
    } else if (element === 'element_homeowner_notes' && hasHomeownerNotes) {
      return <ReportNotes key='element_homeowner_notes' uuid={uuid} field="Notes to Homeowners" printing={printing} />
    } else if (element === 'element_contractor_notes' && hasContractorNotes) {
      return <ReportNotes key='element_contractor_notes' uuid={uuid} field="Notes to Contractors" printing={printing} />
    } else if (element === 'element_now_and_goal' && hasNowAndGoal) {
      return <NowAndGoal key='element_now_and_goal' uuid={uuid}  recDefId={recDefId} jobId={jobId} />
    }
    return null
  }

  render() {
    const {elementSortOrder} = this.props
    return (
      <div>
        {elementSortOrder.map((element) => {
          return this.renderElement(element)
        })}
      </div>
    )
  }
}

RecommendationContent.paginating = {
  getAllData(state, props) {
    const data = recommendationContentData(state, props)
    const rec = state.fn.recByUuid(props.uuid)
    const homeownerNotes = data.hasHomeownerNotes
      ? f.report.trimContent(rec.get('homeowner_notes'))
      : null
    const contractorNotes = data.hasContractorNotes
      ? f.report.trimContent(rec.get('contractor_notes'))
      : null
    return {
      ...data,
      homeownerNotes,
      contractorNotes
    }
  },

  // Kind of a complex paginator, we need to add all of the caption rows first.
  // Then we need to add all fo the report notes, finally we need to add the
  // now & goal if we're in a recommendation. Each of these will need checks to
  // ensure they are actually enabled / visible.
  paginate: function* (node, elements, store) {
    const {jobId, uuid, recDefId, elementSortOrder} = elements
    const nowAndGoal = recDefId && getNowAndGoalFn(recDefId)
    const state = store.getState()
    let pages = []
    let pageCount = 0
    let currentHtmlStrings = []

    function measure(node) {
      return node.clientHeight <= 650
    }

    function* addAndMeasure(str, awaitImage = false) {
      const html = currentHtmlStrings.concat(str).join('')
      node.innerHTML = html
      if (awaitImage) {
        let imgLoad = imagesLoaded(node)
        yield new Promise((resolver) => {
          const onAlways =  () => {
            window.requestAnimationFrame(resolver)
          }
          imgLoad.on('always', onAlways)
        })
      }
      return measure(node)
    }

    function renderPhotoRow(captionRow: IMap) {
      return function photoRowRenderer(content: string, hidePhotos: boolean = false) {
        return renderToStaticMarkup(withContext({store, jobId, printing: true}, () => (
          <PaginatingPhotoRow captionRow={captionRow} hidePhotos={hidePhotos} content={content || ''} />
        )))
      }
    }

    function homeownerNotesRenderer(content: string, hideHeader: boolean = false) {
      return renderToStaticMarkup(withContext({store, jobId, printing: true}, () => (
        <ReportNotes
          key='element_homeowner_notes'
          uuid={uuid}
          field="Notes to Homeowners"
          content={content || ''}
          hideHeader={hideHeader}
          printing />
      )))
    }

    function contractorNotesRenderer(content: string, hideHeader: boolean = false) {
      return renderToStaticMarkup(withContext({store, jobId, printing: true}, () => (
        <ReportNotes
          key='element_contractor_notes'
          uuid={uuid}
          field="Notes to Contractors"
          content={content || ''}
          hideHeader={hideHeader}
          printing />
      )))
    }

    function nowAndGoalRenderer(content, hideHeader) {
      return renderToStaticMarkup(withContext({store, jobId, printing: true}, () => (
        <NowAndGoal
          key='element_now_and_goal'
          uuid={uuid}
          recDefId={recDefId}
          jobId={jobId}
          content={content}
          hideHeader={hideHeader} />
      )))
    }

    function* renderNotes(renderer, content, shouldAwait = false) {
      let htmlPart, prevHTML, contentPart
      let splitText = f.str.splitNewlines(content || '')
      const allContent = splitText.join(' ')
      const html = renderer(allContent)


      function generator(items) {
        function * Generator() {
          yield* items
        }
        return Generator()
      }

      let splitTextGen = generator(splitText)
      if (yield addAndMeasure(html, shouldAwait)) {
        currentHtmlStrings.push(html)
      } else {
        let sliceCount = 0
        let hideHeader = false
        while (sliceCount < splitText.length) {
          splitTextGen.next()
          contentPart = splitText.slice(0, sliceCount + 1).join(' ')
          htmlPart = renderer(contentPart, hideHeader)
          if (yield addAndMeasure(htmlPart, shouldAwait)) {
            sliceCount++
            prevHTML = htmlPart
            continue
          }
          let sentenceCount = 0
          let sentences = splitText[sliceCount].split('. ')
          const sentenceGen = generator(sentences)
          while (sentenceCount <= sentences.length) {
            sentenceGen.next()
            let contentArray = splitText.slice(0, sliceCount)
            contentArray = contentArray.concat(
                              sentences.slice(0, sentenceCount + 1).join('. ') + '.'
                           )
            contentPart = contentArray.join(' ')
            htmlPart = renderer(contentPart, hideHeader)
            if (yield addAndMeasure(htmlPart, shouldAwait)) {
              sentenceCount++
              prevHTML = htmlPart
              continue
            }

            let wordCount = 0
            let words = sentences[sentenceCount].split(' ')
            const wordsGen = generator(words)
            while (wordCount <= words.length) {
              wordsGen.next()
              let contentArray = splitText.slice(0, sliceCount)
              contentArray = contentArray.concat(
                              sentences.slice(0, sentenceCount).join('. ') + '.'
                           )
              contentArray = contentArray.concat(words.slice(0, wordCount + 1))
              contentPart = contentArray.join(' ')
              htmlPart = renderer(contentPart, hideHeader)
              if (yield addAndMeasure(htmlPart, shouldAwait)) {
                wordCount++
                prevHTML = htmlPart
                continue
              }
              break
            }
            sentences = sentences.slice(sentenceCount + 1)
            words = words.slice(wordCount)
            const remainingLine = words.join(' ')
            sentences.unshift(remainingLine)
            const remainingPara = sentences.join('. ')
            splitText = splitText.slice(sliceCount + 1)
            splitText.unshift(remainingPara)
            break
          }
          if (prevHTML) {
            currentHtmlStrings.push(prevHTML)
            hideHeader = true
          }
          pages.push(currentHtmlStrings)
          currentHtmlStrings = []
          htmlPart = ''
          prevHTML = ''
          sliceCount = 0
          splitTextGen = generator(splitText)
          pageCount++
        }
        htmlPart && currentHtmlStrings.push(htmlPart)
      }
    }

    function* ElementSortOrderGen() {
      yield* elementSortOrder.toArray()
    }

    const captionRows = elements.hasCaptionRows && elements.captionRows.filter(notEmptyCaption)
    function* CaptionRowsGen() {
      yield* captionRows || []
    }

    const elementSortOrderGen = ElementSortOrderGen()
    for (let elementIndex = 0; elementIndex < elementSortOrder.size; elementIndex++) {
      const element = elementSortOrderGen.next().value
      if (element === 'element_photos' && elements.hasCaptionRows) {
        const captionRowsGen = CaptionRowsGen()
        for (let captionRowIndex = 0; captionRowIndex < captionRows.length; captionRowIndex++) {
          const captionRow = captionRowsGen.next().value
          const captionText = (captionRow.get('caption') || '').trim()
          const captionRowRenderer = renderPhotoRow(captionRow)
          yield renderNotes(captionRowRenderer, captionText, true)
        }
      }

      if (element === 'element_homeowner_notes' && elements.homeownerNotes) {
        const homeownerNotes = state.snugg.getIn(['recommendations', uuid, 'homeowner_notes'])
        yield renderNotes(homeownerNotesRenderer, homeownerNotes)
      }

      if (element === 'element_contractor_notes' && elements.contractorNotes) {
        const contractorNotes = state.snugg.getIn(['recommendations', uuid, 'contractor_notes'])
        yield renderNotes(contractorNotesRenderer, contractorNotes)
      }

      if (element === 'element_now_and_goal' && elements.hasNowAndGoal) {
        let html, prevHTML
        let values = nowAndGoal(state, jobId).filter(
          ([field, nowGoal]) => !empty(nowGoal[0]) || !empty(nowGoal[1])
        )
        let valueCount = 0
        let hideHeader = false
        while (valueCount <= values.length) {
          if (valueCount === 0) {
            html = nowAndGoalRenderer(values, hideHeader)
            if (yield addAndMeasure(html)) {
              currentHtmlStrings.push(html)
              break
            }
          }
          const content = values.slice(0, valueCount + 1)
          html = nowAndGoalRenderer(content, hideHeader)
          if (yield addAndMeasure(html)) {
            valueCount++
            prevHTML = html
            continue
          }
          currentHtmlStrings.push(prevHTML)
          pages.push(currentHtmlStrings)
          currentHtmlStrings = []
          values = values.slice(valueCount)
          valueCount = 0
          hideHeader = true
          prevHTML = ''
          pageCount++
        }
      }
    }

    if (currentHtmlStrings.length > 0) {
      pages.push(currentHtmlStrings)
    }

    // If there are no pages, but this is a recommended recommendation,
    // (determined by the presence of recDefId)
    // we need to display that:
    if (pages.length === 0 && (elements.recDefId || elements.health)) {
      pages = [[]]
    }
    pages = pages.map((page) => {
      return page.join ? page.join(' ') : page
    })
    return pages
  }

};

function notEmptyCaption(captionRow: IMap) {
  return Boolean(
    captionRow.get('left_photo_url') ||
    captionRow.get('right_photo_url') ||
    (captionRow.get('caption') || '').trim()
  )
}

function empty(val) {
  return val === undefined || val === null || val === ''
}
