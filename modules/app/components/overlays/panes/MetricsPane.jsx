import React from 'react'
import JobMetrics from 'app/components/jobmetrics'
import {BaseSlidePane} from 'app/components/overlays'
import Radium from 'radium'


@Radium
export default class MetricsPane extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number
  };

  render() {
    const {
      context: {jobId}
    } = this
    return (
      <BaseSlidePane {...this.props} className="pane-metrics" title="Estimated Total Project Metrics">
        <div style={styles.container}>
          <p>The following metrics are for the whole house in a pre- and post-retrofit state</p>
          <ol>
            <li><em>Additional Notes</em> and <em>Declined</em> measures not included</li>
            <li>Energy usage is <em>weather normalized</em> based on zip code and will not likely match utility bill inputs<sup>†</sup></li>
            <li>Results are for the most recently modeled scenario. Model again if you have made any changes to the modeled data.</li>
          </ol>
          <JobMetrics jobId={jobId} />
          <p>
            † The 'Baseline' savings numbers will likely not be the same as the
            actual energy consumption of the home. These numbers are weather normalized
            and then projected based on the Typical Meteorological Year for the past 30
            years (TMY30). In other words, this is the energy consumption of the home for
            a typical year, not the year that the utility bills were from.
          </p>
        </div>
      </BaseSlidePane>

    )
  }
}

const styles = {
  container: {
    padding: '0 20px',
    fontSize: '0.9em'
  }
}
