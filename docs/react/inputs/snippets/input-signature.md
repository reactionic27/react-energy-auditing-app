```js
static propTypes = {
  // Field & improved are only used on Job fields
  field: PropTypes.string,
  improved: PropTypes.bool,

  val: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  options: PropTypes.array,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  suffix: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  popover: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  validate: PropTypes.string
}
```
