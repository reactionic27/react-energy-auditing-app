import React from 'react'
import {Row} from 'react-bootstrap'

export default class UIRow extends React.Component {

  render() {
    return <Row {...this.props}/>
  }
}
