import React, {PropTypes} from 'react'
import dimensions from 'util/dimensions'
import scrollSpy from 'decorators/scrollSpyDecorator'
import Radium from 'radium'
import dynamicResize from 'decorators/dynamicResize'
import {palette, UISIZE, ANIMATION} from 'app/lib/global-styles'
import Color from 'color'
import {SecondaryNavToggle} from 'ui'
import {browser as Bowser} from 'bowser'
import {Col} from 'react-bootstrap'

@dynamicResize
@scrollSpy
@Radium
export default class SecondaryNav extends React.Component {

  state = {
    showModal: false,
    isActiveLink: 0,
  }

  static propTypes = {
    showSecondaryNav: PropTypes.bool.isRequired,
    xs: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    sm: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    md: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    lg: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
  };

  defaultProps = {
    xs: 12
  }

  getNavStyle() {
    const {
      props: {showSecondaryNav},
      state: {isSpying}
    } = this
    const {screenSize} = dimensions
    const isTouch = Bowser.mobile || Bowser.tablet

    let translateY = isSpying ? UISIZE.scrollSpyOffset : UISIZE.header
    let translateX = UISIZE.sidebarWidth

    if (screenSize === 'xs') {
      if (showSecondaryNav) {
        translateX = 0
        translateY = isSpying ? UISIZE.scrollSpyOffset : UISIZE.xsJobHeader
      }
      else {
        translateX = -UISIZE.secondaryJobformNavWidth
        translateY = UISIZE.xsJobHeader
      }
    }

    let webkitOverflowScrolling;
    if (isTouch) {
      webkitOverflowScrolling = {WebkitOverflowScrolling: 'touch'}
    }

    return {
      ...styles.secondaryJobformNav,
      ...webkitOverflowScrolling,
      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(0)`
    }
  }

  getToggleButtonStyle() {
    const {showSecondaryNav} = this.props
    const {screenSize} = dimensions

    let toggleStyles
    if (screenSize === 'xs') {
      toggleStyles = {
        display: 'block'
      }
      if (showSecondaryNav) {
        toggleStyles.left = UISIZE.secondaryJobformNavWidth + 20
      }
    }

    return {
      ...styles.toggleButton,
      ...toggleStyles
    }
  }

  render() {
    const {xs, sm, md, lg} = this.props
    return (
      <div>
        <SecondaryNavToggle isFlat customStyle={this.getToggleButtonStyle()}/>
        <Col
          xs={xs}
          sm={sm || xs}
          md={md || sm || xs}
          lg={lg || md || sm || xs}
          style={this.getNavStyle()}
          className="secondary-nav job-secondary-nav">
            {this.props.children}
        </Col>
      </div>
    )
  }
};

const styles = {
  secondaryJobformNav: {
    position: 'fixed',
    zIndex: 1060,
    backgroundColor: Color(palette.BEIGE).lighten(0.02).rgbString(),
    top: 0,
    left: 0,
    bottom: 0,
    overflowY: 'scroll',
    transition: ANIMATION,
    marginTop: -1,
    paddingBottom: 30,
    height: 'auto',
    paddingLeft: 0,
    paddingRight: 0,
    // width: UISIZE.secondaryJobformNavWidth,
    boxShadow: 'inset -1px 0 1px rgba(0,0,0,0.10)'
  },
  toggleButton: {
    position: 'fixed',
    display: 'none',
    bottom: 30,
    left: 20,
    transition: ANIMATION,
    width: 44,
    height: 44,
    fontSize: 12,
    zIndex: 1060,
    paddingTop: 7,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 9,
    borderRadius: 10,
    opacity: '0.6',
    ':hover': {
      opacity: '0.75'
    },
    ':active':{
      opacity: 1
    }
  },
  hasScrollSpy: {
    top: UISIZE.scrollSpyOffset
  },
  list: {
    listStyleType: 'none',
    padding: 0
  },
  link: {
    fontSize: 11,
    paddingTop: 13,
    paddingRight: 5,
    paddingBottom: 13,
    cursor: 'pointer',
    paddingLeft: 15,
    lineHeight: '1em',
    letterSpacing: '0.025em',
    display: 'block',
    userSelect: 'none',
    color: palette.BROWN,
    [':hover']: {
      backgroundColor: Color(palette.ORANGE).lighten(0.3).clearer(0.2).rgbString()
    },
    [':active']: {
      backgroundColor: Color(palette.ORANGE).clearer(0.3).rgbString(),
      color: '#000'
    }
  }
}

const activeLinkStyle = {
  ...styles.link,
  backgroundColor: Color(palette.ORANGE).clearer(0.4).rgbString(),
  color: '#000',
  [':hover']: {
    backgroundColor: Color(palette.ORANGE).clearer(0.4).rgbString(),
    color: '#000',
  }
}
