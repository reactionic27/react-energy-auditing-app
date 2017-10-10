import React, {PropTypes} from 'react'
import {SORT_LABELS} from 'data/constants'
import JobSortOption from './JobSortOption'
import pure from 'pure-render-decorator'
import {ButtonToolbar, Dropdown} from 'react-bootstrap'
import {Row, Icon} from 'ui'

@pure
export class JobSortDropdown extends React.Component {

  static propTypes = {
    sortBy: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
    sortReverse: PropTypes.bool.isRequired
  };

  iconClick(e) {
    e.stopPropagation()
    // this.props.onSortChange()
  }


  renderSortDirectionIcon(option) {
    const {sortBy, sortReverse} = this.props
    if (sortBy !== option) return null
    return <Icon type={sortReverse ? 'sortUp' : 'sortDown'} size={14} float="right" padding="0 15px 0 0"/>
  }

  render() {
    const {sortBy} = this.props
    return (
      <Row>
        <Dropdown bsSize="large" id="btn-group-sort">
          <Dropdown.Toggle bsSize="large">
            {`By ${SORT_LABELS.get(sortBy)}`} {this.renderSortDirectionIcon(sortBy)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {SORT_LABELS.keySeq().map((option) => {
              return <JobSortOption {...this.props} option={option} key={option} />
            }).toArray()}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
    )
  }
};
