import React, {Component} from 'react'
import CreateNewJobForm from './CreateNewJobForm'
import CreateNewTemplateForm from './CreateNewTemplateForm'
import {segmentsType} from 'data/types'
import {connect} from 'snugg-redux'
import {browserHistory} from 'react-router'

@connect((state, props) => {
  const companyId = props.params && props.params.companyId
  const user = state.fn.loggedInUser()
  const companies = state.fn.companiesByUser(user)
  const authorizedCompany = companies.find((company) => company.get('id') === companyId)
  return {
    authorizedCompany,
    companyId
  }
})
export default class CreateJobContainer extends Component {
  componentDidMount() {
    const pathname = window.location.pathname
    if (!this.props.authorizedCompany && pathname !== '/create-job' && pathname.startsWith('/create-job')) {
      browserHistory.push('/create-job')
    }
  }

  render() {
    const isTemplate = this.props.segments.one === 'create-template'
    return (
      <div key={this.props.companyId}>
        <div style={{paddingTop: 40}}>
          {isTemplate ? <CreateNewTemplateForm {...this.props} /> : <CreateNewJobForm {...this.props} />}
        </div>
      </div>
    )
  }
}

CreateJobContainer.propTypes = {
  segments: segmentsType
};
