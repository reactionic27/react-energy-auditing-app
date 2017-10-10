import React, {PropTypes} from 'react'
import cx from 'classnames'
import {Clearfix} from 'react-bootstrap'
import Radium from 'radium'
import {Button, DetailedIcon} from 'ui'

export const InfoBoxButton = (props) => (
  <Button
    customStyle={{display: 'inline-block', width: 'auto', marginTop: 15}}
    isFlat
    float="right"
    variant="link"
    {...props}/>
)

export const InfoBoxHeader = (props) => (
  <div style={titleStyle}>
    {props.children}
    <Clearfix/>
  </div>
)

@Radium
export class InfoBox extends React.Component {

  static propTypes = {
    title:PropTypes.string,
    showCloseButton: PropTypes.bool,
    timeout: PropTypes.number,
    srcIcon: PropTypes.string,
    style: PropTypes.object,
    isClickable: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'lg']),
    className: PropTypes.string
  }

  static defaultProps = {
    showCloseButton: false,
    showTitle: true,
    isClickable: false,
    size: 'lg'
  }

  state = {
    closeAlert: false
  }

  getStyles() {
    const {style, isClickable, size} = this.props
    const sizeStyle = size === 'lg' ? lgContainerStyle : {}
    return isClickable ? {...clickableStyle, ...sizeStyle, ...style} : {...containerStyle, ...sizeStyle, ...style}
  }

  render() {
    const {
      props: {
        type,
        title,
        showCloseButton,
        srcIcon,
        size,
        className
      },
      state: {closeAlert}
    } = this
    const dynamicClasses = cx({
      // This is makes popup alerts appear
      'animated fadeInUp': closeAlert === false && type === 'alert',
      // This makes popup alerts disappear
      'animated fadeOutDown' : closeAlert === true && type === 'alert',
      // This makes inline notifications disappear
      'animated fadeIn' : closeAlert === false && type === 'inline',
      // This makes inline notifications disappear
      'animated fadeOut' : closeAlert === true && type === 'inline'
    }, className)
    const computedStyles = this.getStyles()
    return (
      <div className={dynamicClasses} style={computedStyles}>
        {showCloseButton &&
          <button type="button" className="close" style={{position: 'absolute', right: 10, top: 5}} onClick={(e) => this.closeAlert(e)}>
            <span>&times;</span>
          </button>
        }
        {srcIcon &&
          <div style={size === "lg" ? lgIconContainerStyle : iconContainerStyle}>
            <DetailedIcon srcIcon={srcIcon} style={iconStyle}/>
          </div>        }
        <div style={contentStyle}>
          {title &&
            <InfoBoxHeader>{title}</InfoBoxHeader>
          }
          {this.props.children}
        </div>
        <Clearfix/>
      </div>
    )
  }
};


const containerStyle = {
  background: '#FFFFFF',
  boxShadow: '0 2px 6px 0 rgba(0,0,0,0.08), 0 -2px 6px 0 rgba(0,0,0,0.06)',
  borderRadius: 5,
  paddingTop: 15,
  paddingLeft: 10,
  paddingRight: 15,
  paddingBottom: 10,
  borderLeft: 'rgb(255, 244, 211) solid 24px',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
  alignContent: 'stretch',
  alignItems: 'stretch',
  position:'relative',
  marginBottom: 10,
  marginTop: 5,
  fontSize: 12,
  color: '#8e8e8e',
  lineHeight: '18px',
  letterSpacing: '0.02em',
  '@media (min-width: 992px)': {
    minHeight: 110,
    borderLeft: 'rgb(255, 244, 211) solid 48px',
  },
  '@media (min-width: 768px) and (max-width: 991px)': {
    minHeight: 132,
    borderLeft: 'rgb(255, 244, 211) solid 48px',
  }
}
const clickableStyle = {
  ...containerStyle,
  cursor: 'pointer',
  ':hover': {
    boxShadow: '0 2px 7px 0 rgba(0,0,0,0.3)',
  },
  ':active': {
    boxShadow: '0 2px 13px 0 rgba(0,0,0,0.4)',
  },
}

const lgContainerStyle = {
  color: '#333',
  fontSize: 14,
  lineHeight: '1.5em',
  paddingTop: 10,
  paddingBottom: 20,
  marginTop: 20
}

const titleStyle = {
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  paddingTop: 5,
  color: '#333'
}
const contentStyle = {
  flexGrow: 1,
  flexShrink: 0,
  flexBasis: 0
}
const iconContainerStyle = {
  marginTop: 'auto',
  marginBottom: 'auto',
  marginLeft: -25,
  float: 'left',
  display: 'inline-block',
  paddingRight: 10,
  paddingTop: 10,
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: 0,
  width: 60,
  height: 60,
  '@media (min-width: 768px)': {
    width: 85,
    height: 85,
    marginLeft: -35,
  },
}
const lgIconContainerStyle = {
  ...iconContainerStyle,
  marginTop: 10
}
const iconStyle = {
  width: 48,
  height: 48,
  '@media (min-width: 768px)': {
    width: 52,
    height: 52
  }
}
