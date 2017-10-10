import React, {Component, PropTypes} from 'react'
import Button from './button'

export default class AddButton extends Component {

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
    return (
      <Button
        size='lg'
        variant='yellow'
        {...this.props}
        customStyle={{
          width: '100%',
          minWidth: 260,
          marginTop:10,
          marginBottom: 20,
          borderRadius: '2em'}}
        isFlat />
    )
  }
}
