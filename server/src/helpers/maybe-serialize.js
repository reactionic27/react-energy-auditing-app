import _ from 'lodash'

export default function maybeSerialize(body: Object, column: string) {
  if (_.has(body, column) && (_.isPlainObject(body[column]) || _.isArray(body[column]))) {
    body[column] = JSON.stringify(body[column])
  }
}
