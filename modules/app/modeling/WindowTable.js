import React, { Component } from 'react'
import WindowArea from 'app/jobform/tables/WindowArea'
import Walls from 'app/jobform/tables/walls'
import {connect} from 'snugg-redux'
import * as f from 'data/formatters'
import {Row, Col} from 'react-bootstrap'

@connect((state, {uuid, collectionIndex}) => {
  const windowsCollection = state.fn.windowByUuid(uuid)
  const windowName = f.collection.collectionName('window', windowsCollection, collectionIndex)
  return {
    windowName
  }
})
export default class WindowTable extends Component {
  render() {
    const { uuid, jobId, windowName } = this.props
    return (
      <div>
        <Row>
          <Col sm={9} smOffset={3}>
            <h4>{windowName}</h4>
          </Col>
        </Row>

        <WindowArea uuid={uuid} jobId={jobId} />
        <Walls jobId={jobId} />
      </div>
    );
  }
}
