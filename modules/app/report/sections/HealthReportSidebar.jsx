import React from 'react'
import {health as healthFields} from '../../../../constants/field-definitions'
import {connect} from 'snugg-redux'
import {Clearfix} from 'react-bootstrap'

var icons = {
  Passed:  'ico-budicon-30',
  Warning: 'ico-budicon-69',
  Failed:  'ico-budicon-29'
};

@connect((state, {jobId}) => {
  const health = state.fn.healthByJobId(jobId)
  return {
    health,
    hasRunHealthTests: healthFields.some(f => {
      const value = health.get(f.outputColumn)
      return value && value !== 'Not Tested'
    })
  }
})
export default class HealthReportSidebar extends React.Component {

  summaryBody() {
    const {health} = this.props
    const fieldResults = healthFields.filter(f => {
      const value = health.get(f.outputColumn)
      return value && value !== 'Not Tested'
    }).map(f => (
      <li key={f.outputColumn} style={styles.testResult}>
        <span style={styles.label}>{f.label || f.name}</span>
        <i className={`${icons[health.get(f.outputColumn)]} pull-right`} />
        <Clearfix />
      </li>
    ))

    return (
      <div className="safety-tests-results">
        <h3>Test Summary</h3>
        <ul style={styles.list}>
          {fieldResults}
        </ul>
        <div className="safety-tests-legend" style={styles.legendBlock}>
          <div className="legend" style={styles.legend}>
            <i className={icons.Passed} style={styles.legendIcon} />
            Passed
          </div>
          <div className="legend" style={styles.legend}>
            Failed
            <i className={icons.Failed} style={styles.legendIcon}/>
          </div>
          <div className="legend" style={{...styles.legend, paddingRight: 0}}>
            Warning
            <i className={icons.Warning} style={styles.legendIcon}/>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {hasRunHealthTests, printing} = this.props
    return (
      <div style={styles.container}>
        <Snugg.Editable field='Report: Safety Overview' printing={printing}/>
        <div className="safety-tests-results">
          {hasRunHealthTests ? this.summaryBody() : null}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    position: 'relative',
    height: '100%'
  },
  list: {
    paddingLeft: 0,
    listStyle: 'none'
  },
  testResult: {
    fontSize:  13,
    padding: '3px 3px 4px',
    lineHeight: '20px',
    marginBottom: 3,
  },
  label: {
    maxWidth: '90%',
    display: 'block',
    float: 'left',
    paddingRight: 5
  },
  legendBlock: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12
  },
  legend: {
    display: 'block',
    float: 'left',
    paddingRight: 15,
  },
  legendIcon: {
    float: 'left',
    paddingRight: 5
  }
}
