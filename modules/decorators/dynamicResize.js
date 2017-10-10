import pure from 'pure-render-decorator'

export default function dynamicResize(component) {
  const didMount = component.prototype.componentDidMount
  const willUnmount = component.prototype.componentWillUnmount
  const shouldComponentUpdate = component.prototype.shouldComponentUpdate

  component.prototype.componentDidMount = function resizeComponentDidMount() {
    if (didMount) didMount.apply(this, arguments)
    try  {
      this.__resizeUpdate = () => this.forceUpdate()
      window.addEventListener('resize', this.__resizeUpdate)
    } catch (e) {}
  }
  component.prototype.componentWillUnmount = function resizeComponentWillUnmount() {
    if (willUnmount) willUnmount.apply(this, arguments)
    try {
      window.removeEventListener('resize', this.__resizeUpdate)
      this.__resizeUpdate = null
    } catch (e) {}
  }

  if (!shouldComponentUpdate) {
    pure(component)
  }
}
