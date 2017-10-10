import React, {PropTypes} from 'react'
import {RRow} from 'ui'
import {ReportSection, ReportHeader, ReportBody, ReportFooter} from 'app/report/components'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {VERSION} from 'data/constants'
import {getTechSpecsData, splitPages} from './getTechSpecsData'

@connect((state, props) => {
  return {
    dataRows: getTechSpecsData(state, props)
  }
})
export default class TechSpecsReportSection extends React.Component {
  static contextTypes = {
    jobId: PropTypes.number
  }
  constructor({dataRows}) {
    super()
    this.state = {
      pages: splitPages(dataRows)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataRows !== this.props.dataRows) {
      this.setState({
        pages: splitPages(nextProps.dataRows)
      }) //eslint-disable-line
    }
  }

  render() {
    const {
      state: {pages},
      context: {jobId}
    } = this
    return (
      <div>
        {pages.map((columns: Array, i) => (
          <ReportSection name="tech_specs" className="report-page-tech_specs" key={i}>
            <ReportHeader field="Report: Tech Specs Title" jobId={jobId} />
            <ReportBody>
              <RRow>
                {columns.map((column, i) => (
                  <div key={i} className="r-spa4">{renderColumn(column)}</div>
                ))}
              </RRow>
            </ReportBody>
            <ReportFooter jobId={jobId} />
          </ReportSection>
        ))}
      </div>
    )
  }
}

function renderColumn(column) {
  return (
    <div>
      {column.map((col, i) => {
        switch (col.$tag) {
          case 'title': return <SectionTitle {...col} key={i} />
          case 'collectionTitle': return <CollectionTitle {...col} key={i} />
          case 'field': return <FieldRow {...col} key={i} />
          case 'text': return <TextRow {...col} key={i} />
          case 'end': return <EndSections key={i} />
        }
      })}
    </div>
  )
}



function SectionTitle({value}) {
  return (
    <h3 style={styles.sectionTitle}>{value}</h3>
  )
}

function FieldRow({label, value}) {
  return (
    <div style={styles.fieldRow}>
      <div style={styles.rowLabel} dangerouslySetInnerHTML={{__html: label}} />
      <div style={styles.rowValue} dangerouslySetInnerHTML={{__html: value}} />
    </div>
  )
}

function CollectionTitle({value, index}) {
  return (
    <div style={styles.fieldRow}>
      <div style={styles.collectionTitle} dangerouslySetInnerHTML={{__html: f.report.collectionNameTitles(value) + ': ' + index}} />
    </div>
  )
}

function EndSections() {
  return (
    <div style={styles.endStyle}>
      Report & modeling software: Snugg Pro<sup style={{fontSize: 8}}>TM</sup> {VERSION}
    </div>
  )
}

function TextRow({value}) {
  return (
    <div style={styles.rowLabel} dangerouslySetInnerHTML={{__html: (value || '')}} />
  )
}

const styles = {
  sectionTitle: {
    marginTop: 10,
    fontSize: 14
  },
  fieldRow: {
    borderBottom: '1px dotted #d9d9d9',
    fontSize: '0.9em',
    lineHeight: '1.4em',
    display: 'flex',
    justifyContent: 'space-between'
  },
  rowLabel: {
    textAlign: 'left',
    marginRight: 'auto',
    flexShrink: 50
  },
  rowValue: {
    textAlign: 'right',
    overflow: 'hidden',
    marginLeft: 'auto',
    backgroundColor: 'white',
    paddingLeft: 5
  },
  collectionTitle: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textRow: {
    borderBottom: '1px dotted #d9d9d9'
  },
  endStyle: {
    borderTop: '1px dotted #ccc',
    paddingTop: 5,
    marginRop: 5,
    color: '#888'
  }
};
