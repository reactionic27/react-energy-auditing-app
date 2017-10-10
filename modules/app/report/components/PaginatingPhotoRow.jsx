import React from 'react'
import {Map as IMap} from 'immutable'

class Photos extends React.Component {

  render() {
    const {captionRow: row} = this.props
    const photos = []

    if (row.get('left_photo_url')) {
      photos.push(addImage(row, 'left_photo_url'))
    }
    if (shouldAddBreak(row)) {
      photos.push(<br key="br" />)
    }
    if (row.get('right_photo_url')) {
      photos.push(addImage(row, 'right_photo_url'))
    }

    if (photos.length === 0) return null

    return (
      <div style={{float: 'left', marginRight: 10}}>
        {photos}
      </div>
    )
  }

}

export default function PaginatingPhotoRow({captionRow, hidePhotos, content}) {
  return (
    <div className="report-photo-row" style={{marginBottom: 5, padding: 10}}>
      <div className="clearfix" style={{position: 'relative'}}>
        {!hidePhotos ? <Photos captionRow={captionRow} /> : null}
        {content ? <div dangerouslySetInnerHTML={{__html: content}} /> : null}
      </div>
    </div>
  )
}
PaginatingPhotoRow.propTypes = {
  captionRow: React.PropTypes.instanceOf(IMap).isRequired,
  content: React.PropTypes.string.isRequired
}

function addImage(row, col) {
  return <img key={col} src={`${row.get(col)}-/resize/x157/`} height={157} className='img-polaroid' />
}

const LEGACY_AR = 1.257;
const MAX_PHOTOSET_WIDTH  = 702;
const MAX_PHOTOSET_HEIGHT = 157;
const PADDING_WIDTH = 10;

function shouldAddBreak(row) {
  const leftPhotoUrl = row.get('left_photo_url');
  const rightPhotoUrl = row.get('right_photo_url');
  const leftPhotoAR = row.get('left_photo_width') / row.get('left_photo_height');
  const rightPhotoAR = row.get('right_photo_width') / row.get('right_photo_height');

  // if an aspect ratio (AR) exists, photos have width x height in DB. Otherise, use the legacy AR
  // Make sure a URL exists at all, because some photosets only contain 1 photo
  const leftPhotoNewWidth = leftPhotoUrl
    ? (leftPhotoAR || LEGACY_AR) * MAX_PHOTOSET_HEIGHT + 2 * PADDING_WIDTH
    : 0;
  const rightPhotoNewWidth = rightPhotoUrl
    ? (rightPhotoAR || LEGACY_AR) * MAX_PHOTOSET_HEIGHT + 2 * PADDING_WIDTH
    : 0;

  const totalPhotosWidth = leftPhotoNewWidth + rightPhotoNewWidth;

  // Letting the HTML reflow doesn't work well with the pagination.
  // I set a <br> explicitly if the photos should wrap instead of letting the browser reflow
  if (totalPhotosWidth > MAX_PHOTOSET_WIDTH) {
    return true
  }
}
