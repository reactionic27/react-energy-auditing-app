import _ from 'lodash'
import React, {Component, PropTypes} from 'react'
import Radium from 'radium'
import {Link} from 'react-router'
import Color from 'color'
import {palette} from 'app/lib/global-styles'

let RadiumLink = Radium(Link);

@Radium
export default class Button extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      active: false,
      hover: false
    }
  }

  // Styling options
  static propTypes = {

    // Override the default borderRadius property with "2px 2px 3px 3px" or just "4px"
    borderRadius: PropTypes.string,

    // Removes drop shadow at the bottom of the btn
    isFlat: PropTypes.bool,
    float: PropTypes.oneOf(['left', 'right', 'none']),

    // Adds a label to your button when using a single self closing tag like
    label: PropTypes.string,

    // Give your button some breathing room. Example:  "10px 5px 5px 3px"
    margin: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'lg']), // Sets a smaller or bigger size
    variant: PropTypes.oneOf(['dark', 'light', 'yellow', 'orange', 'delete', 'link', 'custom']), // Sets btn color

    // Pass your own custom styles, use sparingly
    customStyle: PropTypes.object,

    // Attributes:

    // When specified, defaults to <a>
    isSubmit: PropTypes.bool,

    // When this.props.type === 'submit'
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),

    // This is useful for passing in a download link
    href: PropTypes.string,
    download: PropTypes.string,

    // When this.props.type === 'submit'
    method: PropTypes.oneOf(['GET', 'POST']),

    // If present, we use the <Link> element
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),

    // States
    loading: PropTypes.bool,
    active: PropTypes.bool,
    hover: PropTypes.bool,
    disabled: PropTypes.bool,
    isHidden: PropTypes.bool,

    // Events
    onClick: PropTypes.func, // OnClick Event
    onMouseOver: PropTypes.func, // OnHover Event
    onMouseOut: PropTypes.func
  };

  static defaultProps = {
    variant: 'dark',
    isSubmit: false

  };

  // Set styles based on styling props and Radium:
  getButtonStyle() {
    const {variant, size, isFlat, margin, float, borderRadius, customStyle} = this.props
    return (
      Object.assign({},
        styles.btn,
        variant && styles[variant],
        size && styles[size],
        isFlat && styles['isFlat'],
        margin && {margin: margin},
        float && {float: float},
        borderRadius && {borderRadius: borderRadius},
        this.state.hover && styles[variant][':hover'],
        this.state.active && styles[variant][':active'],
        customStyle && customStyle
      )
    )
  }

  // Set button content using this.props.label if it exists,
  // otherwise, use the children:
  getContent() {
    if (this.props.label) {
      return this.props.label
    }
    return this.props.children
  }

  mouseOverHandler = (e) => {
    e.preventDefault()
    this.setState({hover: true})
    if (_.isFunction(this.props.onMouseOver)) {
      this.props.onMouseOver(e)
    }
  };

  mouseOutHandler = (e) => {
    e.preventDefault()
    this.setState({hover: false, active:false})
  };

  clickHandler = (e) => {
    this.setState({active: true})
    this.props.onClick(e)
  };

  blurHandler = (e) => {
    e.preventDefault()
    this.setState({active: false})
  };

  // className="btn" isn't for styling, it's used to disable buttons for program admin
  render() {
    const {isSubmit, to, action, method, onClick, isHidden, disabled, download, href, target} = this.props
    const isLink = this.props.to ? true : false
    const btnClasses = `btn ${disabled ? 'disabled' : ''}`

    if (isHidden) {
      return null
    }

    if (isSubmit) {
      return (
        <button type="submit"
                style={this.getButtonStyle()}
                className={btnClasses}
                action={action}
                method={method}
                onMouseOver={this.mouseOverHandler}
                onMouseOut={this.mouseOutHandler}
                onClick={onClick && this.clickHandler}
                onBlur={this.blur}>
          {this.getContent()}
        </button>
      )
    }

    if (to) {
      return (
        <RadiumLink
          style={this.getButtonStyle()}
          className={btnClasses}
          onMouseOver={this.mouseOverHandler}
          onMouseOut={this.mouseOutHandler}
          onClick={onClick && this.clickHandler}
          onBlur={this.blur}
          to={to}
          {...filterButton(this.props)}>
            {this.getContent()}
        </RadiumLink>
      )
    }

    if (isLink || href) {
      return (
        <a
          href={href}
          target={target ? target : "_self"}
          className={btnClasses}
          style={this.getButtonStyle()}
          {...filterButton(this.props)}>
          {this.getContent()}
        </a>
      )
    }

    return (
      <button
        type="button"
        style={this.getButtonStyle()}
        className={btnClasses}
        onMouseOver={this.mouseOverHandler}
        onMouseOut={this.mouseOutHandler}
        onClick={onClick && this.clickHandler}
        onBlur={this.blur}
        {...filterButton(this.props)} >
        {this.getContent()}
      </button>
    )
  }
}
// Easily Generate 3D buttons
function btn3D(color, background) {
  color = Color(color)
  background = Color(background)
  let btn = {}
  btn.backgroundColor = background.hexString()
  btn.boxShadow = "0 2px 0 0 " + background.darken(0.25).hexString()
  btn.color = color.hexString()
  btn[':hover'] = {
    backgroundColor: background.darken(0.001).hexString()
  }
  btn[':active'] = {
    backgroundColor: background.darken(0.1).hexString(),
    boxShadow: "inset 0 0 0" + background.darken(0.15).hexString() + ", 0px 1px 0px 0px " + background.darken(0.20).hexString() + ", 0px 1px 1px #999"
  }
  // return the style object for this button
  return btn
}

// Radium Styles:
var styles = {

  btn: {
    'UserSelect': 'none',
    'WebkitUserSelect': 'none',
    backgroundImage:  'none',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle:  'solid',
    borderTopColor:  'transparent',
    borderRightColor:  'transparent',
    borderBottomColor:  'transparent',
    borderLeftColor:  'transparent',
    borderRadius: 4,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.42,
    outline: 'none',
    outlineOffset: 0,
    paddingTop: 6,
    paddingRight: 12,
    paddingBottom: 6,
    paddingLeft: 12,
    textAlign: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    width: '100%',
    touchAction: 'manipulation'
  },
  // Sizes:
  sm: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    fontSize: 12,
    lineHeight: 1.5,
    borderRadius: 3
  },
  lg: {
    fontSize: 16,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
  },
  // Variants:
  dark: btn3D(palette.BEIGE, palette.BROWN),
  light: {
    backgroundColor: palette.BEIGE,
    color: palette.BROWN,
    boxShadow: `0 2px 0 0 ${Color(palette.BEIGE).darken(0.25).hexString()}`,
    ':hover': {
      backgroundColor: Color(palette.BEIGE).darken(0.05).hexString()
    },
    ':active': {
      backgroundColor: Color(palette.BEIGE).darken(0.1).hexString(),
    }
  },
  yellow: btn3D(palette.BROWN, palette.YELLOW),
  orange: btn3D('#333333', palette.ORANGE),
  link: {
    backgroundColor: "inherit",
    display: 'inline-block',
    color:  palette.LINKCOLOR,
    ':hover': {
      backgroundColor: "rgba(0,0,0,0.05)",
    },
    ':active': {
      backgroundColor: 'rgba(0,0,0,0.1)',
      boxShadow: 'none'
    }
  },
  custom: {},
  delete: {
    backgroundColor: "inherit",
    color:  "#FF0000",
    ':hover': {
      backgroundColor: "#FF0000",
      color:  "#FFFFFF"
    },
    ':active': {
      backgroundColor: Color('#FF0000').darken(0.15).hexString(),
      color:  "#FFFFFF"
    }
  },
  isFlat: {
    boxShadow: 'none'
  }
}

const INVALID_BTN_PROPS = [
  `collection`,
  `jobId`,
  `collectionSize`,
  `dispatchEagerCreate`,
  `float`,
  `uuid`,
  `dispatchSave`,
  `dispatchCollectionDelete`,
  `customStyle`,
  `iconType`,
  `iconLabel`,
  `iconRotate`,
  `isActive`,
  `variant`,
  `isSubmit`,
  'isFlat',
  'borderRadius',
  'margin',
  'bare',
  'recUuid'
]

function filterButton(props) {
  return _.omit(props, INVALID_BTN_PROPS)
}
