# Snugg.Input

A Snugg.Input is a wrapper component handling fetching, updating, and validating an individual field. `Snugg.Input` may be used in both a standard submittable form, and a live-updating field.

* Use
  * [Live Updating](#live-updating)
* PropTypes
  *

### Live Updating Form

### Submitting Form

### Signature

{% include "./snippets/input-signature.md" %}

### Validations

Fields have onChange validations. For fields that are defined in `v4_fields` table, the validations are set with `min`, `max`, `decimals`, `is_required`. See `simpleValidator.js` for how the errors are generated.

For display of the errors, its done via a `<HelpBlock />` component inside `<SnuggGenericField />`. `<Snugg.Input />` wraps `<SnuggGenericField />`.

For fields that aren't defined in the `v4_fields` table, such as rec costs and utility bill values, you can set the `validate` attribute manually. For example:

```js
<Snugg.Input
  val={`utilities:${this.fieldTwo()}`}
  size={3}
  wrappedWithHelpBlock
  validate='decimals:2|gte:0|lte:99999999'
  suffix={makeSuffixSelector(this.suffix())} />
```

Examples of the `validate` string are:
```js
validate='decimals:2|gte:0|lte:5000'
validate='integer|gte:50|lte:90'
validate='maxLength:30'
validate='decimals:2|gte:0|lte:10000'
validate={`minDate:${minUtilDate}|maxDate:${maxUtilDate}`}
```

Notice the `wrappedWithHelpBlock` attribute. This is used in `<SnuggGenericField />` to allow the help block to be shown. There is an similar attribute in the `<Snugg.Rec.Row />` base & improved detailed section called `bareWithHelpBlock`:

```js
<Target field={c.props.field} bareWithHelpBlock improved />
```



### Input restrictions
Believe it or not, telling people they have incorrect data isn't enough to prevent it. We had so many support issues even after we put in the field validations that we added input restrictions on top of it. It helped a ton reducing support issues.

Input restrictions is enforced on the `onChange()` handler of `SnuggGenericField.js`. When a field is mounted, we figure out (and memoize) if the field is an integer only or if it has decimals. If so, we only allow those to be types. See `restrictInputs.js`
