import React from 'react'
import moment from 'moment'
import {T} from '../../../../utils/translation'

/**
 * Получает на вход объект moment и возвращает строку для отображения даты в чате
 * @param date
 * @returns {*}
 */
export const getDateForChat = (date) => {
  if (date.isSame(moment(), 'day')) {
    return <T ucFirst>chat.day.today</T>
  }
  return date.format('YYYY-MM-DD')
}