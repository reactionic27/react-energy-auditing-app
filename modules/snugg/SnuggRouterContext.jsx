import React, {PropTypes} from 'react'
import _ from 'lodash'
import {RouterContext, browserHistory} from 'react-router'
import snuggStripPath from 'util/snuggStripPath'
import ErrorPage from '../app/lib/error-page'
import {connect} from 'react-redux'
import {errorAction, updateSnugg} from '../data/actions/actions'
import {navigate} from '../util/network'
import transitReader from '../util/transitReader'
import bulkUpdate from '../util/bulkUpdate'

let routerErrorObj

const MODAL_REGEX = new RegExp(`/(?:cazsystem|hvac|quickrefine)/`)

// The SnuggRouterContext handles all transition & any online/offline
// transitions. It provides a "transitioning" prop to the RouterContext component,
// as well as a `socketState` prop which determines whether we're offline or online.
@connect(null, {errorAction, updateSnugg})
export default class SnuggRouterContext extends React.Component {

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  static childContextTypes = {
    toggleLeftPushNav: PropTypes.func,
    hideLeftPushNav: PropTypes.func,
    toggleSecondaryNav: PropTypes.func,
    hideSecondaryNav: PropTypes.func
  };

  constructor(props, {store}) {
    super(...arguments)
    this.createElement = this.createElement.bind(this)
    this.store = store

    this.state = {
      currentError: null,
      currentProps: props,
      pendingProps: null,
      transition: null,
      transitioning: false,
      showLeftPushNav: false,
      showSecondaryNav: false
    }

    this.visitedRoutes = new Map([
      [snuggStripPath(props.location.pathname), new Date().valueOf()]
    ])

    this.params = parseParams(props.params)
    this.segments = makeSegments(props.location.pathname)
    this.updateLastCompanyId()

    this.childContext = {
      toggleLeftPushNav: () => this.setState({showLeftPushNav: !this.state.showLeftPushNav}),
      hideLeftPushNav: () => this.setState({showLeftPushNav: false}),
      toggleSecondaryNav: () => this.setState({showSecondaryNav: !this.state.showSecondaryNav}),
      hideSecondaryNav: () => this.setState({showSecondaryNav: false}),
    }

    // This is where we're going to store the scrollY positions,
    // we can store them when we navigate.
    this.routeScrollInfo = {}
  }

  updateLastCompanyId() {
    const {jobId, companyId} = this.params
    const storeState = this.store.getState()
    if (!this.lastCompanyId) {
      this.lastCompanyId = getLastCompanyId(storeState)
    }
    let nextCompanyId = this.lastCompanyId
    if (companyId) {
      nextCompanyId = companyId
    }
    else if (jobId) {
      // This might not be set for template jobs
      nextCompanyId = storeState.fn.jobById(jobId).get('company_id')
    }
    if (nextCompanyId && nextCompanyId !== this.lastCompanyId) {
      saveLastCompanyId(storeState, nextCompanyId)
      this.lastCompanyId = nextCompanyId
    }
  }

  getChildContext() {
    return this.childContext
  }

  async componentWillReceiveProps(nextProps) {
    const {pathname} = nextProps.location
    const strippedPath = snuggStripPath(pathname)
    const lastStrippedPath = snuggStripPath(this.props.location.pathname)
    const hasVisited = this.visitedRoutes.get(strippedPath)

    if (pathname.indexOf('/job/') === 0) {
      this.routeScrollInfo[this.props.location.pathname] = window.pageYOffset
    }
    const __navigating__ = this.navigating = navigate(pathname, this.props.location.pathname)

    if (hasVisited) {
      this.setState({
        currentError: null,
        currentProps: nextProps,
        pendingProps: null,
        transitioning: false
      })
    } else {
      this.setState({
        pendingProps: nextProps,
        transitioning: true
      })
    }

    // If we've already visited this page within the last 60 seconds,
    // just rely on the cached version of it.
    if (
      lastStrippedPath === strippedPath &&
      hasVisited &&
      new Date().valueOf() - hasVisited < 60000
    ) {
      return
    }

    try {
      const response = await __navigating__
      this.visitedRoutes.set(
        strippedPath,
        new Date().valueOf()
      )
      this.props.updateSnugg(snugg => bulkUpdate(snugg, transitReader(response.data)))
      if (__navigating__ === this.navigating) {
        this.setState({transitioning: false, currentProps: nextProps, currentError: null, pendingProps: null})
      }
    } catch (e) {
      if (e.online === false) {
        if (!hasVisited) {
          browserHistory.goBack()
          const errPayload = {
            title: 'Error: Offline',
            message: `Cannot view this URL (${pathname}) without an internet connection`,
            timeout: 3000,
            onRemove() {
              routerErrorObj = null
            }
          }
          if (routerErrorObj) {
            routerErrorObj.update(errPayload)
          } else {
            this.props.errorAction(errPayload)
          }
        }
      } else {
        this.setState({currentError: e, pendingProps: null})
      }
    } finally {
      if (__navigating__ === this.navigating) {
        this.navigating = null
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.currentProps !== this.state.currentProps) {
      this.params = parseParams(nextProps.params)
      this.segments = makeSegments(nextProps.location.pathname)
      this.updateLastCompanyId()
    }
  }

  componentDidUpdate(prevProps) {
    // Only perform this scroll when the props change,
    // otherwise the navbar state will trigger scrolling
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (this.segments.three === 'quickrefine') {
        return
      }
      const {props: {location: { pathname }}} = this
      if (pathname.indexOf('/job/') === 0) {
        if (!MODAL_REGEX.test(pathname)) {
          if (!this.routeScrollInfo.hasOwnProperty(pathname)) {
            this.routeScrollInfo[pathname] = 0
          }
          window.scrollTo(0, this.routeScrollInfo[pathname])
        }
      } else {
        window.scrollTo(0, 0)
      }
    }
  }

  createElement(component, props) {
    const {state: {showSecondaryNav, showLeftPushNav, transitioning, currentError}} = this
    const computedProps = {
      params: this.params,
      segments: this.segments,
      transitioning
    };
    if (currentError) {
      return React.createElement(ErrorPage, {
        ...props,
        ...computedProps,
        ...computedProps.params,
        currentError,
        lastCompanyId: this.lastCompanyId,
        showLeftPushNav,
        showSecondaryNav
      })
    }
    return React.createElement(component, {
      ...props,
      ...computedProps,
      ...computedProps.params,
      lastCompanyId: this.lastCompanyId,
      showLeftPushNav,
      showSecondaryNav
    })
  }

  render() {
    return <RouterContext {...this.state.currentProps} createElement={this.createElement} />
  }
}

// Transform numeric parameters into actual numbers
// on props.params
function parseParams(params) {
  return _.transform(params, (acc, val, key) => {
    acc[key] = parseNumber(val)
  })
}

// Create an object with the segements of the location.
function makeSegments(pathname: string) {
  const [one, two, three, four, five] = pathname
    .split('/')
    .filter(f => f)
    .map(parseNumber)
  return {one, two, three, four, five}
}

function parseNumber(val: ?string) {
  if (val === undefined) return
  const int = parseInt(val, 10)
  return val.indexOf('-') !== -1 || isNaN(int) ? val : int;
}

function getLastCompanyId(storeState) {
  const userId = storeState.localState.get('loggedInUserId')
  const lastCompanyId = localStorage.getItem(`${userId}:lastCompanyId`)
  if (!lastCompanyId) {
    return storeState.snugg.get('companies').first().get('id')
  }
  return parseInt(lastCompanyId, 10)
}

function saveLastCompanyId(storeState, nextCompanyId: number) {
  const userId = storeState.localState.get('loggedInUserId')
  localStorage.setItem(`${userId}:lastCompanyId`, nextCompanyId)
}
