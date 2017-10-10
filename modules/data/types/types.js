import {Map as IMap, Set as ISet} from 'immutable'
import {PropTypes} from 'react'

export const IMapType = PropTypes.instanceOf(IMap)

export const ISetType = PropTypes.instanceOf(ISet)

const stringOrNumber = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

export const segmentsType = PropTypes.shape({
  one: stringOrNumber,
  two: stringOrNumber,
  three: stringOrNumber,
  four: stringOrNumber,
  five: stringOrNumber
}).isRequired

export const paramsType = PropTypes.shape({
  jobId: PropTypes.number,
  companyId: PropTypes.number,
  financingUuid: PropTypes.string
})
