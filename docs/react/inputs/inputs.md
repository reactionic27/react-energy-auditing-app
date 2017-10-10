## Snugg Inputs / Form Data

There are two main types of forms in the app, auto-saving and temporary / standard submit. The same `Snugg.Input`, `Snugg.Select`, `Snugg.Radio` are used for these fields, the difference is how they are placed & rendered.

### Auto-Saving Fields

Inside the auto-saving fields category there are two sub-categories, "Job Fields" and "Standard" fields

Auto-Saving fields use the `Snugg` input elements:
```
<Snugg.Input field="Year Built" />
<Snugg.Radio field="Includes Basement" label="Area Includes Basement" />
<Snugg.Email val='job:email' label="Email" size={6}/>
```

#### Auto Saving Standard Fields

Auto-saving standard fields take a `val` property, which represent a string selector detailed above. These fields automatically determine which field to save and dispatch a $TODO_NAME redux action which triggers the saving.

#### Auto Saving Job Fields

An auto-saving job field is like a standard field,
except in its use of the `field` prop in place of the `val` prop. The field prop uses the `label` property from `v4_fields` to lookup the definition of the field and convert it into a properly formed `val=...` selector for a standard field.

In addition it automatically generates the tooltip and validation necessary for the field.

#### Standard Submit Fields

Standard fields are defined as fields living in a form which must be submitted all at once, e.g. `create-job` or `change-password`. These are traditional React controlled components that store their values in local state and submitted all at once.

In order to get the validations to work with these, we disabled validations until the first submit, then the `stateField` function not only updates local state on change, but checks validation through simpleValidator callback onChange.  

Standard submit fields use the `Field` input elements:
```
<Fields.Input label='First Name' {...stateField(this, 'first_name')} />
<Fields.Email label='Email' {...stateField(this, 'email')} />
```

#### Auto Savings and Standard Input Types:
There should be parity in field types between standard and auto-saving fields: `Fields.Input`, `Snugg.Input`, `Fields.Email`, `Snugg.Email`

Field types are defined here:
`Snugg`: modules/snugg/SnuggFields.js
`Field`: modules/fields/index.js

Types like `Email`, `Integer`, `Telephone` are optimized for mobile keyboards. See `mobile-keyboards.md` for more info.
