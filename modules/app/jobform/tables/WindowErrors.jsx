import React, { Component } from 'react'
import { connect } from 'snugg-redux'
import {InlineNotification} from 'app/components/overlays'
import _ from 'lodash'
import {isMultiFamily} from '../../../../constants/show-if-conditions'

function getErrorMessage(sides) {
  if (sides.length > 1) {
    const sidesString = sides.map(function(side, index) {
      if (index === sides.length - 1) {
        return side
      } else if (index === sides.length - 2) {
        return `${side} and `
      } else {
        return `${side}, `
      }
    }).join('')
    return `You indicated that you have windows on the ${sidesString} walls which are 100% shared walls with another housing unit. This is not supported, please change this.`
  } else {
    return `You indicated that you have windows on the ${sides} wall which is a 100% shared wall with another housing unit.  This is not supported, please fix.`
  }
}

function isGetterThanZero(value) {
  return parseInt(value) > 0
}

@connect((state, {uuid, jobId}) => {
  return {
    basedata: state.fn.basedataByJobId(jobId),
    win: state.fn.windowByUuid(uuid),
    isMultiFamily: isMultiFamily(state, {jobId})
  }
})
export default class WindowErrors extends Component {
  render() {
    const {win, basedata} = this.props
    const sides = _.compact(['north', 'east', 'west', 'south'].map(function(side) {
      return (parseInt(basedata.get(`shared_walls_${side}`)) === 100) && isGetterThanZero(win.get(`window_${side}_area_percent`)) ? side : ''
    }))
    if (sides.length === 0 || !this.props.isMultiFamily) {
      return null
    }

    return (
      <InlineNotification theme="error"  message={getErrorMessage(sides)} />
    );
  }
}
