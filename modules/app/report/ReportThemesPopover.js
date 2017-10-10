import React from 'react'
import {REPORT_THEMES} from 'data/constants'
import {connect} from 'snugg-redux'
import dimensions from 'util/dimensions'
import {Popover} from 'react-bootstrap'
import dynamicResize from 'decorators/dynamicResize'
import {dispatchSave} from 'data/actions'

@connect(null, {dispatchSave})
class ThemeButton extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  updateTheme(e) {
    e.preventDefault()
    this.props.dispatchSave('reports', {
      job_id: this.context.jobId,
      theme: this.props.index
    })
  }

  render() {
    let {theme, index} = this.props
    return (
      <button className="btn btn-brand-5" onClick={(e) => this.updateTheme(e)}>
        <div className={`report-theme theme-swatch-${index} pull-left`} />
        <span style={{paddingTop: 10, display: 'block'}}>
          {theme}
        </span>
      </button>
    )
  }
}

@dynamicResize
export default class ReportThemesPopover extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  render() {
    let {windowHeight} = dimensions
    const {jobId, ...props} = this.props
    return (
      <Popover {...props} placement="bottom" id="report-themes" className="popover-header popover-report-themes">
        <div className="popover-scrollable-content"
             style={{maxHeight: windowHeight - 220}} >
          <form className="form-horizontal">
            <div className="themes-list">
              {REPORT_THEMES.map((theme, index) => (
                <ThemeButton theme={theme} index={index + 1} jobId={jobId} key={'i' + index} />
              ))}
            </div>
          </form>
        </div>
      </Popover>
    )
  }
}
