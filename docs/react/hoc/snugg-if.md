# Snugg.If

Snugg.If is a simple conditional wrapper. It takes one or two children, each functions. The second function if provided will be used if the


## Type Definition:


## Example: `If` statement only

```js
<Snugg.If val={hasJobFinancingProducts}>
  {() => <h2>Job Products</h2>}
</Snugg.If>
```


## Example: `Else` as second argument:
This example shows a blank state component if there are no financing products.
If there are products, the second function acts as the `else` statement

```js
<Snugg.If val={not(hasAnyFinancingProducts)}>
  {() => (  // if
    <FinancingBlankState />
  )}
  {() => (  // else
    <span>
      <Snugg.If val={hasJobFinancingProducts}>
        {() => <h2>Job Products</h2>}
      </Snugg.If>
      <Snugg.Each selector={jobFinancingProducts}>
        {(product, index) => <FinancingProduct product={product} index={index} isEditable={true}/>}
      </Snugg.Each>
    </span>
  )}
</Snugg.If>
```
