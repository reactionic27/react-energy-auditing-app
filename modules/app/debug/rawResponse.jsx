import 'whatwg-fetch'
import _ from 'lodash'
import React from 'react'
import {get} from '../../util/network'
import {connectSelector} from 'snugg-redux'
import optimiserFormatter from 'data/optimiser/optimiserFormatter'

require('../../../src/css/jsdifflib.css');

@connectSelector({
  optimiser: optimiserFormatter
})
export default class DebugDiff extends React.Component {

  static propTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  state = {
    response: {},
  };

  componentWillMount() {
    get('/optimiser/job/raw-response/' + this.props.jobId)
      .then(resp => {
        const data = _.first(_.get(resp, 'rawResponse'))
        if (!_.isEmpty(data)) {
          const everything = JSON.parse(data.parsed_response)
          delete everything.A1HPXML
          this.setState({response: everything})
        }
      })
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-10">
          <h5>JSON Representation of latest response from OM</h5>
          <pre className="prettyprint">{JSON.stringify(this.state.response, null, 2)}</pre>
        </div>
      </div>
    )
  }

}
