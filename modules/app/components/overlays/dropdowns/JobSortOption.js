import {connect} from 'snugg-redux'
import {SORT_LABELS} from 'data/constants'
import React from 'react'
import {MenuItem} from 'react-bootstrap'
import {Icon} from 'ui'
import filtered from '../../../../util/filtered'
import {syncJobListDropdownSelection} from 'data/actions'

@connect()
export default class SortOption extends React.Component {

  static propTypes = {
    onSortChange: React.PropTypes.func.isRequired,
    option: React.PropTypes.string,
    sortBy: React.PropTypes.string
  };

  handleSortChange = (e) => {
    e.preventDefault();
    this.props.onSortChange(this.props.option)
    this.props.dispatch({
      type: 'local/clearJobSelect'
    })
    this.props.dispatch(syncJobListDropdownSelection())
  };

  renderSortDirectionIcon(option) {
    const {sortBy, sortReverse} = this.props
    if (sortBy !== option) return null

    return <Icon type={sortReverse ? 'sortUp' : 'sortDown'} float="right" />
  };

  render() {
    const {option, currentStageId, sortBy} = this.props
    if (currentStageId  && option === 'stage_id') {
      return null
    }
    return (
      <MenuItem
        {...filtered(this.props)}
        onClick={this.handleSortChange}
        eventKey={option}
        active={sortBy === option}>
        {SORT_LABELS.get(option)} {this.renderSortDirectionIcon(option)}
      </MenuItem>
    );
  }
}
