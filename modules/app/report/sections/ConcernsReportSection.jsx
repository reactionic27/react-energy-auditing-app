import React, {PropTypes} from 'react'
import * as f from 'data/formatters'
import pure from 'pure-render-decorator'
import {pureConnect} from 'snugg-redux'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import strip from 'util/strip'
import {Clearfix} from 'react-bootstrap'

class ConcernsSidebar extends React.Component {
  render() {
    const {printing} = this.props
    return <Snugg.Editable field="Report: Concerns Sidebar" placeholder="Click to edit" printing={printing}/>
  }
}

@pureConnect((state, {jobId}) => ({
  concerns: state.fn.concernsByJobId(jobId)
}))
class ConcernsContent extends React.Component {
  render() {
    const {concerns} = this.props
    return (
      <div>
        {concerns.map((concern) => {
          const uuid = concern.get('uuid')
          return (
            <div key={uuid}>
              <Snugg.Buttons.CollectionDelete uuid={uuid} collection="concern" float="right" />
              <h2 className="editable-container">
                <Snugg.Input uuid={uuid} field="Summary" bare editable placeholder="Click to Edit Title" />
              </h2>
              <Clearfix/>
              <div className="editable-container">
                <Snugg.Textarea rows="4" uuid={uuid} field="Detail" bare editable placeholder="Click to Edit" />
              </div>
            </div>
          )
        })}
        <Snugg.Buttons.CollectionAdd bare collection="concern" variant="light" label="Add a concern" />
      </div>
    )
  }
}

ConcernsContent.paginating = {
  getAllData(state, {jobId}) {
    const concerns = state.fn.concernsByJobId(jobId)
    return {concerns}
  },
  paginate: function* (node, elements = [], store) {
    let pages = []
    let currentHtmlStrings = []
    const {concerns} = elements

    function addAndMeasure(str) {
      node.innerHTML = currentHtmlStrings.concat(str).join('')
      return node.clientHeight <= 650
    }

    function concernRenderer(summary, detail, hideHeader) {
      let html = hideHeader ? '' : `<h2 style="padding-top: 8px; margin-bottom: 5px;">${summary}</h2>`
      html = html.concat(`<div>${detail}</div>`)
      return html
    }

    let concernCount = 0
    while (concernCount < concerns.length) {
      let hideHeader = false
      const concern = concerns[concernCount]
      const summary = strip`${concern.get('concern_summary')}`
      const detail = strip`${concern.get('concern_detail')}`
      let lines = f.str.splitNewlines(detail || '')
      let lineCount = 0
      let prevHTML = ''
      while (lineCount <= lines.length) {
        if (lineCount === 0) {
          let html = concernRenderer(summary, lines.join(' '), hideHeader)
          if (addAndMeasure(html)) {
            currentHtmlStrings.push(html)
            break
          }
        }
        let detailPart = lines.slice(0, lineCount + 1).join(' ')
        let htmlPart = concernRenderer(summary, detailPart, hideHeader)
        if (addAndMeasure(htmlPart)) {
          lineCount++
          prevHTML = htmlPart
          continue
        }
        let wordCount = 0
        let words = lines[lineCount].split(' ')
        while (wordCount <= words.length) {
          let contentArray = lines.slice(0, lineCount)
          contentArray = contentArray.concat(words.slice(0, wordCount + 1))
          detailPart = contentArray.join(' ')
          htmlPart = concernRenderer(summary, detailPart, hideHeader)
          if (addAndMeasure(htmlPart)) {
            wordCount++
            prevHTML = htmlPart
            continue
          }
          break
        }
        if (prevHTML) {
          currentHtmlStrings.push(prevHTML)
          hideHeader = true
        }
        words = words.slice(wordCount)
        const remainingLine = words.join(' ')
        lines = lines.slice(lineCount + 1)
        lines.unshift(remainingLine)
        pages.push(currentHtmlStrings)
        currentHtmlStrings = []
        lineCount = 0
        prevHTML = ''
      }
      concernCount++
    }
    if (currentHtmlStrings.length > 0) {
      pages.push(currentHtmlStrings)
    }
    pages = pages.map((page) => {
      return page.join ? page.join(' ') : page
    })
    return pages
  }
}

@pure
export default class ConcernsReportSection extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number,
    printing: PropTypes.bool
  }
  render() {
    const {jobId, printing} = this.context
    return (
      <ReportSection name="concerns" paginating={ConcernsContent.paginating}>
        <ReportHeader field='Report: Concerns Title' jobId={jobId} />
        <ReportBody>
          <ConcernsSidebar printing={printing} />
          <ConcernsContent jobId={jobId} />
        </ReportBody>
        <ReportFooter jobId={jobId} />
      </ReportSection>
    )
  }
}
