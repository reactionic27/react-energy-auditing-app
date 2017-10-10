import React from 'react'
import * as s from 'data/selectors'
import * as f from 'data/formatters'
import {connect} from 'snugg-redux'
import {Dropdown, MenuItem} from 'react-bootstrap'
import {Row} from 'ui'
import {take, takeRight} from 'lodash'
import {browserHistory} from 'react-router'
import filtered from '../../../../util/filtered'
import {syncJobListDropdownSelection} from 'data/actions'

@connect()
class StageItem extends React.Component {

  handleClick(href, e) {
    e.preventDefault()
    browserHistory.push(href)
    this.props.dispatch({
      type: 'local/clearJobSelect'
    })
    const {stageId} = this.props
    this.props.dispatch({
      type: 'local/updateJobListStageId',
      payload: {
        stageId
      }
    })
    this.props.dispatch(syncJobListDropdownSelection())
  }

  render() {
    const {stageName, stageId, currentStageId, companyId, count} = this.props
    const suffix = stageId ? `/stage/${stageId}` : ''
    const href = `/joblist/${companyId}${suffix}`
    return (
      <MenuItem
        {...filtered(this.props)}
        onClick={this.handleClick.bind(this, href)}
        href={href}
        key={'i' + stageId}
        eventKey={'i' + stageId}
        active={currentStageId === stageId}>
        {stageName}
        {count > 0 && <span className="badge pull-right">{count}</span>}
      </MenuItem>
    )
  }
}

@connect((state, {companyId, currentStageId = 0}) => {
  const stagesWithAll = f.stages.addAllActiveStages()
  return {
    counts: s.stageCountsByCompanyId(companyId)(state),
    stagesWithAll: stagesWithAll,
    currentStageName: f.stages.currentStageName(currentStageId)
  }
})
export class JobStageDropdown extends React.Component {

  static propTypes = {
    companyId: React.PropTypes.number.isRequired,
    currentStageId: React.PropTypes.number
  }

  static defaultProps = {
    currentStageId: 0
  }

  render() {
    const {companyId, currentStageId, counts, stagesWithAll, currentStageName} = this.props
    const count = counts.get(currentStageId)
    return (
      <Row>
        <Dropdown bsSize="large" id="btn-group-stages">
          <Dropdown.Toggle bsSize="large">
            {currentStageName}
            {count > 0 && <span className="badge pull-right">{count}</span>}
            <div className="arrow-right hidden-xs"></div>
            <div className="arrow-right arrow-right-border hidden-xs"></div>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {take(stagesWithAll, 9).map(([id, stage]) => (
              <StageItem
                key={stage}
                count={counts.get(id)}
                stageName={stage}
                stageId={id}
                currentStageId={currentStageId}
                companyId={companyId} />
            ))}
            <hr style={{borderTop: '2px solid rgba(0,0,0,0.1)', margin: 0}} />
            {takeRight(stagesWithAll, 2).map(([id, stage]) => (
              <StageItem
                key={stage}
                count={counts.get(id)}
                stageName={stage}
                stageId={id}
                currentStageId={currentStageId}
                companyId={companyId} />
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    )
  }

};
