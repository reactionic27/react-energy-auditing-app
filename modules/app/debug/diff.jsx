import 'whatwg-fetch'
import _ from 'lodash'
import React from 'react'
import jsdifflib from 'jsdifflib'
import {connectSelector} from 'snugg-redux'
import optimiserFormatter from 'data/optimiser/optimiserFormatter'

require('../../../src/css/jsdifflib.css');

@connectSelector({
  optimiser: optimiserFormatter
})
export default class DebugDiff extends React.Component {

  static propTypes = {
    oldJobId: React.PropTypes.number,
    jobId: React.PropTypes.number.isRequired
  };

  constructor(props) {
    super(...arguments)
    this.state = {
      oldJobId: props.jobId,
      domain: `https://app.snuggpro.com`,
      new: {},
      old: {}
    }
  }

  componentWillMount() {
    this.runFetch()
  }

  runFetch() {
    if (this.state.domain.slice(-3) === 'com' || this.state.domain.slice(-5)[0] === ':') {
      fetch(this.state.domain + '/api/optimiser/' + this.state.oldJobId, {
        headers: {
          'x-snugg-om': 'snuggtestingoptimisersecret',
        },
        credentials: 'same-origin',
      })
      .then(resp => resp.json())
      .then(resp => {
        delete resp.returning
        this.setState({old: resp, new: {
          output: this.props.optimiser.values,
          varlist: this.props.optimiser.returning,
          errors: this.props.optimiser.errors
        }})
      })
      .catch(err => {
        this.setState({
          old: {
            errors: err.stack
          },
          new: {
            output: this.props.optimiser.values,
            varlist: this.props.optimiser.returning,
            errors: this.props.optimiser.errors
          }
        })
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.oldJobId !== this.state.oldJobId ||
      prevState.domain !== this.state.domain
    ) {
      this.runFetch()
    }
  }

  renderJSONDiff(diff) {
    if (this.state.diffType === 'noDiff') {
      return <pre className="prettyprint">{this.state.snuggJSON}</pre>
    } else {
      return <div dangerouslySetInnerHTML={{__html: (diff.outerHTML || '')}} />
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-10">
          <h5>Compare vs Job:</h5>
          <label style={{width: 100}}>
          Job Id:
          </label>
          <input style={{width: 75}} type="text" value={this.state.oldJobId} onChange={e => {
            this.setState({oldJobId: e.target.value})
          }} />
          <br />
          <label style={{width: 100}}>
          Domain:
          </label>
          <input style={{width: 400}} type="text" value={this.state.domain} onChange={e => {
            this.setState({domain: e.target.value})
          }} />
        </div>
        <div className="col-sm-10">
          <h5>JSON Representation of the Diff</h5>
          {this.renderJSONDiff(getDiff(this.state.old, this.state.new))}
        </div>
      </div>
    )
  }

}

function getDiff(oldData, newData, diffType, isDiffOnly) {
  let opts = {
    baseText: prepJson(oldData),
    newText: prepJson(newData),
    baseTextName: "Old Data",
    newTextName: "New Data",
    contextSize: isDiffOnly ? 8 : false,
    inline: diffType === 'inline'
  }
  return jsdifflib.buildView(opts)
}

function sortObject(obj) {
  return Object.keys(obj).sort().reduce((acc, k) => {
    if (_.isPlainObject(obj[k])) {
      acc[k] = sortObject(obj[k])
    } else if (_.isArray(obj[k])) {
      acc[k] = obj[k].sort()
    } else if (_.isNumber(obj[k])) {
      acc[k] = '' + obj[k]
    } else {
      acc[k] = obj[k]
    }
    return acc
  }, {})
}

function prepJson(obj) {
  return JSON.stringify(sortObject(obj), null, 2)
}
