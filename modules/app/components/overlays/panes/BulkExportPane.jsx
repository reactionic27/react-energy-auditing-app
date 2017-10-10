import React from 'react'
import dimensions from 'util/dimensions'
import {BaseSlidePane, BulkLineItem, PaneFooter} from 'app/components/overlays'
import {SecondaryButton, Icon} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {connectSelector} from 'snugg-redux'
import * as s from 'data/selectors'
import dynamicResize from 'decorators/dynamicResize';
import Radium from 'radium'
import {post} from '../../../../util/network';
import {csvCreateAlertAction} from 'data/actions'

@connectSelector({
  selectedJobs: s.selectedJobs,
  account: (state) => {
    return state.fn.loggedInUser()
  },
}, {csvCreateAlertAction})
@Radium
@dynamicResize
export default class BulkExportPane extends React.Component {

  downloadCSV = (e, preview = false) => {
    e.preventDefault()
    const jobIds = this.props.selectedJobs.map(j => j.get('id')).sort()
    let qs = `jobIds=${jobIds.join(',')}`
    if (preview) {
      qs += '&table=1'
    }
    //window.open(`/csv-download?${qs}`, '_blank');
    let data = {
      jobIds: jobIds.join(',')
    }

    try {
      let csvrequest = post(`/csv-download`, data);
      this.props.csvCreateAlertAction()
    } catch (e) {
      console.log("Exception : ", e);
    }
  }

  getListStyle() {
    let {windowHeight} = dimensions
    let dynamicHeight = windowHeight - 109
    return (
      Object.assign({},
        styles.listContainer,
        {height: dynamicHeight}
      )
    )
  }

  render() {
    const {selectedJobs} = this.props
    const title = selectedJobs.length > 1 ? `Export these ${selectedJobs.length} jobs` : `Export this job`
    return (
      <BaseSlidePane allowClickOutside {...this.props} className="pane-export-bulk" title={title}>
        <div style={this.getListStyle()}>
          {selectedJobs.map(job => (
            <BulkLineItem job={job.toJS()} key={job.get('id')}/>
          ))}
          <Clearfix />
        </div>
        <PaneFooter>
          <SecondaryButton onClick={this.downloadCSV} customStyle={{margin: 0}}>
            <span style={{textAlign: 'left'}} onClick={this.downloadCsv}>Download as CSV</span>
            <span style={{float: 'right'}}><Icon type="export" padding="0 20px 0 0" size={20}/></span>
          </SecondaryButton>
        </PaneFooter>
      </BaseSlidePane>
    )
  }
}

const styles = {
  listContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    overflowY: 'auto',
    overflowX: 'scroll',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #e3e3e3'
  },
  linkStyle: {
    textAlign: 'center',
    display: 'block',
    marginTop: 10,
    cursor: 'pointer'
  }
}
