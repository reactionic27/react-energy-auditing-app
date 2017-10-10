// Note: To get diffs that ignore whitespace within tags I had to run the original
// OM XML through xml2js and back again. This allows me to diff it against a standard format
// assumption: XMLA -> JS -> XMLB converts so XMLA === XMLB
import React, {Component} from 'react'
import shallowEquals from 'shallow-equals'
import {get} from '../../util/network'
import Fields from 'fields'
import {Row, Col} from 'ui'
import localForm from '../../decorators/localFormDecorator'
import {connect} from 'snugg-redux'
import difflib from 'jsdifflib' // Using https://github.com/ForbesLindesay/jsdifflib (not cemerick's)
import {IsUpdatingMessage, HESScoreTable} from './hpxml-components'
import hpxmlInsertions from '../../data/hpxml/hpxmlInsertions'
import {HPXML_STAGES} from '../../data/constants'
import {prettyPrintXML} from '../../data/hpxml/hpxmlUtils'
import * as f from 'data/formatters'

const STAGE_OPTIONS = Array.from(HPXML_STAGES.values())
require('../../../src/css/jsdifflib.css')


@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const stage_id = job.get('stage_id')
  const type = stage_id < 6 || stage_id === 8 ? 'audit' : 'retrofit'
  const initialStage2 = type === 'audit'
    ? 'proposed workscope'
    : 'job completion testing/final inspection'
  return {
    jobId: jobId,
    hesScores: f.hes.hesScoresByType(state.fn.hesScoresByJobId(jobId)),
    hasCalculated: job.get('has_calculated'),
    initialStage2,
    modelAsMentor: !!state.fn.loggedInUser().get('hes_mentor')
  }
})
@localForm
export default class DebugHPXML extends Component {

  constructor(props) {
    super(props)
    this.state = {
      form: {
        source: 'download',
        diff_type: 'split',
        is_compact: 1,
        stage1: 'audit',
        stage2: props.initialStage2,
        transaction_type: 'create',
        hes_hpxml_building_node: 'base'
      },
      originalXML: '',
      modifiedXML: '',
      hesScores: '',
      isReady: false,
      isUpdating: false,
      isHESModeling: false,
      errors: ''
    }
  }

  componentDidMount() {
    this.fetchHPXML()
  }

  componentDidUpdate(prevProps, prevState) {
    if (!shallowEquals(this.state.form, prevState.form)) {
      this.fetchHPXML()
    }
  }

  async fetchHPXML() {
    this.setState({isUpdating: true})
    const {
      props: {hasCalculated, jobId: job_id, modelAsMentor},
      state: {
        form: {stage1, stage2, transaction_type, source}
      }
    } = this

    try {
      if (hasCalculated) {
        const {hpxml} = await get(`/api/jobs/${job_id}/hpxml`)
        const originalXML = await prettyPrintXML(hpxml)
        this.setState({originalXML})
        const {hpxml: modifiedXML} = await this.props.dispatch(async (dispatch, getState) => {
          const state = getState()
          const {hpxml: snuggXML} = await hpxmlInsertions({
            hpxml,
            transaction_type,
            source: 'download',
            stage1,
            stage2,
            job_id,
            state,
          })
          if (source === 'download') {
            return {hpxml: snuggXML}
          } else if (source === 'hes') {
            return await hpxmlInsertions({
              hpxml: snuggXML,
              transaction_type,
              source,
              stage1,
              stage2,
              job_id,
              state,
              modelAsMentor
            })
          }
        })
        this.setState({modifiedXML})
      }
    } catch (e) {
      this.setState({errors: e.message})
    } finally {
      this.setState({isUpdating: false, isReady: true})
    }
  }

  renderXMLDiff() {
    if (this.state.form.diff_type === 'no-diff') {
      return <pre className="prettyprint">{this.state.originalXML}</pre>
    } else {
      const diff = getDiff(this.state)
      return <div dangerouslySetInnerHTML={{__html: (diff.outerHTML || '')}} />
    }
  }

  render() {
    const {
      props: {hasCalculated, hesScores},
      state: {originalXML, snuggXML, isUpdating, isHESModeling, isReady},
    } = this

    if (!hasCalculated) {
      return (
        <div>
          <h4>This job has not yet been calculated</h4>
          <p className='bg-warning' style={{padding: '20px'}}>The job needs to be calculated before an HPXML file can be generated</p>
        </div>
      )
    }

    if (!isReady) {
      return (
        <div>
          <h3>Loading XML.</h3>
          <p>It's possible there is no XML. Try modeling if this doesn't load after a minute</p>
        </div>
      )
    }

    return (
      <div>
        {isUpdating && <IsUpdatingMessage />}

        <Row style={{paddingTop: 10, paddingBottom: 10}}>
          <Col sm={12}>
            <Fields.Radio bare {...this.stateField('source')} bsSize="sm" style={controlStyles} options={[
              ['download', 'OM | Snugg'],
              ['hes', 'OM | HES']
            ]} />
            <Fields.Radio bare {...this.stateField('diff_type')} bsSize="sm" style={controlStyles} options={[
              ['split', 'Side-by-side'],
              ['inline', 'Inline'],
              ['no-diff', 'No Diff']
            ]} />
            <Fields.Radio bare {...this.stateField('is_compact')} bsSize="sm" style={controlStyles} options={[
              [1, 'Compact'],
              [0, 'Expanded']
            ]} />
            <button type="button" onClick={this.modelHES} className="btn btn-default btn-xs" style={controlStyles}>
              <div style={{fontSize: 18}}>
                <i className={`ico-budicon-48 ${isHESModeling && "ico-spin"}`}> </i>
                Model HES
              </div>
            </button>

            <FileDownload content={originalXML} filename='OM.xml' label='OM' />
            <FileDownload content={snuggXML} filename='Snugg.xml' label='Snugg' />
            {/*<FileDownload content={hesXML} filename='HES.xml' label='HES' />*/}
          </Col>
        </Row>

        <Row>
          <Col sm={4}>
            <Fields.Select
              bsSize="sm"
              label="HPXML Stages (Base):"
              size={8}
              {...this.stateField('stage1')} options={STAGE_OPTIONS} />
            <div className="clearfix" />
            <Fields.Select
              bsSize="sm"
              label="HPXML Stages (Improved):"
              size={8}
              {...this.stateField('stage2')} options={STAGE_OPTIONS} />
          </Col>
          <Col sm={8}>
            <h5>HPXML Building Node: <small>Determines whether HPXML translator sends the Base or Improved HPXML &lt;Building&gt; node to HES</small></h5>
            <Fields.Radio bare {...this.stateField('hes_hpxml_building_node')} bsSize="sm" options={['base', 'improved']} />
            <div className="clearfix" />
            <h5>HPXML Transaction Type: <small>Determines whether the HES Asessment Type is regular ('create') or corrected ('update')</small></h5>
            <Fields.Radio bare {...this.stateField('transaction_type')} bsSize="sm" options={['create', 'update']} />
          </Col>
        </Row>

        <Row>
          <Col md={10}>
            <HESScoreTable hesScores={hesScores} />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col sm={10}>
            {this.state.errors && (
              <div>
                <h4 className="text-danger">Errors:</h4>
                <p className='bg-warning' style={{padding: '20px'}}>{this.state.errors}</p>
              </div>
            )}
            {this.renderXMLDiff()}
          </Col>
        </Row>

      </div>
    )
  }
}


function FileDownload({content, filename, label}) {
  return (
    <a href={'data:text/plain;charset=utf-8,' + encodeURIComponent(content)}
      download={filename}
      className="btn btn-default btn-xs"
      style={{marginLeft: 10}}>
      <div style={{fontSize: 18}}>
        <i className="ico-budicon"> </i>
        {label}
      </div>
    </a>
  )
}

function getDiff(state) {
  const {
    originalXML,
    modifiedXML,
    form: {diff_type, is_compact}
  } = state
  let opts = {
    baseText: originalXML,
    newText: modifiedXML,
    baseTextName: "OM XML",
    newTextName: "Modified XML",
    // TODO: Make sure contextSize works properly after there is something to diff
    contextSize: is_compact ? 8 : false,
    inline: diff_type === 'inline'
  }
  return difflib.buildView(opts)
}

const controlStyles = {
  float: 'left',
  marginLeft: 10
}
