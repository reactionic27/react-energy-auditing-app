import React, {Component} from 'react'
import {Link} from 'react-router';
import Radium from 'radium';

// TODO: MAKE THIS WORK

@Radium
export default class StyledLink extends Component {

  render() {
    return <Link {...this.props}/>
  }
}
