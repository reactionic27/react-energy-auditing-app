import React, {PropTypes} from 'react'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import {DeleteButton} from 'ui'
import {Clearfix} from 'react-bootstrap'

/**
 * Use this inside the <Card></Card> component to create the header.
 */

@Radium
export default class Header extends React.Component {
  static propTypes = {
    /**
    * This will determine whether we add the delete button
    */
    isDeletable: PropTypes.bool,
    /**
     * If true, then the confirmation modal dialog should appear
     */
    // confirmDelete: PropTypes.bool,
    /**
    * Title
    */
    title: PropTypes.string,
    /**
    * Adds the appropriate styling for hover and active states if true
    */
    isClickable: PropTypes.bool
  }

  static defaultProps = {
    isDeletable: false,
    confirmDelete: false,
    title: "",
    isClickable: false
  }

  render() {
    const {isDeletable, confirmDelete, title, children, isClickable, onClick} = this.props
    const computedStyle = onClick || isClickable ? clickableStyle : baseStyle
    return (
      <div style={computedStyle}>
        <div style={titleStyle}>
          <span style={titleStyle}>{title}</span>
        </div>
        <div>{children}</div>
        {isDeletable ?
          <DeleteButton confirmDelete={confirmDelete}/>
          : null
        }
        <Clearfix/>
      </div>
    )
  }
}

const headerColor = Color(palette.BEIGE).lighten(0.009).rgbString()

const baseStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignContent: 'flex-start',
  alignItems: 'center',
  padding: '0 0 0 10px',
  backgroundColor: headerColor,
  borderBottom: `1px solid ${Color(headerColor).darken(0.05).rgbString()}`,
  minHeight: 44,
  width: '100%',
  borderRadius: '3px 3px 0 0'
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

const titleStyle = {
  flexGrow: 1,
  fontWeight: 400,
  fontSize: 16,
  paddingRight: 5
}
