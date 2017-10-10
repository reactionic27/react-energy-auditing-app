import { connect } from 'snugg-redux'
import {Map as IMap} from 'immutable'
import React from 'react'
import Uploadcare from '../../components/Uploadcare';
import {updateCaptionRowImage} from 'data/actions'

@connect(null, {updateCaptionRowImage})
export default class ReportPhotoRow extends React.Component {

  static propTypes = {
    captionRow: React.PropTypes.instanceOf(IMap).isRequired
  };

  updateLeftImage = (image) => {
    this.props.updateCaptionRowImage('left', this.props.uuid, image)
  };

  updateRightImage = (image) => {
    this.props.updateCaptionRowImage('right', this.props.uuid, image)
  };

  render() {
    const {captionRow, uuid} = this.props
    const recUuid = captionRow.get('recommendation_uuid')
    return (
      <div style={styles.reportPhotos} className="report-photo-row">
        <div className='clearfix' style={styles.photoSet}>
          <div style={styles.photoContainer}>
            <Uploadcare
              height={300}
              updateImage={this.updateLeftImage}
              style={styles.photo}
              url={captionRow.get('left_photo_url')} />
            <Uploadcare
              height={300}
              updateImage={this.updateRightImage}
              style={styles.photo}
              url={captionRow.get('right_photo_url')} />
          </div>
          <div style={styles.photoCaption}>
            <Snugg.InlineEditable
              uuid={uuid}
              field="Recommendation Caption Row: Caption"
              placeholder="Click to edit caption..." />
          </div>
          <div style={styles.delete}>
            <Snugg.Buttons.CollectionDelete uuid={uuid} recUuid={recUuid} collection="recommendationCaptionRows" min={0} />
          </div>
        </div>
      </div>
    )
  }

}

const styles = {
  reportPhotos: {
    marginBottom: 5,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },
  photoSet: {
    position: 'relative',
    minHeight: 129
  },
  noPhotos: {
    minHeight: 20
  },
  photo: {
    width: 200,
    marginLeft: 10,
    float: 'left'
  },
  photoContainer: {
    float: 'left',
    marginRight: 10
  },
  photosWide: {
    maxWidth: 662
  },
  photoCaption: {
    fontSize:   13,
    lineHeight: '1.5em',
    marginLeft: 10
  },
  delete: {
    backgroundColor: 'inherit',
    position: 'absolute',
    bottom: 0,
    right: 0
  }
}
