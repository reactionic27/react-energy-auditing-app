import React from 'react'
import Tabs from 'ui/tabs'
import {Link} from 'react-router';
import {LeftPushNavBtn, Col, Row} from 'ui'

const SettingsHeader = ({pageTitle}) => (
  <Row>
    <div className="content-header" style={{'height': '46px'}}>
      <Col sm={12}>
        <LeftPushNavBtn />
        <h1 className="vertical-center">{pageTitle || "Settings"}</h1>
      </Col>
    </div>
  </Row>
)

export default SettingsHeader;
