import _ from 'lodash'
import stripNullish from 'util/stripNullish'

export default function localFormDecorator(WrappedComponent) {

  WrappedComponent.prototype.formIsValid = function formIsValid() {
    return _.every(_.values(this.state.valid))
  };

  WrappedComponent.prototype.stateField = function stateField(name: string, button = false) {
    this.state = this.state || {
      valid: {},
      form: {}
    }
    this.__stateFields = this.__stateFields || {}
    this.__stateFields[name] = this.__stateFields[name] || {
      onChange: (val) => {
        this.setState((previousState, currentProps) => ({
          form: {
            ...previousState.form,
            [name]: val
          }
        }))
      },
      onErrorStateChange: (isValid) => {
        this.setState((previousState, currentProps) => ({
          valid: {
            ...previousState.valid,
            [name]: isValid
          }
        }))
      }
    }

    if (button && !this.__stateFields[name].onClick) {
      this.__stateFields[name].onClick = (e) => {
        e.preventDefault()
        this.onChange(e.currentTarget.value)
      }
    }

    return {
      value: stripNullish(this.state.form[name]),
      displayError: this.state.hasAttemptedSubmit,
      ...this.__stateFields[name]
    }
  }
}
