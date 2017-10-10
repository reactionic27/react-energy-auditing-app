# Snugg.Each

Iterates over a collection of elements, automatically setting the proper `key` prop on the component.

`Snugg.Each` takes a `selector` property, which should be a selector function with
the signature:

A common practice is to have a selector return an array of numeric ids of selected objects. These ids are often the id of the row in the db. These arrays of ids are usually looped over with a `<Snugg.Each />` and passed into a child component.

### Signature
```js
static defaultProps = {
  tag: 'div'
};

static propTypes = {
  selector: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.array
  ]).isRequired
};
```
