import _ from 'lodash'
import React from 'react'
import cx from 'classnames'
import {Link} from 'react-router'

class Tabs extends React.Component {

  render() {
    return (
      <ul className={"nav nav-tabs " + (this.props.className || '')}>
        {React.Children.map(this.props.children, (child, i) =>
          child ? React.cloneElement(child, {key: i, rootLink: this.props.rootLink, active: this.props.active}) : null
        )}
      </ul>
    )
  }
}

Tabs.Link = class extends React.Component {

  getUrl() {
    return this.props.url || this.props.rootLink + (this.props.match ? "/" + this.props.match : '');
  }

  isActive() {
    if (_.isArray(this.props.match)) {
      return _.includes(this.props.match, this.props.active || '')
    } else {
      return (this.props.active || '') === (this.props.match || '')
    }
  }

  render() {
    return (
      <li className={cx({active: this.isActive()})}>
        <Link to={this.getUrl()}>{this.props.children || this.props.label}</Link>
      </li>
    )
  }
}

export default Tabs
