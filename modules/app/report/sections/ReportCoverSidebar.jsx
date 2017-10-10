import React from 'react'
import {Map as IMap} from 'immutable'
import {pureConnect} from 'snugg-redux'
import {Clearfix} from 'react-bootstrap'
import * as f from 'data/formatters'
import moment from 'moment'

@pureConnect((state, {jobId}) => {
  const job = state.fn.jobById(jobId)
  const account = job.get('is_template') ? IMap({}) : state.fn.accountByJobId(jobId)
  const isTemplate = job.get('is_template')
  const company = state.fn.companyByJobId(jobId) || IMap({})
  const displayTitle = f.accountCompany.displayTitle(state, jobId)
  const displayEmail = f.accountCompany.displayEmail(state, jobId)
  return {
    job: job,
    isTemplate: isTemplate,
    account,
    company,
    displayTitle,
    displayEmail
  }
})
export default class ReportCoverSidebar extends React.Component {

  render() {
    const {job, account, company, isTemplate, displayTitle, displayEmail} = this.props

    // fall back values when job is template:
    const jobName = isTemplate ?  "Customer name" : f.job.fullName(this.props.job)
    const jobAddress1 = isTemplate ? "Home Address" : job.get('address_1')
    const jobCityStateZip = isTemplate ? "City State, ZIP" : `${job.get('city')} ${job.get('state')}, ${job.get('zip')}`
    const jobPhone = isTemplate ? "Customer phone number" : job.get('home_phone')
    const jobEmail = isTemplate ? "Customer email" : f.report.formatLongEmail(job.get('email'))
    const jobDate = isTemplate ? "Month Day, Year" : moment.utc(job.get('service_time')).format('MMM D, YYYY')
    const jobTime = isTemplate ? "Time of day" : moment.utc(job.get('service_time')).format("hh:mm a")

    const accountName = isTemplate ? "User name" : `${account.get('first_name')} ${account.get('last_name')}`
    const accountTitle = isTemplate ? "User title" : displayTitle
    const accountCertifications = isTemplate ? "User certifications" : account.get('certifications')
    const accountPhone = isTemplate ? "User phone number" : account.get('phone_number')
    const accountEmail = isTemplate ? "User email" : f.report.formatLongEmail(displayEmail)
    const accountHours = isTemplate ? "User hours" : <span dangerouslySetInnerHTML={{__html: account.get('hours_of_operation')}} />

    const companyName = isTemplate ? "Company Name" : company.get('name')
    const companyAddress1 = isTemplate ? "Company Address" : company.get('address_1')
    const companyCityStateZip = isTemplate ? "City, State, Zip" : `${company.get('city')} ${company.get('state')}, ${company.get('zip')}`
    const companyPhone = isTemplate ? "Co. Phone Number" : company.get('phone')
    const companyHours = isTemplate ? "Hours of operation" : <span dangerouslySetInnerHTML={{__html: company.get('hours_of_operation')}} />

    return (
      <div>
        <h3>Home</h3>
        <address className="break-word">
          {jobName}
          <br />
          {jobAddress1}
          <br />
          {job.get('address_2')}
          {job.get('address_2') && <br />}
          {jobCityStateZip}
          <br />
          {jobPhone}
          {jobPhone && {jobEmail} ? <br/> : null}
          {jobEmail}
        </address>

        <h3 className="editable-container">
          <Snugg.Input
            field='Report: Service Date Title'
            bare
            editable
            className='sidebar-placeholder editable' />
        </h3>
        {jobDate}<br />
        {jobTime}

        <h3 className="editable-container">
          <Snugg.Input
            field='Report: Serviced By Title'
            bare
            editable
            className='sidebar-placeholder editable' />
        </h3>
        <address className="break-word">
          <div style={styles.block}>
            <strong>{accountName}</strong>
            <Clearfix/>
            {accountTitle}
            <Clearfix/>
            {accountCertifications}
            <Clearfix/>
            {accountPhone}
            <Clearfix/>
            {accountEmail}
            <Clearfix/>
            {accountHours}
          </div>

          <div style={styles.block}>
            <strong>{companyName}</strong>
            <Clearfix/>
            {companyAddress1}
            <Clearfix/>
            {company.get('address_2')}
            <Clearfix/>
            {companyCityStateZip}
            <Clearfix/>
            Office: {companyPhone} <br />
            {companyHours}
          </div>
          <div style={styles.block}>
          </div>
          {job.get('program_id') === 23 &&
            <div style={styles.foe}>
              <h5><small>Proud to Partner with Focus on Energy</small></h5>
              <img src={"/img/programs/foe/logo-trade-ally.png"} width="100%" />
            </div>
          }
        </address>
      </div>
    )
  }
}

const styles = {
  block: {
    marginBottom: 10
  },
  foe: {
    position: 'absolute',
    right:10,
    bottom: 10,
    left: 10
  }
}
