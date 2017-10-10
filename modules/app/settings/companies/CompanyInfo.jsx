import React from 'react'
import usStates from 'app/job/components/states'
import Uploadcare from 'app/components/Uploadcare'
import {connect} from 'snugg-redux'
import {updateCompanyImage} from 'data/actions'
import {Row, Col} from 'react-bootstrap'

@connect((state, {params: {companyId}}) => {
  return {
    url: state.fn.companyById(companyId).get('company_photo_url')
  }
}, {updateCompanyImage})
export default class CompanyInfo extends React.Component {

  updateCompanyImage = (image) => {
    this.props.updateCompanyImage(this.props.params.companyId, image)
  };

  render() {
    let {
      props: {url, params: {companyId}}
    } = this
    return (
      <div className="tab-pane active" id="settings-company-info">
        <h2>Company Profile</h2>
        <form id="preferences" name="preferences">
          <Row>
            <Col sm={6}>
              <fieldset>
                <p>
                  This information is used to populate your homeowner reports.
                  If you need to change the <strong>company name</strong>, please contact support.
                </p>
                <Snugg.Input id={companyId} field="Company Name" id={companyId} disabled />
                <Snugg.Input id={companyId} field="Company Address 1" />
                <Snugg.Input id={companyId} field="Company Address 2" />
                <Snugg.Input id={companyId} field="Company City" />
                <Snugg.Select id={companyId} field="Company State" options={usStates} required />
                <Snugg.Input id={companyId} field="Company Zip" />
                <Snugg.Input id={companyId} field="Company Website" />
                <Snugg.Input id={companyId} field="Company Office Phone" placeholder="(555) 555-5555" />
                <div className="form-group form-group-lg">
                  <label className="control-label col-sm-3 col-xs-12">Company logo</label>
                  <div className="clearfix">
                    <div className="col-sm-4">
                      <Uploadcare
                        url={url}
                        updateImage={this.updateCompanyImage}
                        style={{width: 200}} />
                    </div>
                  </div>
                </div>
                <Snugg.Textarea id={companyId} field="Company Hours of operation" />
              </fieldset>
            </Col>
          </Row>
        </form>
      </div>
    )
  }
}
