import moment from 'moment'

export const getDateForChat = (date) => {
  if (date.isSame(moment(), 'day')) {
    return 'Сегодня'
  }
  return date.format('DD MMMM YYYY')
}