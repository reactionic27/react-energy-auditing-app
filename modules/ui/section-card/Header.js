import React, {PropTypes} from 'react'
import Radium from 'radium'
import Color from 'color'
import {DeleteButton} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import {dispatchLocal} from 'data/actions'
import dimensions from 'util/dimensions'
import dynamicResize from 'decorators/dynamicResize'

/**
 * Use this inside the <Card></Card> component to create the header.
 */
@connect(null, {dispatchLocal})
@Radium
@dynamicResize
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
    isClickable: PropTypes.bool,
    field: PropTypes.string,
    /**
    * Pass your own style prop. Gets combined with base styling and supercedes it in any conflict.
    */
    style: PropTypes.object
  }

  static defaultProps = {
    isDeletable: false,
    confirmDelete: false,
    title: "",
    isClickable: false,
    style: {}

  }
  constructor(props) {
    super(props)
    this.focusField = this.focusField.bind(this)
  }
  focusField() {
    const {field, dispatchLocal} = this.props
    let contextState = {lastFocusedField: field}
    if (dimensions.screenSize === 'xs') { contextState.showContextSlidePane = true }
    field && dispatchLocal('contextState', contextState)
  }

  render() {
    const {isDeletable, confirmDelete, title, children, isClickable, onClick, style} = this.props
    const computedStyle = onClick || isClickable ? {...clickableStyle, ...style} : {...baseStyle, ...style}
    return (
      <div style={computedStyle}>
        {title !== "" ?
          <div style={titleStyle} onClick={this.focusField}>
            <span style={titleStyle}>{title}</span>
          </div>
          : null
        }
        <div style={childrenStyle}>{children}</div>
        {isDeletable ?
          <DeleteButton confirmDelete={confirmDelete}/>
          : null
        }
        <Clearfix/>
      </div>
    )
  }
}

const headerColor = "#ffffff"

const baseStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignContent: 'flex-start',
  alignItems: 'center',
  padding: '0 0 0 10px',
  minHeight: 44,
  fontSize: 16,
  width: '100%',
  borderRadius: '3px 3px 0 0',
  '@media (min-width: 768)': {
    fontSize: 18
  }
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
  fontWeight: 600,
  paddingRight: 3,
  minHeight: 20,
}

const childrenStyle = {
  flexGrow: 2,
}
