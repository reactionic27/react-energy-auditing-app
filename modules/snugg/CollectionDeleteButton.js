import React, {PropTypes} from 'react'
import pure from 'pure-render-decorator'
import {JOB_COLLECTION_TABLES} from 'data/constants'
import {DeleteButton} from 'ui'
import {connect} from 'snugg-redux'
import {dispatchCollectionDelete} from 'data/actions'

@connect((state, {uuid, jobId, collection}) => {
  let collectionSize
  if (collection === 'recommendationCaptionRows') {
    collectionSize = state.fn.captionRowsByUuid(uuid).length
  } else {
    collectionSize = state.fn.collectionRowsByName(jobId, collection).length
  }
  return {
    collectionSize
  }
}, {dispatchCollectionDelete})
class DeleteButtonWrapper extends React.Component {

  deleteCollection = (e) => {
    e.preventDefault()
    const {
      props: {jobId, uuid, collection}
    } = this
    this.props.dispatchCollectionDelete(collection, {
      uuid,
      job_id: jobId,
      deleted_at: new Date()
    })
  }

  render() {
    if (this.props.collectionSize <= this.props.min) return null;
    return (
      <DeleteButton {...this.props} onClick={this.deleteCollection} />
    )
  }
}

@pure
export default class CollectionDeleteButton extends React.Component {

  static propTypes = {
    min: PropTypes.number.isRequired,
    uuid: PropTypes.string.isRequired,
    collection: PropTypes.oneOf(JOB_COLLECTION_TABLES).isRequired
  };

  static contextTypes = {
    jobId: PropTypes.number.isRequired
  };

  static defaultProps = {
    min: 1,
    className: ''
  };

  // TODO Ben: you can disable a button, but not a link. (not sure how Tim did it above)
  // So I changed this to a button but it need to be styled
  render() {
    return <DeleteButtonWrapper {...this.props} {...this.context} />
  }

}
