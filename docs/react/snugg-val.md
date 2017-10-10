# Snugg.Val

`Snugg.Val` is the most common HOC logic component, it uses the `val` prop to fetch a value, and operates in one of two ways... with or without children.

### Signature

```js
static propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  val: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string
  ]).isRequired,
  fmt: PropTypes.string,
  editable: PropTypes.bool
}
static contextTypes = {
  jobId: PropTypes.number
}
```

### Examples

```jsx
<Snugg.Val val={selector} />
```

### Snugg.Val

#### With Children:

```jsx
<Snugg.Val val="job:first_name">
  {(firstName) => (
    <div>
      <h3>$SomeName</h3>
    </div>
  )}
</Snugg.Val>
```

#### Without Children:

```jsx
<Snugg.Val val="job:first_name" tag="h3" />

// outputs:

<h3>$SomeName</h3>
```

#### Selecting the value
If you are looking up a simple value, use the `stringSelector` approach as shown above:
```
<Snugg.Val val="job:first_name" tag="h3" />
```

If what you need is more complicated, you can build a selector function and pass
that into `val`. If a function is passed into `val` it will assume it's a selector.
```
<Snugg.Val val={recStatusByRecId(recId)} />  // selector that takes an arg and returns a function
<Snugg.Val val={recTotalCost} />             // selector that takes no args and returns a value
```


The other props recognized by `Snugg.Val` are:

##### fmt

The `fmt` property gives us an API to format a value once returned, using the `Value` API.

examples:
```jsx
<Snugg.Val val="totals:saved_mbtu_percent" fmt="d!0" />   // Round to zero decimals
```

Use multiple formats using `~`. If an attributes needs a value, set it with a `!`
```js
fmt="d!0~prefix!$"
fmt="d!1"
fmt="moment!MMM D, YYYY~br"
fmt="email"
fmt="specialCeil~d!0~prefix!$"
fmt="d!0~prefix!$ ~suffix! per year"
```

##### editable

TBD
