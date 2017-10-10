## Selectors

Selectors are used to access data related to state. They are found in in `dataSelectors.js`. They are used in a few ways:

1. String lookups: These are using a simple, reusable selector behind the scenes:

  ```
  <Snugg.Val val="job:first_name" tag="h3" />
  ```

2. For more complex lookups than just a field, pass a function to `val` in the higher order components.

  ```js
  <Snugg.Val val={formattedMonthlyEnergySavings}>
    {(savings) => <TwoCellRow label="Avg Monthly Energy Savings: " value={savings} />}
  </Snugg.Val>
  ```

3. Within the `@connectSelector` at the top of the React class. The value is available in the props of the component. This is useful for including values in classes. Tim may have more words on this....

  ```js
  @connectSelector({count: selectedFinancingOfferCount})
  export default class FinancingProduct extends React.Component {
    render({productId, index, count}) {
      return (
        <Snugg.Val val={formattedSelectedOfferById(productId)}>
          {(offer) => (
            <div className={getColumnClass(count)}>
            ...
  ```

4. For updating the database with a value where there is no HOC, we can use  `stringUpdater`. Notice the need to use `@connect()` decorator:

  ```js
  import {connect} from 'snugg-redux'
  @connect()  // needed for this.props.dispatch to work
  class ThemeButton extends React.Component {

    handleClick(themeIndex, jobId, e) {
      e.preventDefault()
      this.props.dispatch(stringUpdater('reports:theme', jobId)(themeIndex))
    }

    render({theme, index, jobId}) {
      return (
        <button className="btn btn-brand-5"
                onClick={this.handleClick.bind(this, index, jobId)}>
          <div className={`report-theme theme-swatch-${index} pull-left`} />
          <span style={themeStyles}>
            {theme}
          </span>
        </button>
      )
    }
  }
  ```

#### Importing Selectors
```js
import * as s from 'data/selectors'
@connectSelector({metrics: s.formattedMetrics})
```
1. The convention we are using is namespacing all selectors under s instead of importing them individually.
2. All selectors in all files (dataSelectors.js, valueSelectors.js, ...) can be accessed by using `data/selectors`

#### Creating Selectors
We're using Tim's fork of reselect for cacheing selectors: https://github.com/tgriesser/simple-selectors

When creating selectors, be careful about importing selectors from different file. For exmaple, Calling `baseDisplay` or `improvedDisplay` from dataSelectors results in circular reference
> 'Selector creators expect all input-selectors to be functions...'



