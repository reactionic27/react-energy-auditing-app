import React, { Component } from 'react';
import scrollSpy from 'decorators/scrollSpyDecorator'
import pure from 'pure-render-decorator'
import requiredIf from 'react-required-if'
import Radium from 'radium'
import {SectionCard} from 'ui'
import {Clearfix} from 'react-bootstrap'
import dynamicResize from 'decorators/dynamicResize'
import { JOBFORM_SECTIONS } from 'data/constants'
import RecLink from './RecLink'
import {palette, UISIZE} from 'app/lib/global-styles'
import Color from 'color'
import dimensions from 'util/dimensions'

@Radium
@dynamicResize
@scrollSpy
export default class JobFormSectionHeader extends Component {
  constructor(props) {
    super(props)
  }
  getSectionStyle() {
    const {props: {fixed, transitioningHeight}} = this
    const {screenSize} = dimensions
    const baseStyles = screenSize === 'xs' ? {
      ...styles.sectionBar,
      paddingRight: 0
    } : styles.sectionBar
    if (!fixed) {
      return null
    }

    let translateX = UISIZE.secondaryJobformNavWidth + UISIZE.sidebarWidth
    let translateY = scrollSpy ? UISIZE.scrollSpyOffset : UISIZE.headerOffset
    if (screenSize === 'xs') {
      translateX = 0
    }
    if (transitioningHeight) {
      translateY = UISIZE.scrollSpyOffset + transitioningHeight
    }
    translateX += 15
    return {
      ...baseStyles,
      position: 'fixed',
      flexWrap: 'no-wrap',
      zIndex: 1059,
      top: 0,
      left: 0,
      right: translateX + 15,
      transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(0px)`
    }
  }
  render() {
    const {label, jobId, fixed} = this.props
    const {screenSize} = dimensions

    const section = JOBFORM_SECTIONS.find(section => section.label === label)
    if (!(label || section)) { return null }
    return (
      <div style={this.getSectionStyle()}>
        <SectionCard.Header title={label} style={fixed ? {fontSize: 12} : {fontSize: 'inherit'}}>
          {screenSize === 'xs' ?
            section.recLinks.map((recLink, index) => {
              return <RecLink jobId={jobId} key={index} recLink={recLink} customStyle={styles.sectionButton}/>
            })
          : null}
          <Clearfix />
        </SectionCard.Header>
      </div>
    );
  }
}

JobFormSectionHeader.propsTypes = {
  label: React.PropTypes.string.isRequired,
  jobId: React.PropTypes.number.isRequired
}

const styles = {
  sectionBar: {
    textAlign: 'left',
    marginTop: -1,
    marginRight: -15,
    marginLeft: -15,
    paddingRight: 6,
    paddingLeft: 6,
    height: UISIZE.sectionHeaderHeight,
    letterSpacing: '0.015em',
    backgroundColor: Color(palette.BEIGE).rgbString(),
    color: Color(palette.BROWN).rgbString(),
    borderTop: `1px solid ${Color(palette.BEIGE).darken(0.05).rgbString()}`,
    borderBottom: `1px solid ${Color(palette.BEIGE).darken(0.05).rgbString()}`,
    transform: 'translateZ(0)',
  },
  sectionButton:{
    float: 'right',
    textAlign: 'center',
    display: 'inline-block',
    paddingTop: 9,
    paddingLeft: 8,
    paddingBottom: 10,
    paddingRight: 8,
    borderRadius: 0,
    width: 'auto',
    fontSize: 12,
    fontWeight: 400,
    letterSpacing: '0.04em',
  }
}
