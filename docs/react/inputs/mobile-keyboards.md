## Mobile Keyboards
Mobile keyboards are triggered by a combination of field `type` and attributes such as `pattern` and `inputMode`. It's non-standard and still evolving.

I'm using this as my primary reference: http://baymard.com/labs/touch-keyboard-types

For example, Snugg.Zip looks like this:
```
<input type="text" pattern="\d*" novalidate autocorrect="off" autocomplete="postal-code">
```

It's important to set `noValidate` when there is a `pattern` attribute since we have our own validation.

It's also important to never use the `autoComplete` attribute in our case. It will attempt to auto complete based on previous inputs, which works well for your own personal information but not creating new jobs.



Field types are defined (in duplicate) here:
`Snugg`: modules/snugg/SnuggFields.js
`Field`: modules/fields/index.js

In theory we could construct a field that this doesn't have to be defined twice, but that may be more complicated and not worth it. Our fields are already very complex.

This needs a lot of testing on iOS and Android devices.
