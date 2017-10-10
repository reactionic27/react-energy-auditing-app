import React, {Component} from 'react'
import {palette} from 'app/lib/global-styles'
import Radium from 'radium'
import Color from 'color'
import {Icon} from 'ui'
import ReactDOM from 'react-dom'
import {prepUrl, uploadcareStart, isUploadcareStarted, maxFileSize} from './helpers'

const $ = uploadcare.jQuery

@Radium
export default class FileUpload extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    uploadcareStart()
  }
  showUploadDialog = (e) => {
    e.preventDefault()
    const widget = uploadcare.Widget(ReactDOM.findDOMNode(this.refs.uploader));
    widget.openDialog()
  };
  prepUploadBox = () => {
    if (isUploadcareStarted()) {
      this._widget = uploadcare.Widget(ReactDOM.findDOMNode(this.refs.uploader));
      // Validation to throw error is file size > 10 MB
      this._widget.validators.push(maxFileSize(10 * 1024 * 1024));
      this._widget.onChange((value) => {
        if (value) value.progress((progressInfo) => {
          this.props.setProgress(progressInfo)
        })
        if (value) value.done((data) => {
          this.setFileInfo(data)
        })
      })
    }
  }
  setFileInfo = (data) => {
    this.props.setFileInfo(data)
    this.props.setProgress({progress: null})
    this._widget.value(null)
  }
  componentDidMount() {
    setTimeout(() => this.replaceHTML, 100)
    this.prepUploadBox();
  }
  render() {
    const {width, height} = this.props
    const dataCrop = (width && height) ? `${width}x${height} upscale` : 'upscale'
    return (
      <div className='uploadcare-file-container' ref='container'>
        <button onClick={this.showUploadDialog} style={styles.attachBtn} className="btn"><Icon type="attachment" size={19} /></button>
        <input
          ref="uploader"
          type="hidden"
          role="uploadcare-uploader"
          data-preview-step={false}
          data-crop={dataCrop}
          data-image-shrink="2000x2000"
          data-tabs="file url gdrive" />
      </div>
    )
  }
}

const styles = {
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
}
