import React, {PropTypes} from 'react'
import Radium from 'radium'

// Icons
const companyProfileIcon = require('../../src/img/ui/companyProfileIcon.svg')
const webinarIcon = require('../../src/img/ui/webinarIcon.svg')
const pricingPlanIcon = require('../../src/img/ui/pricingPlanIcon.svg')
const fieldSheetIcon = require('../../src/img/ui/fieldSheetIcon.svg')
const templatesIcon = require('../../src/img/ui/templatesIcon.svg')
const mobileIcon = require('../../src/img/ui/mobileIcon.svg')
const usersIcon = require('../../src/img/ui/usersIcon.svg')
const refineIcon = require('../../src/img/ui/refineIcon.svg')
const inputIcon = require('../../src/img/ui/inputIcon.svg')
const financingIcon = require('../../src/img/ui/financingIcon.svg')
const reportIcon = require('../../src/img/ui/reportIcon.svg')


export function getIcon(srcIcon: string) {
  switch (srcIcon) {
    case 'companyProfileIcon': return companyProfileIcon
    case 'webinarIcon': return webinarIcon
    case 'pricingPlanIcon': return pricingPlanIcon
    case 'fieldSheetIcon': return fieldSheetIcon
    case 'templatesIcon': return templatesIcon
    case 'mobileIcon': return mobileIcon
    case 'usersIcon': return usersIcon
    case 'inputIcon': return inputIcon
    case 'refineIcon': return refineIcon
    case 'financingIcon': return financingIcon
    case 'reportIcon': return reportIcon
    default: return companyProfileIcon
  }
}

@Radium
export default class DetailedIcon extends React.Component {
  static propTypes = {
    srcIcon: PropTypes.string.isRequired,
    style: PropTypes.object,
  }
  render() {
    const {srcIcon, style} = this.props
    return <img src={getIcon(srcIcon)} style={style}/>
  }
}
