import React, {useState} from 'react'
import styled from 'styled-components'
import ReactCalendar from 'react-calendar'
import {Input} from './input'
import {CalendarContainer} from '../dates/calendar-container'
import {useDropdownOpenClose} from './hooks'
import {Icon} from '../icon'
import moment from 'moment'
import {isMobile} from 'react-device-detect'

const DesktopInput = styled(Input)`
  display: ${isMobile ? 'none': ' block'};
`
const MobileInput = styled(Input)`
  display: ${isMobile ? 'block': 'none'};
  height: 36px;
  width: 232px;
`

const IconBox = styled.div`
  position: absolute;
  pointer-events: ${isMobile ? 'none' : ' auto'};
  top: 8px;
  right: 14px;
  cursor: pointer;
`

const MobileDatePlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 16px;
  line-height: 24px;
  padding: 6px 12px;
  color: #999;
  pointer-events: none;
`

export const CalendarInput = ({placeholder, mask, value, format, onChange, ageStart, max, ageEnd, maxDate, disabled, error, width, ...calendarProps}) => {
  const [opened, setOpened, setMouseInside] = useDropdownOpenClose()
  const [isError, setIsError] = useState(false)
  const currentDate = new Date()

  const handleChange = (val) => {
    onChange(moment(val).format(format))
    setOpened(false)
  }

  const nonEmptyOrDateFormat = value => (value.length > 0 && value.split('').filter(item => !isNaN(item)).length === 8)

  const changeFromInput = (val) => {
    setIsError(false)
    setOpened(true)

    if(nonEmptyOrDateFormat(val) && !moment(val, 'DD.MM.YYYY').isValid()) {
      setIsError(true)
      setOpened(false)
      onChange('')
      return
    }

    if(nonEmptyOrDateFormat(val) && (moment(val, 'DD.MM.YYYY').diff(moment().add(-101, 'y')) < 0 || moment(val, 'DD.MM.YYYY').diff(moment()) >= 0)) {
      setIsError(true)
      setOpened(false)
      onChange('')
      return
    }

    if(nonEmptyOrDateFormat(val) && (
      ageEnd && moment(val, 'DD.MM.YYYY').diff(moment().add(-ageEnd, 'y')) <= 0
      || ageStart && moment(val, 'DD.MM.YYYY').diff(moment().add(-ageStart, 'y')) > 0
    ))
    {
      setIsError(true)
      setOpened(false)
      onChange('')
      return
    }

    onChange(val)
  }

  const isValidDate = (date) => {
    return moment(date, format).isValid()
  }

  let dateProps = {}

  if(ageEnd) {
    dateProps.minDate = new Date(currentDate.getFullYear() - ageEnd, currentDate.getMonth(), currentDate.getDate())
  }
  if(ageStart) {
    if (ageStart < 0) {
      dateProps.maxDate = new Date()
    } else {
      dateProps.maxDate = new Date(currentDate.getFullYear() - ageStart, currentDate.getMonth(), currentDate.getDate())
    }
  }

  return (
    <CalendarContainer onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)} calendarContainerWidth={width}>
      <DesktopInput
        size={'16px'}
        borderRadius={'16px'}
        padding={'5px 11px'}
        wide
        placeholder={placeholder}
        mask={mask}
        borderSize={'1px'}
        onChange={(e) => changeFromInput(e.target.value)}
        value={value}
        disabled={disabled}
        error={error || isError}
      />
      <MobileInput
        size={'16px'}
        borderRadius={'16px'}
        padding={'5px 11px'}
        placeholder={placeholder}
        type={'date'}
        value={value}
        maskChar={null}
        borderSize={'1px'}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        error={error || isError}
        max={max}
      />
      <IconBox onClick={() => setOpened(!opened)}>
        <Icon type={'calendar'} color={'black40'} />
      </IconBox>
      {opened && <ReactCalendar
        onChange={handleChange}
        value={isValidDate(value) ? moment(value, format).toDate() : null}
        maxDate={maxDate}
        {...dateProps}
        {...calendarProps}
        locale={'ru'}
      />}
      {isMobile && !value && <MobileDatePlaceholder>дд.мм.гггг</MobileDatePlaceholder>}
    </CalendarContainer>
  )
}
