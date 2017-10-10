import React from 'react'
import ReactDOM from 'react-dom'
import {omit} from 'lodash'
import {Button, Icon} from 'ui'
import pure from 'pure-render-decorator'
import {uploadcareStart, isUploadcareStarted, prepUrl} from './helpers'

const $ = uploadcare.jQuery

@pure
export default class Uploadcare extends React.Component {

  static propTypes = {
    url: React.PropTypes.string,
    disabled: React.PropTypes.bool.isRequired,
    updateImage: React.PropTypes.func.isRequired,
    height: React.PropTypes.number,
    width: React.PropTypes.number,
    imgStyle: React.PropTypes.object,
    promptStyle: React.PropTypes.object
  };

  static contextTypes = {
    printing: React.PropTypes.bool,
    isProgramAdmin: React.PropTypes.bool
  };

  static defaultProps = {
    disabled: false,
    imgStyle: {},
    promptStyle: {}
  };

  removePhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setImageInfo({})
  };

  componentWillMount() {
    uploadcareStart()
  }

  componentDidMount() {
    setTimeout(() => this.replaceHTML, 100)
    if (!this.context.printing && !this.context.isProgramAdmin) {
      this.prepUploadBox();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      if (!this.props.url) {
        this._widget.value(null)
      }
      this.prepUploadBox();
    }
  }

  prepUploadBox() {
    if (isUploadcareStarted()) {
      this._widget = uploadcare.Widget(ReactDOM.findDOMNode(this.refs.uploader));
      this._widget.onChange((value) => {
        if (value) value.done(this.setImageInfo)
      })
      const node = ReactDOM.findDOMNode(this.refs.container)
      $(node)
        .find(".uploadcare-widget-dragndrop-area")
        .html(`
          <span class="snugg-upload-prompt-text">
            <i class="ico-budicon-10" style="font-size: 2.8em;"></i>
            <br/>
            Add an image
          </span>
        `)
    }
  }



  setImageInfo = (data) => {
    this.props.updateImage(data)
  };

  showUploadDialog = (e) => {
    e.preventDefault()
    if (!this.context.printing && !this.context.isProgramAdmin) {
      var widget = uploadcare.Widget(ReactDOM.findDOMNode(this.refs.uploader));
      widget.openDialog()
    }
  };

  getDeleteButtonStyle(props) {
    const { url } = props
    return {
      display: url ? 'inline-block' : 'none',
      width: 44,
      height: 44,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 10,
      fontSize: 18,
      color: '#FF0000',
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,0.9)',
      left: 0,
      right: 0,
      bottom: 3,
      margin: 'auto',
    }
  }

  render() {
    const {
      props: {url, disabled, height, width, imgStyle},
      context: {printing, isProgramAdmin}
    } = this
    let dataCrop = (width && height) ? `${width}x${height} upscale` : 'upscale'
    if (printing || isProgramAdmin) {
      return <img src={prepUrl(url, height, width)} style={imgStyle} />
    }
    return (
      <div className="uploadcare-container" {...stripProps(this.props)} ref="container">
        <div onClick={this.showUploadDialog}>
          {url && <img src={prepUrl(url, height, width)} style={imgStyle}/>}
          <div style={{display: url && 'none'}}>
            <input
              ref="uploader"
              type="hidden"
              role="uploadcare-uploader"
              value={prepUrl(url)}
              data-images-only
              data-crop={dataCrop}
              data-image-shrink="2000x2000"
              data-tabs="file url gdrive" />
          </div>
          <div>
            <Button
              variant="delete"
              disabled={disabled}
              onClick={this.removePhoto}
              customStyle={this.getDeleteButtonStyle(this.props)}>
              <Icon type="delete" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

function stripProps(props) {
  return omit(props, ['height', 'width', 'url', 'disabled', `updateImage`, `imgStyle`, `promptStyle`])
}
