import React from 'react'
import {Map as IMap} from 'immutable'
import {connect} from 'react-redux'
import {RRow, RCol} from 'ui'
import {getFieldValue} from 'data/definition-helpers'

@connect((state, {jobId}) => {
  const company = state.fn.companyByJobId(jobId) || IMap()
  const companyName = company.get('name')
  const companyLogoUrl = company.get('company_photo_url', '')

  const companyLogo = (companyLogoUrl && companyLogoUrl.indexOf('http://') === 0)
    ? companyLogoUrl.replace('http://www.ucarecdn', 'https://ucarecdn')
    : companyLogoUrl

  return {
    companyName,
    companyLogo
  }
})
/**
 * Shown on print, this is the company logo or name if no logo exists.
 */
class ReportHeaderLeft extends React.Component {
  render() {
    const {companyLogo, companyName} = this.props
    const displayName = companyName ? companyName : "Company Logo / Name"

    if (!companyLogo) {
      return <h2>{displayName}</h2>
    }
    return (
      <div style={styles.contractorLogoContainer}>
        <img src={companyLogo} className="logo logo-contractor" style={styles.contractorLogo} />
      </div>
    )
  }
}

/**
 * Shown on print, this is usually the program logo and contact information
 */
class ReportHeaderRight extends React.Component {

  static propTypes = {
    branding: React.PropTypes.object,
  };

  render() {
    let {name, branding} = this.props;
    branding = branding || {}

    const logo = branding[`${name}HeaderLogo`]
    if (!logo) {
      return <div className="program-branding"></div>
    }
    const {programName, programWebsite, programPhone, headerLogoStyle} = branding
    const logoStyle = headerLogoStyle || {}
    return (
      <div className="program-branding">
        <img src={logo} alt={programName} style={logoStyle}/>
        <div>
          <small className="muted">
            {programWebsite}
            {(programWebsite && programPhone) ? '\u00A0•\u00A0' : ''}
            {programPhone}
          </small>
        </div>
      </div>
    )
  }
}

@connect((state, props) => {
  return {
    fieldValue: getFieldValue(state, props)
  }
})
/**
 * This is the header component for the report page
 */
export default class ReportHeader extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired,
    printing: React.PropTypes.bool,
    action: React.PropTypes.func,
    branding: React.PropTypes.object,
    /**
     * Users cannot change the page title when 'disabled' is passed as a prop.
     */
    disabled: React.PropTypes.bool
  };

  static propTypes = {
    /**
     * Pass this prop when you don't want the header to appear on the print view.
      It will still show the page title on the edit view.
      This can be useful for custom rebates page and the CoC.
     */
    noPrint: React.PropTypes.bool
  }

  renderPrint() {
    const {name, fieldValue, children, noPrint} = this.props // todo: put branding back
    const {branding} = this.context
    const logo = branding[`${name}HeaderLogo`]
    const title = branding[`${name}Title`]

    if (noPrint) {
      return null
    }

    if (children) {
      return (
        <div className="report-header">
          {children}
        </div>
      )
    }

    return (
      <div className="report-header">
        <RCol span={3}>
          <ReportHeaderLeft jobId={this.context.jobId} />
        </RCol>
        {logo ?
          <RRow>
            <RCol span={6}>
              <div className="report-title">
                <h1>{title || fieldValue}</h1>
              </div>
            </RCol>
            <RCol span={3}>
              <ReportHeaderRight name={name} branding={branding} />
            </RCol>
          </RRow>
          :
          <RCol span={9}>
            <div className="report-title">
              <h1>{title || fieldValue}</h1>
            </div>
          </RCol>
        }
      </div>
    )
  }

  render() {
    const {field, uuid, disabled, name} = this.props
    const {branding, printing} = this.context
    if (printing) {
      return this.renderPrint()
    }
    return (
      <div className="editable-page-header">
        {branding[`${name}Title`] ?
          <h3 style={{cursor: 'not-allowed'}}>{branding[`${name}Title`]}</h3>
          :
          <h3 className="editable-container">
            <Snugg.Input
            field={field}
            uuid={uuid}
            disabled={disabled}
            placeholder="Name this page"
            className="editable"
            bare
            size={12} />
          </h3>
        }
      </div>
    )
  }
}

const styles = {
  contractorLogoContainer: {
    height: 55,
    display:'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-end',
    alignContent: 'flex-start',
    alignItems: 'baseline'
  },
  contractorLogo: {
    maxWidth: 222,
    maxHeight: 55,
    height: 'auto',
    width: 'auto',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 0

  }
}
