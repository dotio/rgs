import React from 'react'
import {DateButton} from './date-button'
import {CalendarContainer} from '../dates/calendar-container'
import ReactCalendar from 'react-calendar'
import {useFilterOpenClose} from './hooks'

export const Calendar = ({title, onCrossClick, selected, onChange, dateTitle, margin, ...calendarProps}) => {
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()
  return (
    <CalendarContainer onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)}>
      <DateButton onCrossClick={onCrossClick} onClick={() => setOpened(!opened)} selected={selected} margin={margin}>{dateTitle ? dateTitle : title}</DateButton>
      {opened && <ReactCalendar
        onChange={(val) => {
          setOpened(false)
          onChange(val)
        }}
        {...calendarProps}
        locale={'ru'}
      />}
    </CalendarContainer>
  )
}