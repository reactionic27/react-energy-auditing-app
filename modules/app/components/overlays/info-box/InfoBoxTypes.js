import React from 'react'
import {InfoBox, InfoBoxButton, InfoBoxHeader} from 'app/components/overlays'
import {Icon} from 'ui'

// These are the onboarding tour messages.
// Keeping them here instead of scattered throughout
// the app since we need to see and edit those together for coherence

export const InputInfoBox = (props) => (
  props.isSampleJob ?
    <InfoBox
      srcIcon="inputIcon"
      {...props} >
      <InfoBoxHeader>
        The Input Screen
        <span style={labelStyle}>Sample job tour</span>
        <span style={stepStyle}>1 of 5</span>
      </InfoBoxHeader>
      This is where you enter the existing values of the home.
      It's used to calculate base values.
      The more information you provide, the more accurate your results will be.<br/>
      <strong>Do this first: </strong>
      Change the job's zip code by clicking on the name & address at the top of this screen.<br/>
      Click the <span style={infoBoxHighlight}><Icon type="modeling"/> Model it</span>&nbsp;
      button in the sidebar after entering home data.
      <br/>
      <InfoBoxButton to={`/job/${props.jobId}/recommendations`} >Next: Refine Section ⇾</InfoBoxButton>
    </InfoBox>
  : null
)


export const RefineInfoBox = (props) => (
  props.isSampleJob ?
    <InfoBox
      srcIcon="refineIcon"
      {...props} >
      <InfoBoxHeader>
        The Refine Section
        <span style={labelStyle}>Sample job tour</span>
        <span style={stepStyle}>2 of 5</span>
      </InfoBoxHeader>
      There are three main aspects to this section: Recommended measures, notes and declined measures.
      Make sure you <strong>model the job first</strong> to see estimated costs and savings.
      You can add photos, captions, notes, and edit the base and improved values in this section.
      <br/>
      <InfoBoxButton to={`/job/${props.jobId}`} float="left" >⇽ Previous: Input Screen</InfoBoxButton>
      <InfoBoxButton to={`/job/${props.jobId}/financing`}>Next: Financing ⇾</InfoBoxButton>
    </InfoBox>
    : null
)

export const FinancingInfoBox = (props) => (
  props.isSampleJob ?
    <InfoBox
      srcIcon="financingIcon"
      {...props} >
      <InfoBoxHeader>
        Financing Options
        <span style={labelStyle}>Sample job tour</span>
        <span style={stepStyle}>3 of 5</span>
      </InfoBoxHeader>
      You can apply financing options to the job at hand and display it on the report's financing page. <br/>
      <strong>Pro Tip: </strong>Consider creating financing templates in the Settings section for options that you use fequently.

      <br/>
      <InfoBoxButton to={`/job/${props.jobId}/recommendations`} float="left" >⇽ Previous: Refine Section</InfoBoxButton>
      <InfoBoxButton to={`/job/${props.jobId}/report`}>Next: Edit the report ⇾</InfoBoxButton>
    </InfoBox>
  : null
)


export const ReportInfoBox = (props) => (
  props.isSampleJob ?
    <InfoBox
      srcIcon="reportIcon"
      {...props} >
      <InfoBoxHeader>
        Finetune the report
        <span style={labelStyle}>Sample job tour</span>
        <span style={stepStyle}>4 of 5</span>
      </InfoBoxHeader>
      This is where you edit the report. The company and auditor information can be modified in Settings.<br/>
      You can reorder pages by dragging and dropping them in the sidenav.<br/>
      The <span style={infoBoxHighlight}><Icon type="reportSettings"/> Settings</span> button above lets you show or hide pages and elements.
      <br/>Click the <span style={infoBoxHighlight}><Icon type="present"/> View/Print</span> button above when you're ready to present or print the report.
      <br/>
      <InfoBoxButton to={`/job/${props.jobId}/financing`} float="left">⇽ Previous: Financing</InfoBoxButton>
      <InfoBoxButton to={`/job/${props.jobId}/present`} >Next: Present and Print the report ⇾</InfoBoxButton>
    </InfoBox>
  : null
)



export const PrintInfoBox = (props) => (
  props.isSampleJob ?
    <InfoBox
      srcIcon="reportIcon"
      style={{width: 1005, marginLeft: 'auto', marginRight: 'auto'}}
      className="hidden-print"
    {...props} >
      <InfoBoxHeader>
        Present or Print The Report
        <span style={labelStyle}>Sample job tour</span>
        <span style={stepStyle}>5 of 5</span>
      </InfoBoxHeader>
      This is the home stretch. You can present on this screen or <strong>save this report as a PDF or print it </strong> by clicking the
      <span style={infoBoxHighlight}><Icon type="print"/></span> button.<br/>
      The 'Sample' watermark can be removed by converting this job to a paid job. Contact support if you'd like to do that.
      <br/>
      <InfoBoxButton to={`/job/${props.jobId}/report`} float="left">⇽ Previous: Edit the report </InfoBoxButton>
    </InfoBox>
  : null
)

const infoBoxHighlight = {
  backgroundColor: 'rgba(0,0,0,0.08)',
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 3,
  color: '#000'
}

const stepStyle = {
  float: 'right',
  color: "#777",
  fontSize: '0.8em',
  lineHeight: '1.5em',
  backgroundColor: 'rgba(0,0,0,0.07)',
  paddingRight: 5,
  paddingLeft: 5,
  borderRadius: 5
}

const labelStyle = {
  fontSize: '0.7em',
  lineHeight: '1.7em',
  color: "#999",
  paddingLeft: 5,
  paddingRight: 5,
  borderRadius: 5,
  marginLeft: 10,
  display: 'inline-block',
  fontWeight: 400,
  textTransform: 'uppercase'
}
