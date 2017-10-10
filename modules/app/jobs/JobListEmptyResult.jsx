import React from 'react'
import {Link} from 'react-router'
import Radium from 'radium'
import {InlineNotification} from 'app/components/overlays'

var Styles = {
  li: {
    marginBottom: 8
  }
}

class EmptyResult extends React.Component {

  static propTypes = {
    companyId: React.PropTypes.number.isRequired,
    filterType: React.PropTypes.oneOf(['search', 'stage', 'company']).isRequired,
  };

  renderEmptySearch() {
    return (
      <InlineNotification>
        <h4>No jobs found.</h4>
        <h5>Here are some possible reasons why you're seeing this message:</h5>
        <ol>
          <li style={Styles.li}>Your search query is too specific.
          </li>
          <li style={Styles.li}>You may be searching in the wrong company's jobs – if you work across multiple companies.
          </li>
          <li style={Styles.li}>You may be looking for a job that was performed in a very old version of Snugg Pro.
          </li>
        </ol>
      </InlineNotification>
    )
  }

  renderEmptyStages() {
    return (
      <InlineNotification>
        <h4>There are no jobs in this stage</h4>
        <p><Link to={`/joblist/${this.props.companyId}`}>View all your jobs here.</Link></p>
      </InlineNotification>
    )
  }

  renderEmptyCompany() {
    return (
      <InlineNotification>
        <h4>You do not have any jobs for this company yet.</h4>
        <p><Link to={`/create-job/${this.props.companyId}`}>You can create a job here.</Link></p>
      </InlineNotification>
    )
  }

  render() {
    switch (this.props.filterType) {
      case 'search': return this.renderEmptySearch()
      case 'stage': return this.renderEmptyStages()
      case 'company': return this.renderEmptyCompany()
      default: return null
    }
  }

};

export default Radium(EmptyResult)
