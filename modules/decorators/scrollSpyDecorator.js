import _ from 'lodash'
import {UISIZE} from 'app/lib/global-styles'

function shouldBeSpying() {
  return (window.scrollY > UISIZE.scrollSpyOffset)
}

let lastScrollY = window.scrollY, passedThreshold = true;
const notScrollingUp = _.throttle(function() {
  if ((lastScrollY + 50) < window.scrollY) {
    passedThreshold = true
  } else if ((lastScrollY - window.scrollY) > 100) {
    passedThreshold = false
  }
  lastScrollY = window.scrollY
  return passedThreshold
}, 100)

function scrollListener() {
  const shouldSpy = shouldBeSpying() && notScrollingUp()
  if (shouldSpy !== this.state.shouldSpy) {
    this.setState({isSpying: shouldSpy})
  }
}

export default function scrollSpyDecorator(component) {
  const willMount = component.prototype.componentWillMount
  const didMount = component.prototype.componentDidMount
  const willUnmount = component.prototype.componentWillUnmount

  component.prototype.componentWillMount = function scrllSpyComponentWillMount() {
    if (willMount) willMount.apply(this, arguments)
    if (!this.state || !this.state.hasOwnProperty('isSpying')) {
      this.state = {...this.state, isSpying: shouldBeSpying()}
    }
  }
  component.prototype.componentDidMount = function scrollSpyComponentDidMount() {
    if (didMount) didMount.apply(this, arguments)
    this.__scroll = scrollListener.bind(this)
    window.addEventListener('scroll', this.__scroll)
  }
  component.prototype.componentWillUnmount = function scrollSpyComponentWillUnmount() {
    if (willUnmount) willUnmount.apply(this, arguments)
    window.removeEventListener('scroll', this.__scroll)
    this.__scroll = undefined
  }

}
