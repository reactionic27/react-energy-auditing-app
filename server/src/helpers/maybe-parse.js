import _ from 'lodash'

export default function maybeParse(body: Object, column: string) {
  if (_.has(body, column) && _.isString(body[column])) {
    body[column] = JSON.parse(body[column])
  }
}
