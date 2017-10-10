import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import ReportSettingsPopover from './ReportSettingsPopover'
import ReportThemesPopover from './ReportThemesPopover'
import {Icon, ToolbarLabel} from 'ui'
import {UISIZE} from 'app/lib/global-styles'
import dynamicResize from 'decorators/dynamicResize'
import scrollSpy from 'decorators/scrollSpyDecorator'
import Radium from 'radium'
import {Row, Col, Overlay} from 'react-bootstrap'
import dimensions from 'util/dimensions'
import OverlayPassthrough from '../../ui/OverlayPassthrough'

@Radium
@dynamicResize
@scrollSpy
export default class ReportContainerHeader extends React.Component {

  static propTypes = {
    jobId: PropTypes.number.isRequired,
    showSecondaryNav: PropTypes.bool.isRequired,
  };

  state = {
    settingsIsVisible: false,
    settingsPill: 'page',
    themesIsVisible: false
  }

  settingsPillClickHandler = (pill, e) => {
    this.setState({settingsPill: pill})
    e.preventDefault()
  }

  toggleThemes = (e) => {
    e.preventDefault()
    this.setState({
      themesIsVisible: !this.state.themesIsVisible
    })
  }

  toggleSettings = (e) => {
    e.preventDefault()
    this.setState({
      settingsIsVisible: !this.state.settingsIsVisible
    })
  }
  goToPrint = (e) => {
    e.preventDefault()
    const {jobId} = this.props
    location.href = `/job/${jobId}/present`
  }
  getBarStyle() {
    const {
      props: {showSecondaryNav},
      state: {isSpying}
    } = this
    const {screenSize} = dimensions
    let translateX = UISIZE.sidebarWidth
    let translateY = isSpying ? UISIZE.scrollSpyOffset : UISIZE.header
    let left = '16.66666%'
    if (screenSize === 'xs') {
      const spyOffset = isSpying ? UISIZE.scrollSpyOffset : UISIZE.xsJobHeader
      translateY = spyOffset
      translateX = showSecondaryNav ? UISIZE.secondaryReportNavWidth : 0
      left = '0'
    }

    return {
      ...styles.toolbar,
      transform: `translateX(${translateX}px) translateY(${translateY}px)`,
      left: left
    }
  }

  render() {
    const {jobId, programId} = this.props
    return (
      <Row>
        <div style={this.getBarStyle(this.props)}>
          <div className="content-header content-header-report">
            <div className="rep-toolbar rep-toolbar-report">
              <div style={styles.innerToolbar} ref="toolbar">
                <ToolbarLabel label="Report"/>
                <button className="btn rep-btn" onClick={this.toggleSettings} ref="settingsButton">
                  <Icon type="reportSettings" size={18}/> <br/>Settings
                </button>
                <Overlay
                  show={this.state.settingsIsVisible}
                  onHide={() => this.setState({ settingsIsVisible: false})}
                  placement="bottom"
                  container={this.refs.toolbar}
                  target={() => this.refs.settingsButton}
                  rootClose>
                  <OverlayPassthrough>
                    <ReportSettingsPopover
                      jobId={jobId}
                      programId={programId}
                      pill={this.state.settingsPill}
                      pillClickHandler={this.settingsPillClickHandler}/>
                  </OverlayPassthrough>
                </Overlay>
                <button className="btn rep-btn" onClick={this.toggleThemes} ref="themesButton">
                  <div className="report-theme theme-swatch"></div> Theme
                </button>
                <Overlay
                  show={this.state.themesIsVisible}
                  onHide={() => this.setState({ themesIsVisible: false })}
                  placement='bottom'
                  container={this.refs.toolbar}
                  target={() => this.refs.themesButton}
                  rootClose>
                  <OverlayPassthrough>
                    <ReportThemesPopover jobId={jobId}/>
                  </OverlayPassthrough>
                </Overlay>
                <button onClick={this.goToPrint} className="btn rep-btn">
                  <Icon type="present" size={18}/><br/> View/Print
                </button>
              </div>
            </div>
            <Col sm={5} />
            <Col sm={3} />
          </div>
        </div>
      </Row>
    );
  }
}

const styles = {
  toolbar: {
    width: '100%',
    position: 'fixed',
    marginTop: 0,
    top: 0,
    right: 0,
    zIndex: 1
  },
  innerToolbar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'flex-start'
  }

}
