import React from 'react'
import {FormGroup, Col, Clearfix} from 'react-bootstrap'
import Label from '../fields/Label'

export default class CheckboxGroup extends React.Component {

  render() {
    if (React.Children.count(this.props.children) === 0) return null
    return (
      <FormGroup bsSize="lg">
        <Label>{this.props.label}</Label>
        <Col sm={12}>
          {this.props.children}
        </Col>
        <Clearfix/>
      </FormGroup>
    )
  }

}
