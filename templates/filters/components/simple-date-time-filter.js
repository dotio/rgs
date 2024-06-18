import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {CalendarContainer} from '../../../ui/dates/calendar-container'
import ReactCalendar from 'react-calendar'
import {useFilterOpenClose} from '../../../ui/filter/hooks'
import {FilterButton} from '../../../ui/filter/filter-button'

const DateTimeContainer = styled.div`
`

export const SimpleDateTimeFilter = ({date, onChange, isChatSearch}) => {
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()

  const title = date ? moment(date).format('YYYY-MM-DD') : 'Дата'

  return (
    <DateTimeContainer>
      <CalendarContainer onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)} isChatSearch={isChatSearch}>
        <FilterButton onClick={() => setOpened(!opened)} selected={date}>{title}</FilterButton>
        {opened && <ReactCalendar
          onChange={(val) => {
            setOpened(false)
            onChange(moment(val).format('YYYY-MM-DD'))
          }}
          value={moment(date, 'YYYY-MM-DD').isValid() ? moment(date, 'YYYY-MM-DD').toDate() : null}
          locale={'ru'}
        />}
      </CalendarContainer>
    </DateTimeContainer>
  )
}