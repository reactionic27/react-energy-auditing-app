import React from 'react'
import {Modal} from 'react-bootstrap'
import {Button} from 'ui'
import Fields from 'fields'
import localForm from 'decorators/localFormDecorator'
import {post} from '../../util/network';
import {connect} from 'snugg-redux'
import {csvCreateAlertAction, errorAction} from 'data/actions'

@connect(null, {csvCreateAlertAction, errorAction})
@localForm
export default class ProgramJobExportModal extends React.Component {

  state = {
    form: {
      startDate: null,
      endDate: null
    }
  }

  downloadCSV = (e, preview = false) => {
    e.preventDefault()
    const {startDate, endDate} = this.state.form
    if (!(startDate && endDate)) {
      return
    }
    const pieces = []
    if (preview) {
      pieces.push('table=1')
    }
    if (this.state.form.startDate) {
      pieces.push(`startDate=${this.state.form.startDate}`)
    }
    if (this.state.form.endDate) {
      pieces.push(`endDate=${this.state.form.endDate}`)
    }
    //window.open(`/api/program-csv?${pieces.join('&')}`, '_blank')
    let data = {
      startDate: this.state.form.startDate,
      endDate : this.state.form.endDate
    }

    try {
      post(`/api/program-csv`, data)
        .then((res) => {
          this.props.csvCreateAlertAction()
          this.props.hideProgramJobExport()
        })
        .catch(e => {
          this.props.errorAction({
            message: 'There are no jobs that were created in the date range you specified.'
          })
        })
    } catch (e) {
      console.log("Exception program-csv : ", e);
    }
  }

  render() {
    const {show, hideProgramJobExport} = this.props
    return (
      <Modal
        show={show}
        bsSize="sm"
        onHide={hideProgramJobExport} >
        <Modal.Header closeButton>
          <Modal.Title>Export all program jobs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{paddingTop: 30, paddingBottom: 30}}>
            This will download all program jobs across
            all authorized companies in CSV format.
          </p>
          <Fields.DateField label="Start Date" {...this.stateField('startDate')} />
          <Fields.DateField label="End Date" {...this.stateField('endDate')} />
          <Button label="Download CSV" onClick={this.downloadCSV} variant="dark" size="lg"/>
        </Modal.Body>
      </Modal>
    )
  }
}
