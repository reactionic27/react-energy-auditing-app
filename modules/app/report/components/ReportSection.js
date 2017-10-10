import _ from 'lodash'
import co from 'co'
import React, {PropTypes} from 'react'
import invariant from 'fbjs/lib/invariant'
import {RRow} from 'ui'
import shallowEquals from 'shallow-equals'
import {connect} from 'snugg-redux'
import UUID from 'node-uuid'
import {dispatchLocal} from 'data/actions'

@connect(null, {dispatchLocal})
export default class ReportSection extends React.Component {

  constructor(props, {printing}) {
    super(...arguments)
    if (printing) {
      this.state = {
        ready: false,
        sectionKey: UUID.v4()
      };
    }
  }

  static contextTypes = {
    store: PropTypes.object,
    printing: PropTypes.bool,
    jobId: PropTypes.number,
    setPrintReadySection: PropTypes.func
  };

  static propTypes = {
    name: PropTypes.string.isRequired,
    paginating: PropTypes.shape({
      getAllData: PropTypes.func.isRequired,
      paginate: PropTypes.func.isRequired
    })
  };

  getQueued() {
    return this.props.paginating.getAllData(
      this.context.store.getState(), {...this.context, ...this.props}
    )
  }

  componentDidMount() {
    if (this.context.printing) {
      this.context.setPrintReadySection(this.state.sectionKey, !this.props.paginating)
      if (this.props.paginating) {
        this.wrappedPaginate = co.wrap(this.props.paginating.paginate)
        this.queued = this.getQueued()
        this.unsubscribe = this.context.store.subscribe(_.debounce(() => {
          const nextQueued = this.getQueued()
          if (!shallowEquals(this.queued, nextQueued)) {
            this.queued = nextQueued
            this.setState({ready: false}) //eslint-disable-line
          }
        }), 5000) // only allow this to run once every 5 seconds
        this.maybeRunPagination()
      }
    }
  }

  maybeRunPagination() {
    const {props: {paginating}, state, context: {printing, store}} = this
    if (printing && paginating && !state.ready) {
      this.wrappedPaginate(this.tempNode, _.clone(this.queued), store)
        .then(pages => {
          this.setState({pages, ready: true})
          this.context.setPrintReadySection(this.state.sectionKey, true)
        })
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.tempNode = null
      this.wrappedPaginate = null
    }
  }

  renderPrint(index) {
    const {
      props: { paginating, children, name },
      context: { printing }
    } = this
    let reportBody
    if (printing && paginating) {
      const bodyChildren = children[1].props.children
      invariant(
        Array.isArray(bodyChildren) && bodyChildren.length === 2,
        'Can only paginate on a component with a sidebar, only saw one element.'
      );
      reportBody = React.cloneElement(children[1], {children: [
        bodyChildren[0],
        this.state.ready
          ? <div dangerouslySetInnerHTML={{__html: this.state.pages[index]}} />
          : <div ref={node => { this.tempNode = node }} />
      ]})
    }
    const reportPageId = `report-page-${name}`
    return (
      <div className={`report-page ${reportPageId}`} key={index}>
        <div className="r-container">
          <RRow>
            {React.cloneElement(children[0], {name})}
          </RRow>
          {paginating ? reportBody : children[1]}
          <RRow>
            {React.cloneElement(children[2], {sectionName: name})}
          </RRow>
        </div>
      </div>
    )
  }

  render() {
    const {
      context: { printing },
      props: { paginating }
    } = this;
    if (printing) {
      if (paginating && this.state.pages) {
        return (
          <div>
            {this.state.pages.map((page, i) => this.renderPrint(i))}
          </div>
        )
      }
      return this.renderPrint()
    }
    const {name, children} = this.props
    const reportPageId = `report-page-${name}`
    return (
      <div>
        {React.cloneElement(children[0], {name})}
        <div className={`report-page-active report-page ${reportPageId}`} id={reportPageId}>
          <div className="r-container">
            {children[1]}
          </div>
        </div>
      </div>
    )
  }
}
