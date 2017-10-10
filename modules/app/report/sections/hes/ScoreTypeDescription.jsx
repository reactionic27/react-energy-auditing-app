import React from 'react'
import Color from 'color'
import {palette} from 'app/lib/global-styles'
import {Icon} from 'ui'
import {Row, Col} from 'react-bootstrap'
import moment from 'moment'

export default function ScoreTypeDescription(props) {
  const {title, isActive, children, hesScore} = props
  const hesBaseScore = hesScore && hesScore.baseScore
  const rawAssessmentDate = hesScore && hesScore.rawAssessmentDate
  return (
    <div style={isActive ? activeDescription : description} >
      <Row>
        <Col xs={10}>
          <div style={descriptionTitle}>
            {title}
            {isActive && <Icon type="checkMark" style={{paddingLeft: 20}}/>}
          </div>
          {children}
        </Col>
        <Col xs={2}>
          <div style={scoreStyle}>
            <div style={scoreLabel}>Score</div>
              {hesBaseScore ? hesBaseScore : '--'}
            <div style={scoreDate}>
              {rawAssessmentDate ?
                <span>
                  {moment(rawAssessmentDate).format('MMM D, YYYY')}
                  {/* TODO: If we want the time presented here, we need to use the created_at
                    timestamp in the database. It actually comes back to the client, but
                    timezone and locale needs to be dealt with b/c it doesn't line up with
                    NREL's date. It may just need a TIMESTAMP field type in the db */}
                  <br/>
                  {moment(hesScore.created_at).format('h:mm a')}
                </span> :
                <span>Never obtained</span>
              }

              {/*Jul 7, 2016
              <br/> 3:45pm*/}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const scoreStyle = {
  fontSize: 24,
  fontWeight: 700,
  marginRight: 30,
  marginTop: 20,
  float: 'right',
  textAlign: 'center'
}

const scoreLabel = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.03em'
}
const scoreDate = {
  fontSize: 11,
  fontWeight: 400,
  textTransform: 'uppercase',
  letterSpacing: '0.03em'
}

const descriptionTitle = {
  fontWeight: 600,
  fontSize: '16px',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
  paddingBottom: 10
}

const description = {
  fontColor: '#666',
  border: `1px solid ${Color(palette.BEIGE).darken(0.05).rgbString()}`,
  padding: 10,
  opacity: 0.8,
  marginBottom: 15
}
const activeDescription = {
  ...description,
  fontColor: '#333',
  backgroundColor: palette.BEIGE,
  boxShadow: '0 5px 15px rgba(0,0,0,0.7)',
}
