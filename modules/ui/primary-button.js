import React, {Component, PropTypes} from 'react'
import Button from './button'

export default class PrimaryButton extends Component {

  static propTypes = {
    label: PropTypes.string,            // Adds a label to your button when using a single self closing tag like
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),      // If present, we use the <Link> element
    isSubmit: PropTypes.bool,                             // When specified, this creates a submit button, otherwise defaults to <a>
    action: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),  // When this.props.type === 'submit'
    method: PropTypes.oneOf(['GET', 'POST']),             // When this.props.type === 'submit'
    onClick: PropTypes.func,  // OnClick Event
    onHover: PropTypes.func,  // onHover Event
    href: PropTypes.string,       // for generating a download link
    download: PropTypes.string,   // for naming a downloaded file
    disabled: PropTypes.bool
  };

  render() {
    return <Button margin="20px 0 20px 0" {...this.props} size='lg' variant='yellow' />
  }
}
