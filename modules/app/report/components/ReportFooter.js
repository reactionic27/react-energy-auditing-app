import React from 'react'
import {RCol} from 'ui'
import {connectSelector} from 'snugg-redux'
import * as f from 'data/formatters'
const SNUGG_LOGO = require('../../../../src/img/sp-logo-muted.png')

export function ReportFooterLeft({job, pageName, program}, {branding}) {

  if (pageName === 'cover' && !branding[`${pageName}SnuggBranding`]) {
    return <span style={{color: 'rgba(0,0,0,0.5)'}}># {job.get('id')}</span>
  }
  if (pageName === 'cover') {
    return (
      <div>
        Powered by
        <img src={SNUGG_LOGO} width="82" height="18" style={{'marginTop':'-5px', marginLeft: 5, height: 18, width: "auto" }} />
        <span style={{paddingLeft: 15, color: 'rgba(0,0,0,0.5)'}}># {job.get('id')}</span>
      </div>
    )
  }
  return (
    <div>
      {f.job.formattedName(job)}
      <span> | </span>
      {f.job.formattedAddress(job)}
    </div>
  )
}

ReportFooterLeft.contextTypes = {
  branding: React.PropTypes.object
}

export function ReportFooterRight({pageName, program}, {branding}) {
  const footerLogo = branding[`${pageName}FooterLogo`]
  const footerText = branding[`${pageName}FooterText`]
  const logoStyle = branding['footerLogoStyle'] || {}

  return (
    <div className="pull-right">
      {footerText && <span>{footerText} </span>}
      {footerLogo && <img src={footerLogo} className="program-logo-footer" style={logoStyle}/> }
    </div>
  )
}
ReportFooterRight.contextTypes = {
  branding: React.PropTypes.object
}

@connectSelector({
  program: (state, {jobId}) => state.fn.programByJobId(jobId),
  job: (state, {jobId}) => state.fn.jobById(jobId)
})
export default class ReportFooter extends React.Component {
  static propTypes = {
    jobId: React.PropTypes.number.isRequired
  };
  render() {
    const {props} = this

    if (props.children) {
      return (
        <div>{props.children}</div>
      )
    }

    return (
      <div className="report-footer">
        <RCol span={7}>
          <ReportFooterLeft {...props} pageName={props.sectionName} />
        </RCol>
        <RCol span={5}>
          <ReportFooterRight {...props} pageName={props.sectionName} />
        </RCol>
      </div>
    )
  }
}
