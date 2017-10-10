import React, {PropTypes, Component} from 'react'
import {Map as IMap} from 'immutable'
import {BaseSlidePane, InlineNotification} from 'app/components/overlays'
import {PrimaryButton, Icon} from 'ui'
import {connect} from 'snugg-redux'
import downloadFile from 'util/downloadFile'
import * as f from 'data/formatters'
import {downloadHpxml} from 'data/actions'

@connect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const stageId = job.get('stage_id')
  const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
  const mayHaveUnmodeledChanges = f.job.mayHaveUnmodeledChanges(job)
  const stageType = stageId < 6 || stageId === 8 ? 'audit' : 'retrofit'
  return {
    stageId,
    hasUnmodeledChanges,
    mayHaveUnmodeledChanges,
    stageType,
    stageName: f.stages.currentStageName(stageId),
    program: state.fn.programByJobId(jobId),
    hasCalculated: job.get('has_calculated')
  }
}, {downloadHpxml})
export default class JobExportPane extends Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    program: PropTypes.instanceOf(IMap)
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  state = {
    isDownloading: false,
    error: ''
  }

  downloadAuditFile = (e) => {
    e.preventDefault()
    this.downloadFile('audit')
  }

  downloadRetrofitFile = (e) => {
    e.preventDefault()
    this.downloadFile('retrofit')
  }

  downloadFile(type: 'audit' | 'retrofit') {
    if (this.state.isDownloading) {
      return
    }
    this.setState({isDownloading: true})
    this.props.downloadHpxml(this.props.jobId)
      .then(async (data) => {
        if (data) {
          await downloadFile(data.hpxml, data.fileName, 'xml')
        }
        this.setState({isDownloading: false, error: null})
      })
      .catch(e => {
        this.setState({isDownloading: false, error: e.message})
      })
  }

  renderAudit() {
    // TODO: Ben - you may want to add a spinner icon while isDownloading
    const {
      state: {isDownloading}
    } = this
    return (
      <div>
        <p>The 'Audit' HPXML file is the appropriate file to download for stages up to and including 'Retrofit In Progress'.</p>
        <PrimaryButton onClick={this.downloadAuditFile}>
          {isDownloading ?
            <span>
              <Icon type='loading' size={25} animation='spin' float='right'/> {' '}
              Downloading...
            </span>
          :
            <span>
              <Icon type='export' float='right'/> {' '}
              Download Audit File
            </span>
          }
        </PrimaryButton>
      </div>
    )
  }

  renderRetrofit() {
    const {isDownloading} = this.state
    return (
      <div>
        <p>The 'Retrofit' HPXML file is the appropriate file to download for the stage 'Retrofit Complete' or later.</p>
        <h5>Before downloading this file, make sure you completed these three important steps:</h5>
        <ol style={{paddingLeft: 20}}>
          <li>Update all recommended items on the refine screen to match the items that were actually installed.</li>
          <li>Edit costs and improved values of each recommendation to reflect the installed cost and installed improved values.</li>
          <li>Click on the 'Model it' button to load the appropriate energy savings.</li>
        </ol>
        <PrimaryButton onClick={this.downloadRetrofitFile}>
          {isDownloading ?
            <span>
              <Icon type='loading' size={25} animation='spin' float='right'/> {' '}
              Downloading...
            </span>
          :
            <span>
              <Icon type='export' float='right'/> {' '}
              Download Retrofit File
            </span>
          }
        </PrimaryButton>
      </div>
    )
  }

  renderPreviousFileDownload() {
    const {
      props: {stageType}
    } = this
    if (stageType !== 'retrofit') {
      return null
    }
    return (
      <div style={{marginTop: '40px'}}>
        <p>If you need to download the previous 'Audit' HPXML file,
          <a href="#" onClick={this.downloadAuditFile}> download here</a>
        </p>
      </div>
    )
  }

  renderErrors() {
    if (this.state.error) {
      return (
        <div>
          <h4 className="text-danger">Errors:</h4>
          <p className='bg-warning' style={{padding: '20px'}}>{this.state.error}</p>
        </div>
      )
    }
  }

  renderProgramHelp = () => {
    const program = this.props.program
    const help = program.get('programHelp')
    if (help) {
      return (
        <div className="well" style={{marginTop: 40, padding: 10}}>
          <h5>Program information for {program.get('name')}</h5>
          <div dangerouslySetInnerHTML={{__html: help}} />
        </div>
      )
    }
  }

  renderHasCalculated() {
    const {hasUnmodeledChanges, mayHaveUnmodeledChanges} = this.props
    return (
      <div>
        {hasUnmodeledChanges && !mayHaveUnmodeledChanges ?
          <InlineNotification
            title="Modeling Required"
            message={
              `This HPXML file may be obsolete.
              Please model this job to ensure you have the latest HPXML file.`}
            theme="error" />
          : null
        }
        {mayHaveUnmodeledChanges ?
          <InlineNotification
          message={
            `Be sure to model this job if it has any unmodeled changes.
            This will update the HPXML file if needed.`
          }
          theme="warning" />
          : null
        }
        {this.props.stageType === 'audit'
          ? this.renderAudit()
          : this.renderRetrofit()}
        {this.renderErrors()}
        <h5>
          <small>If this isn't the correct, HPXML file, make sure you set the appropriate stage for this job. You can do this at the top of this screen by clicking on the name and address.</small>
        </h5>
        {this.renderProgramHelp()}
        {this.renderPreviousFileDownload()}
      </div>
    )
  }

  renderHasNotCalculated() {
    return (
      <div>
        <h4>This job has not yet been modeled</h4>
        <p className='bg-warning' style={{padding: '20px'}}>The job needs to be calculated before an HPXML file can be generated</p>
      </div>
    )
  }

  render() {
    const {stageName, hasCalculated} = this.props
    return (
      <BaseSlidePane {...this.props} className="pane-export-job" title="Export HPXML File">
        <div style={{padding: "0 20px"}}>
          <h5 style={{paddingTop: 10}}>Current Stage: {stageName}</h5>
          {hasCalculated
            ? this.renderHasCalculated()
            : this.renderHasNotCalculated()
          }
        </div>
      </BaseSlidePane>
    )
  }
}
