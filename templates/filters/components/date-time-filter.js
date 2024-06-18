import React from 'react'
import moment from 'moment'
import {Calendar} from '../../../ui/filter/calendar'
import {DateButton} from '../../../ui/filter/date-button'
import {Wrapper} from '../../../ui/wrapper'
import styled, {css} from 'styled-components'
import {getDays} from '../../../helpers/calendar'
import {media} from '../../../helpers/media'

const DateTimeContainer = styled.div`
  ${media.mobile`
    overflow: auto;
    width: 100%;
    display: flex;
  `}

  //чтобы у первого слота не обрезалась тень
  ${p => p.insetShift && css`
    padding-left: ${p.insetShift};
    position: relative;
    left: -${p.insetShift};
  `}
`

export const DateTimeFilter = ({date, setDate, withoutCrossIcon, optionsMargin, insetShift}) => {
  const mDate = moment(date)
  const mToday = moment()
  const days = getDays(mToday, 3, mDate.format('YYYY-MM-DD'))
  const fastSelected = days.findIndex(day => day.selected) !== -1
  const optionProps = withoutCrossIcon ? {} : {onCrossClick: () => setDate(null)}

  return (
    <DateTimeContainer insetShift={insetShift}>
      <Wrapper justify={'flex-start'} >
        {days.map(day => {
          let dayTitle = day.title

          if (moment(day.value).isSame(moment(), 'day')) {
            dayTitle = `Сегодня, ${moment(day.value).format('D MMM')}`

          } else if (moment(day.value).isSame(moment().add(1, 'day'), 'day')) {
            dayTitle = `Завтра, ${moment(day.value).format('D MMM')}`
          }

          return (<DateButton
            key={day.title}
            selected={day.selected}
            onClick={() => setDate(day.value)}
            optionsMargin={optionsMargin}
            {...optionProps}
          >{dayTitle}</DateButton>)
        })}
        <Calendar
          title={(date && !fastSelected) ? mDate.format('D MMM') : 'Другая дата'}
          onCrossClick={!withoutCrossIcon && (() => setDate(null))}
          selected={date !== null && !fastSelected}
          minDate={mToday.toDate()}
          margin={'0 0 10px 0'}
          onChange={(value) => setDate(moment(value).format('YYYY-MM-DD'))}
          value={(fastSelected || !mDate.isValid()) ? null : mDate.toDate()}
        />
      </Wrapper>
    </DateTimeContainer>
  )
}