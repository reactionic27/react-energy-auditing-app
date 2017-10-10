import React, {PropTypes} from 'react'
import Radium from 'radium'
import {browser as Bowser} from 'bowser'

@Radium
export class BaseSlidePane extends React.Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string,
    onExit: PropTypes.func.isRequired,
    noScroll: PropTypes.bool
  };

  state = {
    isExiting: false,
    isVisible: false
  };

  componentWillMount() {
    if (this.props.show) {
      this.setState({isVisible: true})
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      if (!this.state.isVisible) {
        this.setState({
          isVisible: true,
          isExiting: false
        })
      } else {
        this.setState({
          isVisible: false,
          isExiting: true
        })
        setTimeout(() => {
          this.setState({isExiting: false})
        }, 300)
      }
    }
  };

  // TODO: Can we create a decorator to encapsulate this for both panes and popovers?
  // Will need to remove both panes and popovers in the reducer
  // == close on click outside or esc key ======================================
  handleEscKey = (e) => {
    if (this.state.isVisible && e.keyCode === 27) {
      this.props.onExit()
    }
  };

  componentWillMount() {
    document.addEventListener("keydown", this.handleEscKey, false)
  };

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscKey, false)
  };

  // Called by @listensToClickOutside decorator.
  handleClickOutside = (e) => {
    if (this.state.isVisible && !this.props.allowClickOutside) {
      this.props.onExit()
    }
  };

  closePane = (e) => {
    e.preventDefault()
    this.props.onExit()
  };



  render() {
    const {
      state: {isVisible, isExiting},
      props: {children, title, noScroll}
    } = this


    const paneStyle = isVisible && !isExiting
      ? styles.paneStyle
      : styles.paneStyleHidden

    const computedPaneStyle = {
      ...paneStyle,
      'overflow': noScroll ? "hidden" : "scroll"
    }


    return (
      <div style={computedPaneStyle}>
        <div style={styles.paneHeader}>
          <button className="close" style={styles.closeBtn} onClick={this.closePane}>
            ×
          </button>
          <h3 style={styles.paneTitle}>{title}</h3>
        </div>
        <div className="pane-content">
          {isVisible || isExiting ? children : null}
        </div>
      </div>
    )
  }
};

const styles = {
  paneStyle: {
    position: 'fixed',
    top: 0,
    right: 0,
    transition: 'all .3s ease',
    left: 'auto',
    bottom: 0,
    maxWidth: '100%',
    width: 340,
    backgroundColor: "#ffffff",
    zIndex: 1065,
    boxShadow: "-2px 1px 6px rgba(0,0,0,0.4)",
    overflow: "scroll"
  },
  paneHeader: {
    padding: "10px 0 10px 20px",
  },
  paneTitle: {
    marginTop: 10,
    fontSize: 14,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: 600,
    color: "#888",
    letterSpacing: '0.03em'
  },
  closeBtn: {
    padding: "0px 20px 0 0",
    fontSize: 44,
    fontWeight: 300,
    lineHeight: '.9em',
    userSelect: 'none'
  }
}

styles.paneStyleHidden = {
  ...styles.paneStyle,
  transform: 'translateX(360px)'
}

if (Bowser.mobile || Bowser.tablet) {
  styles.paneStyle.WebkitOverflowScrolling = 'touch'
}
