import React from 'react'
import CustomEucRebate from './euc-custom-rebate'
import {RRow, RCol} from 'ui'


export default class EUC extends React.Component {

  render() {
    return (
      <div className="report-page-rebates-euc">
        <div className="report-body">
          <div className="report-main">
            <RRow>
              <RCol span={12}>
                <p>&nbsp;</p>
              </RCol>
            </RRow>
            <CustomEucRebate jobId={this.props.jobId} />
            <RRow>
              <RCol span={5}>
                <p style={styles}>The above figures represent estimated savings based on energy modeling. Final savings and incentive amounts will be provided after all installation work is complete and the Energy Upgrade California® Home Upgrade program has completed its final review and issued an approval notification to the participating contractor and/or service account holder. All estimated and final savings and incentive amounts are subject to program participation and eligibility rules. Check with your local Energy Upgrade California® Home Upgrade program implementer for details.</p>
              </RCol>
              <RCol span={7}>
                <p style={styles}>Energy Upgrade California® Home Upgrade provides assistance and incentives for home improvement projects that can reduce energy use and make homes more comfortable. This statewide program is managed locally by utilities and regional energy networks and directed by the California Public Utilities Commission in collaboration with the California Energy Commission. Funding comes from utility customers under the auspices of the California Public Utilities Commission. Incentives are offered on a first-come, first-served basis and are effective until the funding is expended or the program is discontinued. Terms and conditions apply. See program rules for details. Programs may be modified or terminated without prior notice. ©2015. Trademarks are property of their respective owners. All rights reserved.</p>
              </RCol>
            </RRow>
          </div>
        </div>
      </div>
    )
  }

}

const styles = {
  fontSize: 11,
  marginTop: 20
}

