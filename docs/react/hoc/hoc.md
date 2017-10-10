# Snugg "Higher Order Components"

The Snugg Higher Order Components (HOC) provide an expressive API for rendering bits of data across the app. There's just so much data, piecing everything together into smaller and smaller components, or adding up all of the bits and pieces needed to render a view outside the constructor in a `@connect` decorator becomes unwieldy. Instead, we use a few components, `Snugg.Val`, `Snugg.Each`, `Snugg.If`, to hide the logic of doing all of this selecting efficiently, in the same way we have `Snugg.Input`, `Snugg.Select`, etc.

* [Snugg.Val](/snugg-val.md)
* [Snugg.If](/snugg-if.md)
* [Snugg.Each](/snugg-each.md)

## String Lookups

One common pattern seen below is the ability to lookup values using the `val=string`
syntax. This is actually the preferred pattern of looking up values in the app, as these
selectors are easily cached. The string lookups are done in the Snugg higher order components such as
`<Snugg.Val />` and `<Snugg.Input />`. See below for documentation.

There are several forms of looking up a value...

1. Looking up the current object, e.g `val="job"` - returns the "current" job object
2. Looking up a property on a current object, e.g. `val="job:first_name"`.
3. A property on an object, by ID - ``val={`job:first_name:${jobId}`}``.
4. A full object, by ID - ``val={`job:*:${jobId}`}``

In the case above with `val="job:first_name"`, it's actually shorthand for `val="job:first_name:${currentJobid}"`. This can only be used in components that have a current job id. For components outside of a single job, such as the jobs list screen or settings, use `job:first_name:${jobId}`

## String Lookup Names:
- job
- user
- account
- program
- company
- reports
- totals
- health
- loanProducts // TODO
- outputs
- outputsCollection

## Selectors

For more complex lookups than just a field, pass a selector function to `val` in the higher order components. All selectors are found in `dataSelectors.js`.

```js
<Snugg.Val val={formattedMonthlyEnergySavings}>
  {(savings) => <TwoCellRow label="Avg Monthly Energy Savings: " value={savings} />}
</Snugg.Val>
```

Read more at [Selectors](../selectors/selectors.md)
