import React, {PropTypes} from 'react'
import _ from 'lodash'

export default function withContext(context, Component) {

  class WithContext extends React.Component {
    getChildContext() {
      return context
    }
    render() {
      return <Component />
    }
  }

  WithContext.childContextTypes = _.mapValues(context, () => PropTypes.any)

  return <WithContext />
}
