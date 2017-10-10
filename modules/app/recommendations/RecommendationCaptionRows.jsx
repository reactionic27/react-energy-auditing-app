import React from 'react'
import {Map as IMap} from 'immutable'
import Uploadcare from 'app/components/Uploadcare';
import {Row, Col, Clearfix} from 'react-bootstrap'
import {Prioritize, AddButton, SectionCard } from 'ui'
import {connect} from 'snugg-redux'
import {createRecommendationCaption, updateCaptionRowImage} from 'data/actions'

const EMPTY_MAP = IMap()

@connect(null, {updateCaptionRowImage})
class RecommendationCaptionRow extends React.Component {

  static propTypes = {
    uuid: React.PropTypes.string.isRequired,
    captionRow: React.PropTypes.instanceOf(IMap).isRequired
  };

  state = {
    hovering: false,
    deleteClicked: false
  };

  hover = () => {
    this.setState({hovering: true})
  };

  endHover = () => {
    this.setState({hovering: false})
  };

  updateLeftImage = (image) => {
    this.props.updateCaptionRowImage('left', this.props.uuid, image)
  };

  updateRightImage = (image) => {
    this.props.updateCaptionRowImage('right', this.props.uuid, image)
  };


  render() {
    const {
      props: {uuid, captionRow, nextUuid, prevUuid}
    } = this
    const {hovering, deleteClicked} = this.state
    const rowHoverEffect = hovering ? 'highlight-delete' : ''
    const rowDeleteEffect = deleteClicked ? 'photo-row-deleting' : ''
    const rowClasses = `control-group photo-row animated fadeIn ${rowHoverEffect} ${rowDeleteEffect}`
    return (
      <Row className={rowClasses}>
        <div style={{position: 'absolute', right: 10, top: 10, zIndex: 1 }}>
          <Snugg.Buttons.CollectionDelete
            min={0}
            uuid={uuid}
            collection="recommendationCaptionRows"
            float="right"
            onMouseEnter={this.hover}
            onMouseLeave={this.endHover}
            />
        </div>
        <Col xs={2} md={1}>
          <Prioritize
            table='recommendationCaptionRows'
            index={uuid}
            uuid={uuid}
            nextUuid={nextUuid}
            prevUuid={prevUuid}
            className="span-priorities" />
        </Col>
        <Col xs={9} sm={4}>
          <Uploadcare
            url={captionRow.get('left_photo_url')}
            updateImage={this.updateLeftImage}
            height={300}
            />
        </Col>
        <Clearfix visibleXsBlock />
        <Col xs={9} xsOffset={2} smOffset={0} sm={4}>
          <Uploadcare
            url={captionRow.get('right_photo_url')}
            updateImage={this.updateRightImage}
            height={300}
            />
        </Col>
        <Clearfix />
        <Col sm={12}>
          <Snugg.Textarea
            bare
            uuid={uuid}
            field="Recommendation Caption Row: Caption"
            placeholder="Click to edit caption..."
            style={{minHeight: 100, marginBottom: 10}} />
        </Col>
      </Row>
    )
  }
}

@connect((state, {uuid}) => {
  return {
    captionRows: state.fn.captionRowsByRecUuid(uuid)
  }
}, {createRecommendationCaption})
export default class RecommendationCaptionRows extends React.Component {

  addCaptionRow = (e) => {
    e.preventDefault()
    this.props.createRecommendationCaption(this.props.jobId, {
      recommendation_uuid: this.props.uuid
    })
  }

  static propTypes = {
    uuid: React.PropTypes.string.isRequired
  };

  render() {
    const {
      props: {captionRows},
    } = this
    return (
      <SectionCard.Container>
        <SectionCard.Header title="Photos" field="Recommendation Caption Row: Caption"/>
        <SectionCard.Body>
          {captionRows.map((row, i) => {
            const next = captionRows[i + 1] || EMPTY_MAP
            const prev = captionRows[i - 1] || EMPTY_MAP
            return (
              <RecommendationCaptionRow
                captionRow={row}
                uuid={row.get('uuid')}
                key={row.get('uuid')}
                nextUuid={next.get('uuid')}
                prevUuid={prev.get('uuid')} />
            )
          })}
          <Row>
            <Col sm={8} smOffset={2} lg={4} lgOffset={4}>
              <AddButton onClick={this.addCaptionRow} label='Add a caption & photo row' />
            </Col>
          </Row>

        </SectionCard.Body>
      </SectionCard.Container>
    )
  }
}
