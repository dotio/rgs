import React from 'react'
import {Wrapper} from '../../../ui/wrapper'
import styled, {css} from 'styled-components'
import {media} from '../../../helpers/media'
import PropTypes from 'prop-types'
import {Button} from '../../../ui/button'
import {getElementColor} from '../../../ui/helpers/getColor'
import {useDropdownOpenClose} from '../../../ui/form/hooks'
import {CalendarContainer} from '../../../ui/dates/calendar-container'
import moment from 'moment'
import ReactCalendar from 'react-calendar'

const FilterContainer = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  
  ${p => media.mobile(p.mobileFull && css`
    width: 100%;
    flex-shrink: 0;
  `)}
`

export const ElementButton = styled(Button)`
  border: 1px solid ${p => p.selected ? 'transparent' : getElementColor('stroke', p.theme)};
  padding: 5px 11px;
  ${(p) => !p.selected && css`
      box-shadow: none;
      color: ${getElementColor('greyText', p.theme)};
  `}
`

export const DisableButton = styled(Button)`
  padding: 5px 11px;

  ${(p) => p.disabled && css`
      box-shadow: none;
      background: ${getElementColor('disabledButtons', p.theme)};
      color: ${getElementColor('disabledText', p.theme)};
  `}
`

const createElement = (element, onChange, selected, onChangeCalendar, selectedDate) => {
  const {id, typeButton, name} = element

  switch (typeButton) {
    case 'normal':
      return <ElementButton selected={selected === id} onClick={() => onChange(id)}> {name} </ElementButton>
    case 'selectorDate':
      return <CalendarInput onChangeCalendar={(date) => onChangeCalendar(date)} selectedDate={selectedDate}/>
    case 'deselected':
      return <DisableButton disabled={true}> {name} </DisableButton>
    default:
      return null
  }
}

export const CalendarInput = ({value, format, onChangeCalendar, selectedDate, ...calendarProps}) => {
  const [opened, setOpened, setMouseInside] = useDropdownOpenClose()
  const handleChange = (val) => {
    onChangeCalendar(moment(val))
    setOpened(false)
  }

  // const changeFromInput = (val) => {
  //   setOpened(true)
  //   onChange(val)
  // }

  const isValidDate = (date) => {
    return moment(date, format).isValid()
  }

  return (
    <CalendarContainer onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)}>
      <ElementButton selected={selectedDate !== null} onClick={() => setOpened(!opened)}>{
        selectedDate === null ? 'Другая дата' : moment(selectedDate).format('ddd, DD MMM')
      }</ElementButton>
      {opened && <ReactCalendar
        onChange={handleChange}
        value={isValidDate(value) ? moment(value, format).toDate() : null}
        {...calendarProps}
        locale={'ru'}
      />}
    </CalendarContainer>
  )
}

export const SelectorFromList = ({elements, selected, onChange, selectedDate, onChangeCalendar}) => {
  return (
    <Wrapper align={'center'} flexWrap>
      {elements.map((element) => {
        return <FilterContainer key={element.id}>
          {createElement(element, onChange, selected, onChangeCalendar, selectedDate)}
        </FilterContainer>
      })}
    </Wrapper>
  )
}

SelectorFromList.propTypes = {
  elements: PropTypes.array, // type, id,
  onChange: PropTypes.func,
  selected: PropTypes.string,
}

export default SelectorFromList