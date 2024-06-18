import moment from 'moment'
import {ucFirstFn} from './index'

const translatorDate = (dates, date, format, ucFirst, formatKey = 'M') => {
  if (!isNaN((new Date(date)).getTime())) {
    const dateNumber = moment(date).format(formatKey) - 1
    const dateTranslate = dates[dateNumber] ? dates[dateNumber].plural['1'] : ''
    const formattedTranslateDate = ucFirst ? ucFirstFn(dateTranslate) : dateTranslate

    return moment(date).format(format).replace('KKKK', formattedTranslateDate)
  }
  return date
}

export const getTranslatorDate = (dates) => (date, format = 'YYYY-KKKK-DD', ucFirst = false, formatKey = 'M') => {
  return translatorDate(dates, date, format, ucFirst, formatKey)
}
