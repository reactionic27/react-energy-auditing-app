import React, {Component} from 'react'
import {PaneFooter} from 'app/components/overlays'
import {Clearfix} from 'react-bootstrap'
import {palette} from 'app/lib/global-styles'
import Radium from 'radium'
import Color from 'color'
import dynamicResize from 'decorators/dynamicResize'
import { dispatchCreate }  from 'data/actions'
import { connect } from 'snugg-redux'
import uuid from 'node-uuid'
import FileUpload from 'app/components/Uploadcare/FileUpload'
import * as f from 'data/formatters'
import {browser as Bowser} from 'bowser'

@connect((state, {jobId}) => {
  const userId = state.fn.loggedInUser().get('id')
  return {
    userId,
  }
}, {dispatchCreate})
@Radium
@dynamicResize
export default class ActivityForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ''
    }
    this.setMessage = this.setMessage.bind(this)
    this.messageHandler = this.messageHandler.bind(this)
    this.enterHandler = this.enterHandler.bind(this)
    this.fileHandler = this.fileHandler.bind(this)
  }
  setMessage(e) {
    this.setState({
      message: e.target.value
    })
  }
  messageHandler() {
    const {jobId, userId} = this.props
    const {message} = this.state
    if (!f.str.trim(message)) return
    this.props.dispatchCreate('activityFeed', {
      job_id: jobId,
      account_id: userId,
      uuid: uuid.v4(),
      message: this.state.message,
    }, {noSpinner: true}).then(() => {
    })
    this.setState({
      message: ''
    })
  }
  enterHandler(e) {
    if ((e.key === 'Enter') && !e.shiftKey) {
      e.preventDefault()
      this.messageHandler()
      this.setState({
        message: ''
      })
    }
  }
  fileHandler(data) {
    console.log(data)
    const {jobId, userId} = this.props
    this.props.dispatchCreate('activityFeed', {
      job_id: jobId,
      account_id: userId,
      uuid: uuid.v4(),
      file_name: data.name,
      file_uuid: data.uuid,
      file_url: data.cdnUrl,
    }, {noSpinner: true}).then(() => {
    })
  }
  render() {
    const isTouch = Bowser.mobile || Bowser.tablet
    return (
      <PaneFooter>
        <textarea placeholder="Type something..." style={styles.textArea} value={this.state.message}  onChange={this.setMessage} onKeyDown={isTouch ? null : this.enterHandler}></textarea>
        <FileUpload setFileInfo={this.fileHandler} setProgress={this.props.setProgress}/>
        <button style={styles.postBtn} className="btn" key="radium-btn" onClick={this.messageHandler}>POST</button>
        <Clearfix/>
      </PaneFooter>
    )
  }
}

const styles = {
  textArea: {
    padding: '12px 5px 0 45px',
    border: "1px solid #ccc",
    float: 'left',
    display: 'inline-block',
    width: '85%',
    lineHeight: '1.3em',
    borderRadius: '4px 0 0 3px',
    overflowY: 'hidden',
    WebkitAppearance: 'none',
    resize: 'none',
    height: 44
  },
  attachBtn: {
    position:'absolute',
    backgroundColor: "#ffffff",
    color: palette.BROWN,
    border: 'none',
    boxShadow: 'none',
    height: 42,
    left: 6,
    top: 6,
    bottom: 6,
    borderRadius: '4px 0 0 3px',
    padding: '5px 10px 0',
    ':hover': {
      color: palette.LINKCOLOR,
      backgroundColor: palette.BEIGE
    },
    ':active':{
      color: 'inherit',
      backgroundColor: Color(palette.BEIGE).darken(0.05).hexString()
    }
  },
  postBtn: {
    width: '15%',
    padding: '12px 5px',
    float: 'right',
    display: 'inline-block',
    height: 44,
    borderRadius: '0 4px 4px 0',
    backgroundColor: palette.BROWN,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: `{Color(palette.Brown).darken(0.5).hexString()}`,
    boxShadow: 'none',
    color: palette.BEIGE,
    ':hover':{
      backgroundColor: palette.ORANGE,
      color: Color(palette.Brown).darken(0.8).hexString(),
      borderColor: Color(palette.ORANGE).darken(0.2).hexString()
    },
    ':active': {
      backgroundColor: Color(palette.ORANGE).darken(0.2).hexString(),
      borderColor: Color(palette.ORANGE).darken(0.4).hexString()
    }
  }
}
