import React from 'react'
import {connectSelector, connect} from 'snugg-redux'
import {Row} from 'ui'
import {Dropdown, MenuItem} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import _ from 'lodash'

@connectSelector({
  companyName: (state, props) => {
    const {companyId} = props
    return state.fn.companyById(companyId).get('name')
  },
  currentCompanies: (state) => {
    return state.fn.companiesByUser(state.fn.loggedInUser())
  },
  accountId: state => state.fn.loggedInUser().get('id')
})
export class CompanySelectDropdown extends React.Component {

  handleClick(href, e) {
    e.preventDefault()
    browserHistory.push(href)
  }
  render() {
    const {
      props: {currentCompanies, companyId, companyName}
    } = this
    const sortedCurrentCompanies = _.sortBy(currentCompanies, (c) => c.get('name').toLowerCase())
    return (
      <Row>
        <Dropdown bsSize="large" id="btn-group-companies">
          <Dropdown.Toggle bsSize="large">
            <CompanyRow id={companyId} name={companyName} />
            <div className="arrow-right hidden-xs"></div>
            <div className="arrow-right arrow-right-border hidden-xs"></div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sortedCurrentCompanies.map(company => {
              const {id, name} = company.toJS()
              const href = `/joblist/${id}`
              return (
                <MenuItem
                id={id}
                name={name}
                onClick={this.handleClick.bind(this, href)}
                href={href}
                key={id} eventKey={id} active={id === companyId}
                >
                  <CompanyRow id={id} name={name} />
                </MenuItem>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    )
  }
}

@connect((state, {id}) => {
  const activityTracking = state.fn.activityTrackingByCompanyAndUser(id, state.fn.loggedInUser().get('id')) || []
  const jobsWithActivity = activityTracking.filter(activity => activity.get('unread_count') > 0)
  return {
    activityCount: jobsWithActivity.size || ''
  }
})
class CompanyRow extends React.Component {
  render() {
    const {name, activityCount} = this.props
    return (
      <div style={{height: 18}}>
        <span style={visibleLabel}>
          {name}
        </span>
        {activityCount > 0 ? <span className="badge pull-right" style={{position: 'relative'}}><span style={triangleStyle}></span>{activityCount}</span> : null }
      </div>
    )
  }
}


const visibleLabel = {
  textAlign: 'left',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '75%',
  display: 'inline-block'
}
const triangleStyle = {
  width: 0,
  height: 0,
  borderTop: '4px solid transparent',
  borderBottom: '4px solid transparent',
  borderRight:'6px solid #333',
  position: 'absolute',
  left:-5,
  bottom: 0,
  top: 0,
  margin:'auto'
}
