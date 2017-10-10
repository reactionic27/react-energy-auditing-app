import {UISIZE} from 'app/lib/global-styles'
import invariant from 'fbjs/lib/invariant'
import {dispatchLocal} from 'data/actions'

function componentDidMount() {
  this.findActiveSection()
  window.addEventListener('scroll', this.findActiveSection)
}

function componentDidUpdate(prevProps) {
  if (prevProps.activeSection !== this.props.activeSection) {
    this.findActiveSection()
  }
}

function componentWillUnmount() {
  window.removeEventListener('scroll', this.findActiveSection)
  this.props.dispatch(dispatchLocal('setActiveSection', {activeSection: null}))
}

function isElementVisible(element) {
  const section = element.getBoundingClientRect()
  const windowHeight = window.innerHeight - UISIZE.scrollSpyOffset - 50
  if (section.top < 0) {
    return (section.top + section.height) > 75
  } else {
    return section.top < windowHeight
  }
}

function isJobformElementVisible(element) {
  const section = element.getBoundingClientRect()
  const windowHeight = window.innerHeight - UISIZE.scrollSpyOffset
  if (section.top < 0) {
    return ((section.height + section.top) - UISIZE.scrollSpyOffset - UISIZE.sectionHeaderHeight) >= -40
  } else {
    return section.top < windowHeight
  }
}

function findActiveReportSection() {
  const {visibleSections} = this.props
  let activeSection = null
  visibleSections.forEach((section) => {
    if (activeSection) return
    const scrollKey = section.outputColumn
    const el = document.getElementById(`report-scroll-${scrollKey}`)
    if (el && isElementVisible(el)) {
      activeSection = section.label
    }
  })
  this.props.dispatch(dispatchLocal('setActiveSection', {activeSection}))
}

function findActiveJobSection() {
  const {visibleSections} = this.props
  let activeSection = null
  visibleSections.forEach((section) => {
    if (activeSection) return
    const scrollKey = section.componentName
    const el = document.getElementById(`jobform-scroll-${scrollKey}`)
    if (el && isJobformElementVisible(el)) {
      activeSection = section.label
    }
  })
  this.props.dispatch(dispatchLocal('setActiveSection', {activeSection}))
}

function componentWillMount() {
  this.state = this.state || {
    activeSection: null,
    transitioningHeight: null
  }
  this.findActiveSection = this.findActiveSection.bind(this)
}

export default function headerAndSecondaryNavDecorator(type = 'report' | 'jobform') {
  return function(component) {
    ['componentWillMount', 'componentDidMount', 'componentDidUpdate', 'componentWillUnmount'].forEach(method => {
      invariant(
        !component.prototype[method],
        'Only the headerAndSecondaryNavDecorator can defined %s',
        method
      )
    })
    component.prototype.componentWillMount = componentWillMount
    component.prototype.componentDidMount = componentDidMount
    component.prototype.componentDidUpdate = componentDidUpdate
    component.prototype.componentWillUnmount = componentWillUnmount
    component.prototype.findActiveSection = type === 'report' ? findActiveReportSection : findActiveJobSection
  }
}
