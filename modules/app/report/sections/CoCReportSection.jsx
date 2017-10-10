import React, {PropTypes} from 'react'
import {ReportSection, ReportHeader, ReportFooter} from 'app/report/components'
import {RRow, RCol} from 'ui'
import {InlineNotification} from 'app/components/overlays'
import {Clearfix} from 'react-bootstrap'
import hpwesLogoPath from '../../../../src/img/partners/hpwes/tall-logo.png'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {Map as IMap} from 'immutable'
import {getRecDefinition} from '../../../data/definition-helpers'
import moment from 'moment'
import {dispatchSave} from 'data/actions'


@connect((state, {programId, jobId}) => {
  const program = programId ? f.program.programById(programId) : IMap()
  const job = state.fn.jobById(jobId)
  const account = state.fn.accountByJobId(jobId)
  const accountFullName = f.account.fullName(account)
  const formattedAddress = f.report.formattedAddressWithBreaks(job)
  const approvedMeasures = program.get('approvedMeasures')
  const recommendedRecs = f.recs.recommendedRecs(state.fn.recommendationsByJobId(jobId))
  const recommendedProgramMeasures = recommendedRecs.filter((rec) => {
    const recName = getRecDefinition(rec.get('rec_definition_id')).recName
    return approvedMeasures.includes(recName)
  })
  const allHesScores = state.fn.hesScoresByJobId(jobId)
  const hesScoresByType = f.hes.hesScoresByType(allHesScores)
  const finalHesScore = hesScoresByType.final && hesScoresByType.final.baseScore
  const retrofitJobStageHistory = state.fn.jobStageHistoryByStageId(jobId, 6) // retrofit complete  job stage history
  const retrofitComplete = retrofitJobStageHistory && retrofitJobStageHistory.length > 0 ? retrofitJobStageHistory[0] : null
  const retrofitCompleteDate = retrofitComplete ? moment(retrofitComplete.get('start_at')).format('DD MMM YYYY') : null
  const isInPreRetrofitCompleteStage = job.get('stage_id') < 6
  return {
    programName: program.get('name', null),
    programLogo:program.get('logoPath', null),
    signaturePath: program.get('signaturePath', null),
    cocSignatory: program.get('cocSignatory', null),
    job,
    formattedAddress,
    accountFullName,
    measuresPerformed: approvedMeasures.size ? recommendedProgramMeasures : recommendedRecs,
    finalHesScore,
    retrofitComplete,
    retrofitCompleteDate,
    isInPreRetrofitCompleteStage,
  }
}, {dispatchSave})
export default class CoCReportSection extends React.Component {

  static contextTypes = {
    jobId: PropTypes.number,
    printing: PropTypes.bool
  }

  addDefaultCocAdditionalInfo = (text) => {
    const {jobId, job} = this.props
    if (job.get('coc_additional_info')) { return }
    this.props.dispatchSave('jobs', {
      id: jobId,
      coc_additional_info: text
    })
  }

  render() {
    const {
      context: {jobId, printing},
      props: {
        job,
        programName,
        programLogo,
        formattedAddress,
        measuresPerformed,
        finalHesScore,
        retrofitCompleteDate,
        isInPreRetrofitCompleteStage,
        retrofitComplete,
        signaturePath,
        cocSignatory
      }
    } = this
    const cocAdditionalInfoDefault = `This certificate is issued by ${programName} in recognition of the energy upgrades performed.`
    const hasWorkPerformedAndWorkVerifiedBy = job.get('coc_work_verified_by') && job.get('coc_work_performed_by') ? true : false
    const isValidCoC = hasWorkPerformedAndWorkVerifiedBy && retrofitCompleteDate && retrofitComplete && !isInPreRetrofitCompleteStage
    return (
      <ReportSection name="coc">
        <ReportHeader field='Report: Certificate of Completion Title' noPrint jobId={jobId} disabled />
        <div className={isValidCoC ? '' : 'sample-job-watermark'}>
          <div style={{height: 640}}>
            <RRow>
              <RCol span={5}>
                <div style={styles.smallTitle}>
                  Home Performance with ENERGY STAR®
                </div>
                <div style={styles.bigTitle}>
                  Certificate of <br/>Energy Improvements
                </div>
              </RCol>
              <RCol span={7}>
                <div style={{textAlign: 'right'}}>
                  {programLogo ?
                    <img src={programLogo} style={styles.programLogo}/>
                  :
                    <span style={styles.programName}>{programName}</span>
                 }
                </div>
              </RCol>
            </RRow>
            {!isValidCoC ?
              <InlineNotification theme="error" title="This certificate is invalid.">
                <ul>
                  {!retrofitCompleteDate ? <li>This job has no completed date. Move it to the 'Retrofit Complete' stage from the job header.</li> : null}
                  {!retrofitComplete ? <li>This job has never been moved to the 'Retrofit Complete' stage which is required to generate a valid certificate of completion.</li> : null}
                  {retrofitComplete && isInPreRetrofitCompleteStage ? <li>This job must be in the stage 'Retrofit Complete' or later in order to create the Certificate of Completion</li> : null}
                  {!hasWorkPerformedAndWorkVerifiedBy ? <li>Don't leave any of these fields blank: 'Work performed by' and 'Work verfied by'. Check below.</li> : null}

                </ul>
              </InlineNotification>
            : null}
            <div>
              <RRow>
                <RCol span={5}>
                  <div style={styles.label}>
                    Address
                  </div>
                  <div style={styles.value}>
                    {formattedAddress}
                  </div>

                  <div style={styles.label}>
                    Work performed by
                  </div>
                  <div style={styles.value}>
                    <Snugg.Input
                      bare
                      editable
                      field='Job Coc work performed by'
                      id={jobId} placeholder="Click to edit." />
                  </div>

                  <div style={styles.label}>
                    Work verified by
                  </div>
                  <div style={styles.value}>
                    <Snugg.Input
                      bare
                      editable
                      field='Job Coc work verified by'
                      id={jobId} placeholder="Click to edit." />
                  </div>

                  <div style={styles.label}>
                    Work completed on
                  </div>
                  <div style={styles.value}>
                   {retrofitCompleteDate}
                  </div>

                  <div style={styles.value}>
                    <img src={signaturePath} style={{maxWidth: 280, maxHeight: 110, marginTop: 10}}/>
                    <br/>
                    {cocSignatory}
                    <br/>
                    Focus on Energy
                  </div>

                </RCol>
                <RCol span={7}>
                  <div style={styles.rightColumn}>
                    <div style={{...styles.label, marginTop: 0}}>
                      Home performance improvements
                    </div>
                    <div style={styles.value}>
                      {measuresPerformed.map((rec) => {
                        return <div key={rec.get('uuid')}>{rec.get('title')}</div>
                      })}
                    </div>

                    <div style={styles.label}>
                      Additional Information
                    </div>
                    <div style={styles.value}>
                      {finalHesScore ? <div style={{paddingBottom: 10}}>Home Energy Score: {finalHesScore}</div> : null}
                      {printing && !job.get('coc_additional_info') ? <div>{cocAdditionalInfoDefault}</div> : null}
                      <Snugg.Textarea
                        field='Job Coc additional info'
                        id={jobId}
                        bare
                        max={200}
                        editable={!printing}
                        placeholder={cocAdditionalInfoDefault}
                        printing={printing}
                        onClick={() => this.addDefaultCocAdditionalInfo(cocAdditionalInfoDefault)}
                        rows="4"/>
                    </div>
                  </div>
                </RCol>
              </RRow>
            </div>
          </div>
          <RRow>
            <RCol span={12}>
              <div style={styles.footer}>
                <div style={styles.footerText}>
                ENERGY STAR® is the simple choice for energy efficiency.
                Home Performance with ENERGY STAR is a systematic approach to
                improving energy efficiency and comfort in homes,
                while reducing the greenhouse gas emissions that contribute to climate change.
                Join the millions across America already making a difference at energystar.gov.
                </div>
                <div style={{float: 'right'}}>
                  <img src={hpwesLogoPath} height="80"/>
                </div>
                <Clearfix/>
              </div>
            </RCol>
          </RRow>
        </div>

        <ReportFooter jobId={jobId}>
          <span/>
        </ReportFooter>
      </ReportSection>
    )
  }
};

const styles = {
  smallTitle: {
    fontSize: 18,
    fontWeight: 600
  },
  bigTitle: {
    fontSize: 32,
    lineHeight: '1.24em',
    fontWeight: 600
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#555555',
    marginTop: 30,
    letterSpacing: '0.04em'
  },
  value: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 8
  },
  rightColumn: {
    backgroundColor: '#efefef',
    borderRadius: 4,
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 10
  },
  footer: {
    backgroundColor: '#efefef',
    borderRadius: 4,
    padding: 5
  },
  footerText: {
    float: 'left',
    color: '#5E5E5E',
    fontSize: 13,
    width: 860,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5
  },
  programName: {
    fontSize: 36,
    fontWeight: 700,
  },
  programLogo: {
    maxWidth: 360,
    maxHeight: 70
  },
}
