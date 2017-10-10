import React from 'react'
import SnuggGenericField from '../snugg/SnuggGenericField'
import SnuggInlineEditable from '../snugg/SnuggInlineEditable'
import SnuggEditable from '../snugg/SnuggEditable'
import { fieldByName } from '../data/definition-helpers'
import * as inputMasks from '../snugg/inputMasks'

const Fields = {
  Editable(props) {
    return <SnuggEditable {...props} />
  },
  InlineEditable(props) {
    return <SnuggInlineEditable {...props} />
  },
  Text(props) {
    return <SnuggGenericField {...props} __type="text" autoCorrect="off" />
  },
  Password(props) {
    return <SnuggGenericField {...props} __type="password" autoCorrect="off" noValidate />
  },
  Integer(props) {
    return <SnuggGenericField mask={inputMasks.integerMask} {...props} __type="integer" autoCorrect="off" inputMode="numeric" noValidate />
  },
  PositiveInteger(props) {
    return <SnuggGenericField mask={inputMasks.positiveIntegerMask} {...props} __type="integer" pattern="[0-9]*" inputMode="numeric" autoCorrect="off" noValidate />
  },
  Numeric(props) {
    return (
      <SnuggGenericField
        createMask={inputMasks.createNumericMask}
        {...props} __type="number" inputMode="numeric" noValidate />
      )
  },
  PositiveNumeric(props) {
    return (
      <SnuggGenericField
        createMask={inputMasks.createPositiveNumericMask}
        {...props} __type="number" inputMode="numeric" noValidate />
    )
  },
  // This needs to be tested on iOS & Android. Test for keyboard and leading zeros
  Zip(props) {
    return <SnuggGenericField mask={inputMasks.zipMask} {...props} __type="text" pattern="\d*" inputMode="numeric" autoCorrect="off" noValidate />
  },
  Email(props) {
    return <SnuggGenericField mask={inputMasks.emailMask} {...props} __type="email" autoCapitalize="off" autoCorrect="off" noValidate />
  },
  CreditCard(props) {
    return <SnuggGenericField {...props} __type="text" pattern="\d*" autoCorrect="off" noValidate />
  },
  Telephone(props) {
    return <SnuggGenericField mask={inputMasks.telephoneMask} {...props} __type="tel" noValidate />
  },
  Radio(props) {
    return <SnuggGenericField {...props} __type="radio" />
  },
  Select(props) {
    return <SnuggGenericField {...props} __type="select" />
  },
  MultiSelect(props) {
    return <SnuggGenericField {...props} __type="multi-select" />
  },
  Textarea(props) {
    return <SnuggGenericField {...props} __type="textarea" />
  },
  DateField(props) {
    return <SnuggGenericField {...props} __type="date" />
  },
  DateTimeField(props) {
    return <SnuggGenericField {...props} __type="datetime-local" />
  }
}

Fields.Input = props => {
  if (!props.field) {
    return <Fields.Text {...props} />
  }
  const fieldDefinition = fieldByName(props.field)
  const type = fieldDefinition && fieldDefinition.type || 'Text'
  const Field = Fields[type] || Fields.Text
  return <Field {...props} />
}

export default Fields
