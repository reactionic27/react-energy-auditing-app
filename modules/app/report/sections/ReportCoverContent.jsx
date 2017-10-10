import React from 'react'
import {Map as IMap} from 'immutable'
import Uploadcare from 'app/components/Uploadcare'
import {connect} from 'snugg-redux'
import {RRow, RCol} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {saveCoverPhoto} from 'data/actions'

@connect((state, {jobId}) => ({
  report: state.fn.reportByJobId(jobId)
}), {saveCoverPhoto})
export default class ReportCoverContent extends React.Component {

  static propTypes = {
    report: React.PropTypes.instanceOf(IMap).isRequired
  };

  updateImage = (image) => {
    this.props.saveCoverPhoto(this.props.jobId, image)
  };

  getVisibleSections() {
    if (!this.props.printing) {
      return this.props.visibleSections
    }
    // todo, filter out pages that won't appear, like financing when there are no jobs
    // or addtl notes when there are none
    return this.props.visibleSections.filter(f => f)
  }

  render() {
    const {
      report, printing
    } = this.props

    const imgUrl = report.get('cover_photo_url')
    const imgHeight = 342
    return (
      <div>
        {printing ?
          <div className="cover-photo" style={{height: imgHeight}}>
            {imgUrl && <img src={imgUrl} />}
          </div>
          :
          <Uploadcare
            url={report.get('cover_photo_url')}
            updateImage={this.updateImage}
            className="cover-photo"
            width={702}
            height={imgHeight}
            style={styles.uploadCare}
            imgStyle={styles.imgStyle}
            promptStyle={styles.promptStyle}/>
        }
        <RRow>
          <div className="intro-cover" style={styles.intro}>
            <RCol span={6}>
              <Snugg.Editable field="Report: Cover Textarea" printing={printing} />
            </RCol>
            <RCol span={3}>
              <div className="toc" style={styles.toc}>
                <div className="toc-title" style={styles.tocTitle}>Inside Your Report</div>
                {this.getVisibleSections().map(({label}) => (
                  <div style={styles.tocItem} key={label}>{label}</div>
                ))}
              </div>
              <Clearfix />
            </RCol>
          </div>
        </RRow>
      </div>
    );
  }
}

const styles = {
  uploadCare: {
    position: 'relative',
    height: 347
  },
  imgStyle: {
    borderRadius: 2,
    height: 347,
    width: 702,
    display: 'block'
  },
  promptStyle: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    height: 150,
    width: 160,
    textAlign: 'center',
    fontSize: 24,
    color: '#777',
    cursor: 'pointer'
  },
  intro: {
    height: 270,
    marginTop:10

  },
  toc: {
    borderRadius: 2,
    paddingTop: 10,
    paddingLeft: 10,
    height: 306
  },
  tocTitle: {
    fontSize: 15,
    marginBottom: 6,
    fontWeight: 600,
    letterSpacing: '0.03em'
  },
  tocItem: {
    fontSize: 13,
    lineHeight: '21px',
    letterSpacing: '0.03em'

  }
}
