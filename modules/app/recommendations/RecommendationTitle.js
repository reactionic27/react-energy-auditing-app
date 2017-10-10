import React from 'react'
import cx from 'classnames'
import StatusToggle from './components/status-toggle'
import {connect} from 'snugg-redux'
import {DeleteButton, SectionCard, ContextButton} from 'ui'
import {Col, Row} from 'react-bootstrap'
import {getRecDefinition} from '../../data/definition-helpers'
import * as f from 'data/formatters'
import {dispatchCollectionDelete} from 'data/actions'
import { browserHistory } from 'react-router'
import Radium from 'radium'
import {Map as IMap} from 'immutable'

var maxCharCount = 32

const linkMap = {
  recommended: '',
  mentioned: '/mentioned',
  declined: '/declined'
}

const backButtonLabels = {
  recommended: 'recommended items',
  mentioned: 'additional notes',
  declined: 'declined items'
}

function getStatus(recommendation: IMap) {
  switch (recommendation.get('status')) {
    case 3: return 'declined'
    case 2: return 'mentioned'
  }
  return 'recommended'
}


@connect((state, {recommendation}) => {
  const {title, rec_definition_id, job_id} = recommendation.toJS()
  const programId = state.fn.programByJobId(job_id).get('id')
  const measureCodeOptions = f.measureCode.measureCodeOptions(programId)
  return {
    recTitle: title,
    recCategory: f.recs.category(recommendation),
    definitionTitle: getRecDefinition(rec_definition_id).title,
    isCustomRec: f.recs.isCustomRec(recommendation),
    isHealthRec: f.recs.isHealthRec(recommendation),
    measureCodeOptions
  }
}, {dispatchCollectionDelete})
@Radium
export default class RecommendationTitle extends React.Component {

  deleteRec = (e) => {
    e.preventDefault()
    const {job_id, status, uuid} = this.props.recommendation.toJS()
    this.props.dispatchCollectionDelete('recommendations', {
      uuid,
      job_id,
      deleted_at: new Date()
    })
    browserHistory.replace(`/job/${job_id}/recommendations${linkMap[status] || ''}`)
  }

  render() {
    const {jobId, uuid, recommendation, recTitle, isHealthRec, recCategory, definitionTitle, isCustomRec, measureCodeOptions} = this.props
    const suggestedLabel = 'Suggested title: ' + definitionTitle + ' | ';
    const remaining = maxCharCount - (recTitle || '').length
    const status = getStatus(recommendation)

    const deleteButtonLink = (
      <DeleteButton float="right" onClick={this.deleteRec} />
    )


    return (
      <div>
        <SectionCard.Container>
          <SectionCard.Header title="Title" field="Recommendation: Title">
            <div className="visible-xs-block">
              <ContextButton
                to={`/job/${jobId}`}
                label="Input"
                customStyle={styles.sectionButton}/>
              <ContextButton
              to={`/job/${jobId}/recommendations${linkMap[status]}`}
              label={`All ${backButtonLabels[status]}`}
              customStyle={styles.sectionButton}/>
            </div>
          </SectionCard.Header>
          <SectionCard.Body>
            <Row>
              <Col xs={isCustomRec ? 9 : 12} sm={isCustomRec ? 10 : 12}>
                <div style={styles.recHeader}>
                  <Snugg.Input
                    bare
                    field="Recommendation: Title"
                    uuid={uuid}
                    maxLength={32}
                    editable
                    placeholder="Recommendation Title" />
                </div>

                <p className='help-block muted helper-font-small'>
                  {!isCustomRec && suggestedLabel || null}
                  Category: {recCategory} |
                  <span className={cx({
                    'alert alert-live alert-danger character-counter': (remaining < 0)
                  })}>
                    32 Chars max. {remaining} remaining
                  </span>
                </p>
              </Col>
              {isCustomRec ?
                <Col xs={3} sm={2}>
                  {deleteButtonLink}
                </Col>
               : null}
            </Row>
          </SectionCard.Body>
        </SectionCard.Container>
        {isCustomRec && measureCodeOptions.length > 1 ?
          <SectionCard.Container>
            <SectionCard.Header title="Program Measure Code" field='Recommendation: Measure code'/>
            <SectionCard.Body>
              <Row>
                <Col sm={10} md={8}>
                  <Snugg.Input uuid={uuid} bare field='Recommendation: Measure code' options={measureCodeOptions} />
                </Col>
              </Row>
            </SectionCard.Body>
          </SectionCard.Container>
          : null
        }
        {!isHealthRec &&
          <SectionCard.Container>
            <SectionCard.Header title="Status" field='Recommendation: Status' />
            <SectionCard.Body>
              <StatusToggle uuid={uuid} view='single' />
            </SectionCard.Body>
          </SectionCard.Container>
        }
      </div>

    )
  }

}

const styles = {
  recHeader: {
    fontSize: 16,
    '@media (min-width: 768px)': {
      fontSize: 18
    }
  },
  sectionButton:{
    float: 'right',
    textAlign: 'center',
    display: 'inline-block',
    paddingTop: 9,
    paddingLeft: 6,
    paddingBottom: 10,
    paddingRight: 6,
    borderRadius: 0,
    width: 'auto',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.04em',
  }
}
