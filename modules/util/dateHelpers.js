import moment from 'moment'
const dateFormat = 'YYYY-MM-DD'

export const minJobDate = moment('2005-01-01', dateFormat).format(dateFormat)

export const maxJobDate = moment().subtract(1, 'year').format(dateFormat)

export function isToday(time) {
  return moment().isSame(moment(time), 'day')
}
