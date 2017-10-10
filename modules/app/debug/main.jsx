import _ from 'lodash'
import React from 'react'
import {Panel} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import optimiserFormatter from 'data/optimiser/optimiserFormatter'
import Inspector from 'react-json-inspector'

require('react-json-inspector/json-inspector.css')
require('../../../src/css/json-inspector-overrides.css')
require('../../../src/css/jsdifflib.css');

@connect(optimiserFormatter)
export default class OMMain extends React.Component {

  state = {
    openRaw: false,
    openValues: false,
    openReturning: false,
    openSections: false,
    showSections: {}
  }

  showSection(name) {
    this.setState({
      showSections: {
        ...this.state.showSections,
        [name]: !Boolean(this.state.showSections[name])
      }
    })
  }

  toggle(name) {
    this.setState({
      ...this.state,
      [name]: !Boolean(this.state[name])
    })
  }

  render() {
    const {
      props: { errors }
    } = this
    const displayError = errors.length > 0 ? 'block' : 'none'
    return (
      <div className="row">
        <div className="col-sm-10">
          <h5>Optimiser Data</h5>
          <div>
            <Panel style={{display: displayError}} header={<h3>Errors</h3>} bsStyle="danger">
              <Dump data={errors} />
            </Panel>
            <Section
              parent={this}
              stateKey="sections:values"
              title="Optimiser Values By Section" />
            <Section
              parent={this}
              stateKey="sections:returning"
              title="Optimiser Varlist By Section" />
            <Section
              parent={this}
              stateKey="values"
              title="Full Next Optimiser Payload" />
            <Section
              parent={this}
              stateKey="returning"
              title="Optimiser Varlist" />
            <Section
              parent={this}
              stateKey="returningInto"
              title="Optimiser Returning: Into (DB Tables when Roundtrip completes)" />
            <Section
              parent={this}
              stateKey="payload"
              title="Job Data Payload (source of generating OM)" />
          </div>
        </div>
      </div>
    )
  }

}

function getData(props, key) {
  if (key.indexOf('sections') === 0) {
    const [, item] = key.split(':')
    return _.transform(props.sections, (acc, val, key) => {
      acc[key] = Array.isArray(val) ? val.map(v => sortAbc(v[item])) : sortAbc(val[item])
    })
  }
  return sortAbc(props[key])
}

function sortAbc(obj) {
  if (!obj) return {}
  if (Array.isArray(obj)) return obj.sort()
  let nextObj = {}
  Object.keys(obj).sort().forEach(k => {
    nextObj[k] = obj[k]
  })
  return nextObj
}

class Section extends React.Component {

  state = {
    exiting: false
  };

  isExiting = () => {
    return this.state.exiting
  };

  render() {
    const {
      props: {parent, stateKey, title},
    } = this
    const expanded = parent.state[stateKey]
    return (
      <Panel
        collapsible
        expanded={expanded}
        onExit={() => this.setState({exiting: true})}
        onExiting={() => this.setState({exiting: false})}
        header={<h3 onClick={() => parent.toggle(stateKey)}>{title}</h3>}
        bsStyle="info">
        {(this.isExiting() || expanded)
          ? <Dump data={getData(parent.props, stateKey)} />
          : null}
      </Panel>
    )
  }

}

function Dump({data}) {
  return <Inspector data={data} filterOptions={{ignoreCase: true}} isExpanded={() => true} />
}
