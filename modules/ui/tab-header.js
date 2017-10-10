import React, {Component, PropTypes} from 'react'
import Button from './button'

export default class TabHeader extends Component {

  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string
  };

  render(){
    let {title, description} = this.props
    return (
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    )
  }
}
