import React, {PropTypes} from 'react'
import requiredIf from 'react-required-if'
import {JOB_COLLECTION_TABLES} from 'data/constants'
import {connect} from 'snugg-redux'
import {AddButton, Icon, Row, Col} from 'ui'
import pure from 'pure-render-decorator'
import {dispatchEagerCreate} from 'data/actions'
import {Clearfix} from 'react-bootstrap'

@connect((state, {jobId, collection}) => {
  let collectionSize = collection === 'recommendationCaptionRows'
    ? Infinity
    : state.fn.collectionRowsByName(jobId, collection).length
  return {
    collectionSize
  }
}, {dispatchEagerCreate})
class AddButtonWrapper extends React.Component {

  addItem = (e) => {
    e.preventDefault()
    const {collection, jobId, recUuid} = this.props
    const payload = collection === 'recommendationCaptionRows'
      ? {job_id: jobId, recommendation_uuid: recUuid}
      : {job_id: jobId}

    this.props.dispatchEagerCreate(collection, payload)
  }

  isDisabled() {
    if (this.props.disabled) {
      return true
    }
    if (this.props.max) {
      return this.props.collectionSize >= this.props.max
    }
    return false
  }

  // Renders the "Add" button.
  render() {
    let { bare } = this.props
    let clickHandler = this.isDisabled() ? undefined : this.addItem
    let button = (
      <AddButton onClick={clickHandler} disabled={this.isDisabled()} {...this.props}>
        <span style={{float: 'left'}}>
          {" " + this.props.label}
        </span>
        <span style={{float: 'right'}}>
          <Icon type="addNew"/>
        </span>
        <Clearfix/>
      </AddButton>
    )
    if (bare) return button;
    return (
      <Row>
        <Col sm={12} md={6} lg={4} mdOffset={3} lgOffset={4}>
          {button}
        </Col>
      </Row>
    )
  }

}

// Creates a new 'Add Button', which adds to a specified collection
@pure
export default class CollectionAddButton extends React.Component {

  static propTypes = {
    max: PropTypes.number,
    recUuid: requiredIf(PropTypes.string, props => props.collection === 'recommendationCaptionRows'),
    bare: React.PropTypes.bool,
    collection: React.PropTypes.oneOf(JOB_COLLECTION_TABLES).isRequired
  };

  static contextTypes = {
    jobId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    className: ''
  };

  // TODO Ben: you can disable a button, but not a link. (not sure how Tim did it above)
  // So I changed this to a button but it need to be styled
  render() {
    return <AddButtonWrapper {...this.props} {...this.context} />
  }
}
