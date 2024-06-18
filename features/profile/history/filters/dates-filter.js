import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Calendar} from '../../../../ui/filter/calendar'
import {getDays} from '../../../../helpers/calendar'
import moment from 'moment'
import {getTranslator} from '../../../../utils/translation'

export const DatesFilter = () => {
  const date = useSelector(state => state.profileHistory.filters.date)
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))

  const updateDate = (date) => dispatch.profileHistory.updateFilters({date})

  const mDate = moment(date)
  const mToday = moment()
  const days = getDays(mToday, 4, mDate.format('YYYY-MM-DD'))
  const fastSelected = days.findIndex(day => day.selected) !== -1
  //TODO pass color to not selected date text
  return (
    <Calendar
      title={translator('profile.history.filter.date', true)}
      onCrossClick={() => updateDate(null)}
      selected={date !== null && !fastSelected}
      minDate={mToday.toDate()}
      onChange={(value) => updateDate(moment(value).format('YYYY-MM-DD'))}
      value={(fastSelected || !mDate.isValid()) ? null : mDate.toDate()}
      dateTitle={date ? moment(date).format('D MMM') : null}
    />
  )
}