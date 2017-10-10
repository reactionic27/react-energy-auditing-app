import React from 'react'
import {ContextPaneSection, ContextFieldDefinition} from 'app/components/context'
import {Icon, PaneH1, PaneH2, PaneH3, PaneH4, ContextButton, BlankText, Badge} from 'ui'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {getRecDefinition} from '../../data/definition-helpers'
import {Map as IMap} from 'immutable'

function getStatus(recommendation: IMap) {
  switch (recommendation.get('status')) {
    case 3: return 'Declined Measure'
    case 2: return 'Additional Note'
  }
  return 'Recommended Measure'
}

@connect((state, {recUuid, jobId}) => {
  const recommendation = state.fn.recByUuid(recUuid)
  const job = state.fn.jobById(jobId)
  const hasUnmodeledChanges = f.job.hasUnmodeledChanges(job)
  const isTemplate = job.get('is_template')
  const hasCalculated = job.get('has_calculated')
  const isHealthRec = f.recs.isHealthRec(recommendation)
  const isCustomRec = f.recs.isCustomRec(recommendation)
  const isRecommendedRec = f.recs.isRecommendedRec(recommendation)
  const recCategory = f.recs.category(recommendation)
  const recDefinition = getRecDefinition(recommendation.get('rec_definition_id')) || {helpLinks: []}
  const rec = state.fn.recommendationsByJobId(jobId)
  const recommended = f.recs.recommendedRecs(rec)
  const mentioned = f.recs.mentionedRecs(rec)
  const declined = f.recs.declinedRecs(rec)


  return {
    hasUnmodeledChanges,
    hasCalculated,
    isHealthRec,
    isCustomRec,
    isRecommendedRec,
    modelWarning: !isTemplate && !isCustomRec && !hasCalculated,
    savingsWarning: isTemplate && !isCustomRec,
    recCategory,
    recDefinition,
    recommendation,
    recommendedCount: recommended.length,
    mentionedCount: mentioned.length,
    declinedCount: declined.length
  }
})
export default class RecommendationContextPane extends React.Component {

  render() {

    const {jobId,
      hasUnmodeledChanges,
      recommendation,
      modelWarning,
      isHealthRec,
      savingsWarning,
      recCategory,
      recDefinition: {helpLinks},
      recommendedCount,
      declinedCount,
      mentionedCount
    } = this.props
    const status = getStatus(recommendation)

    const modelNotification = modelWarning || hasUnmodeledChanges
      ? <BlankText>Model this job to calculate savings and SIR.</BlankText>
      : null

    const savingsNotification = savingsWarning
      ? <BlankText>Savings and SIR are not shown in templates. They will appear once you create and model a job.</BlankText>
      : null

    const computedValueStyle = hasUnmodeledChanges ? invalidValueStyle : valueStyle


    return (
      <div>
        <PaneH1>{status}</PaneH1>
        <PaneH3>{recCategory}</PaneH3>
        <ContextPaneSection>
          <PaneH2>
            Related Shortcuts
          </PaneH2>
          <ContextButton to={`/job/${jobId}`} >
            Input Screen <Icon type="input" float="right"/>
          </ContextButton>
          <ContextButton to={`/job/${jobId}/recommendations`}>
            Recommended measures <Badge>{recommendedCount}</Badge>
          </ContextButton>
          <ContextButton to={`/job/${jobId}/recommendations/mentioned`}>
            Additional notes <Badge>{mentionedCount}</Badge>
          </ContextButton>
          <ContextButton to={`/job/${jobId}/recommendations/declined`}>
            Declined measures <Badge>{declinedCount}</Badge>
          </ContextButton>

        </ContextPaneSection>
        {!isHealthRec ?
          <ContextPaneSection>
            <PaneH2>
              Financials
            </PaneH2>
            {modelNotification}
            {savingsNotification}
            {!savingsWarning ?
              <div>
                <PaneH4>
                  Annual Savings:
                  <span style={computedValueStyle}>
                    {modelWarning ? '--' : f.num.dollars(recommendation.get('savings'))}
                  </span>
                </PaneH4>
                <PaneH4>
                  SIR:
                  <span style={computedValueStyle}>
                    {modelWarning ? '--' : recommendation.get('sir')}
                  </span>
                </PaneH4>
              </div>
              : null
            }
            <PaneH4>Cost: <span style={valueStyle}>{recommendation.get('cost') ? f.num.dollars(recommendation.get('cost')) : '--'}</span></PaneH4>
          </ContextPaneSection> : null
        }
        <ContextPaneSection>
          <PaneH2>
            KNOWLEDGE BASE ARTICLES
          </PaneH2>
          {helpLinks.length ?
            helpLinks.map((helpLink, index) => {
              return (
                <ContextButton
                  href={helpLink.url}
                  target="_blank"
                  variant="link"
                  key={index}
                  label={helpLink.title}/>
              )
            })
            : <BlankText>No knowledge base articles</BlankText>
          }
        </ContextPaneSection>
        <ContextFieldDefinition />
      </div>
    )
  }
}

const valueStyle = {
  float: 'right',
  paddingRight: 5
}
const invalidValueStyle = {
  ...valueStyle,
  textDecoration: 'line-through',
  opacity: 0.7
}
