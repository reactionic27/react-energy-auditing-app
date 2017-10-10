import React, {PropTypes} from 'react'

export default class Feedback extends React.Component {

  static propTypes = {
    feedback: PropTypes.oneOf(['', 'error', 'warning', 'success'])
  };

  getClass() {
    if (this.props.feedback) {
      return `has-${this.props.feedback}`
    }
    return ''
  }

  render() {
    return (
      <div className={this.getClass()}>
        {this.props.children}
      </div>
    );
  }
}
