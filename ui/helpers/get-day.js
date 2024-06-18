import moment from 'moment'

export const getDay = () => {
  const today = moment().day()
  return today === 0 ? 2 : (today === 6 ? 1 : 0)
}

export const getScheduleText = (str) => {
  const formatString = str.replace('-', 'до').replace(/:00/g, '')
  const today = moment().day()
  return (today === 0 || today === 6) ? 'Сегодня выходной' : `Сегодня с ${formatString}`
}