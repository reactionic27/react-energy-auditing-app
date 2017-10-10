import React, {PropTypes} from 'react'
import {JOBFORM_SECTIONS} from 'data/constants'
import Radium from 'radium'
import dynamicResize from 'decorators/dynamicResize'
import {UISIZE} from 'app/lib/global-styles'
import {SecondaryNavH2} from 'ui'
import SecondaryNavLink from 'app/components/SecondaryNavLink'
import SecondaryNav from 'app/components/SecondaryNav'

@dynamicResize
@Radium
export default class JobFormSecondaryNav extends React.Component {

  state = {
    showModal: false,
    isActiveLink: 0,
  }

  static propTypes = {
    showSecondaryNav: PropTypes.bool.isRequired
  };

  render() {
    const {activeSection, hideSecondaryNav, showSecondaryNav} = this.props
    return (
      <SecondaryNav showSecondaryNav={showSecondaryNav} sm={2}>
        <SecondaryNavH2>INPUTS</SecondaryNavH2>
        {JOBFORM_SECTIONS.map((section, index) => {
          const {label, componentName} = section
          return (
            <SecondaryNavLink
              to={componentName}
              smooth
              duration={100}
              offset={index === 0 ? -(UISIZE.xsJobHeader + 15) : -(UISIZE.scrollSpyOffset + 15) }
              onClick={hideSecondaryNav}
              isActive = {label === activeSection}
              key={componentName}>
              {label}
            </SecondaryNavLink>
          )
        })}
      </SecondaryNav>
    )
  }
};
