import React from 'react'
import SecondaryNav from 'app/components/SecondaryNav'
import SecondaryNavLink from 'app/components/SecondaryNavLink'
import {SecondaryNavH2} from 'ui'

export default class RecommendationSecondaryNav extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  render() {
    const {recommendedCount, mentionedCount, declinedCount, showSecondaryNav} = this.props
    return (
      <SecondaryNav sm={2} showSecondaryNav={showSecondaryNav}>
        <SecondaryNavH2>RECOMMENDED {recommendedCount}</SecondaryNavH2>
        <SecondaryNavLink>Insulate Floors</SecondaryNavLink>
        <SecondaryNavLink>Ventilate Attic</SecondaryNavLink>

        <SecondaryNavH2>ADD'L NOTES {mentionedCount}</SecondaryNavH2>
        <SecondaryNavLink>Seal Air Leaks</SecondaryNavLink>
        <SecondaryNavLink>Upgrade Heating</SecondaryNavLink>

        <SecondaryNavH2>DECLINED {declinedCount}</SecondaryNavH2>
        <SecondaryNavLink>Upgrade Water Heater</SecondaryNavLink>

      </SecondaryNav>
    );
  }
}
