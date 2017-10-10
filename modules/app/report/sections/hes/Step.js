import React, { PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'
import {InlineNotification} from 'app/components/overlays'
import {Icon} from 'ui'

export default class Step extends React.Component {



  static propTypes = {
    isActive: PropTypes.bool,
    title: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
  }

  static defaultProps = {
    isActive: false,
    title: '',
    errorMessage: ''
  }

  render() {
    const {isEnabled, title, errorMessage, children} = this.props
    const computedStyle = isEnabled ? enabledStyle : disabledStyle
    return (

      <Row>
        <Col xs={12}>
          <div style={computedStyle}>
            <h2>
              {title}
              {!isEnabled &&
                <Icon type="lock" float="right" size={48} style={{paddingTop:10, paddingRight: 65, opacity: 0.7}}/>
              }
            </h2>
            {errorMessage &&
              <InlineNotification message={errorMessage} theme="error"/>
            }
            {isEnabled ?
              children :
              <div>
                Complete previous step(s) to continue.
              </div>
            }
          </div>
          <hr style={hrStyle}/>
        </Col>
      </Row>
    )
  }
}

const enabledStyle = {

}

const disabledStyle = {
  ...enabledStyle,
  opacity: 0.5
}

const hrStyle = {
  marginTop: 40,
  marginBottom: 40
}
