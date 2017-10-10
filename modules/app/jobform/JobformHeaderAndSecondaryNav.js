import React from 'react';
import JobFormSecondaryNav from './JobFormSecondaryNav'

export default class JobformHeaderAndSecondaryNav extends React.Component {
  render() {
    const {props: {activeSection}} = this
    return (
      <JobFormSecondaryNav
        activeSection={activeSection}
        hideSecondaryNav={this.props.hideSecondaryNav}
        showSecondaryNav={this.props.showSecondaryNav} />
    );
  }
}
