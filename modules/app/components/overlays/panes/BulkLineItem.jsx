import React from 'react'
import {Map as IMap} from 'immutable'
import {View} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import {STAGES} from 'data/constants'
import strip from 'util/strip'
import {connect} from 'react-redux'
import maybe from 'util/maybe'
import * as f from 'data/formatters'

@connect((state, {job}) => {
  const programName = (state.fn.programByJobId(job.id) || IMap()).get('name')
  return {
    programName: programName !== 'None' ? programName : ''
  }
})
export class BulkLineItem extends React.Component {

  static propTypes = {
    job: React.PropTypes.object,
    programName: React.PropTypes.string
  };

  render() {
    const {
      props: {job, programName}
    } = this
    const name = strip`${job.first_name} ${job.last_name}`
    const address = strip`${job.address_1} ${job.address_2}`
    const stageName = f.stages.currentStageName(job.stage_id)
    return (
      <View style={styles.job}>
        {name} <span style={styles.jobId}>#{job.id}</span>
        {stageName
          ? <span style={styles.stage}>{stageName}</span>
          : null }
        <Clearfix/>
        <div style={styles.address}>
          {address}, {job.city}, {job.state} {maybe`• ${programName}`}
        </div>
      </View>
    )
  }
}

const styles = {
  job: {
    borderBottom: '1px solid #e3e3e3',
    paddingTop: 7,
    paddingRight: 0,
    paddingBottom: 7,
    paddingLeft: 0
  },
  address: {
    fontSize: '0.8em',
    color: '#888888',
    lineHeight: '21px'
  },
  jobId: {
    color: '#888888',
    paddingLeft: 5,
    fontSize: '.8em',
    paddingTop: '.2em'
  },
  stage: {
    float:'right',
    display: 'inline-block',
    minWidth: 80,
    textAlign: 'center',
    borderRadius: 3,
    backgroundColor: Color(palette.BEIGE).darken(0.03).hexString(),
    fontSize: '.7em',
    paddingTop: '.17em',
    paddingRight: 8,
    paddingBottom: '.15em',
    paddingLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.03em'
  }
}
