import { connect } from 'react-redux'
import { createSelector } from 'simple-selectors'


// @connectSelector is shorthand for @connect(createSelector())
export function connectSelector(mapStateSelector, mapDispatchToProps, mergeProps, options) {
  return function connectWrapper(WrappedComponent) {
    return connect(
      () => createSelector(mapStateSelector),
      typeof mapDispatchToProps === 'function' ? () => mapDispatchToProps : mapDispatchToProps,
      mergeProps,
      options
    )(WrappedComponent)
  }
}

export function pureConnect(mapState, mapDispatch) {
  return function connectWrapper(WrappedComponent) {
    return connect(
      mapState,
      mapDispatch,
      (stateProps, dispatchProps) => ({
        ...stateProps,
        ...dispatchProps
      })
    )(WrappedComponent)
  }
}

export {connect, createSelector}
