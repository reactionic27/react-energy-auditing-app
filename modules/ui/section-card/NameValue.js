import React, {PropTypes} from 'react'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import {Clearfix} from 'react-bootstrap'
import {MutedText} from 'ui'
/**
 * Use this inside the <CardBody></CardBody> component to create a list
 with a key on the right and value on the left.
 */

@Radium
export default class NameValue extends React.Component {
  static propTypes = {
    /**
    * Add a descriptive label for the value.
    */
    name: PropTypes.string,
    /**
    * This is a subtle explanation which appears below the name
    */
    Description: PropTypes.string,
    /**
    * Adds the appropriate styling for hover and active states if true
    */
    isClickable: PropTypes.bool
  }

  static defaultProps = {
    name: 'Missing Label',
    isClickable: false
  }

  render() {
    const {children, isClickable, onClick, name, description} = this.props
    const computedStyle = onClick || isClickable ? clickableStyle : baseStyle
    return (
      <div style={computedStyle}>
        <div style={keyStyle}>
          {name}
          <div style={descriptionStyle}>
            <MutedText>{description}</MutedText>
          </div>
        </div>
        <div style={valueStyle}>{children}</div>
        <Clearfix/>
      </div>
    )
  }
}

const headerColor = palette.BEIGE

const baseStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignContent: 'flex-start',
  alignItems: 'center',
  minHeight: 40,
  paddingTop: 8,
  paddingBottom: 8,
  width: '100%',
  borderBottom: `1px solid ${palette.GRAYLIGHTEST}`
}

const clickableStyle = {
  ...baseStyle,
  ':hover' : {
    backgroundColor: Color(headerColor).darken(0.3).rgbString()
  },
  ':focus' : {
    backgroundColor: Color(headerColor).darken(0.3).rgbString()
  },
  ':active' : {
    backgroundColor: Color(headerColor).darken(0.45).rgbString()
  }
}

const keyStyle = {
  flexGrow: 1,
}

const descriptionStyle = {
  fontSize: '0.8em'
}

const valueStyle = {
  ...keyStyle,
  textAlign: 'right',
  paddingLeft: 5
}
