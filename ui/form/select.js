import styled, {css} from 'styled-components'
import {getColor} from '../helpers/getColor'
import React from 'react'
import {Icon} from '../icon'

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-radius: 100px;
  outline: 0;
  height: 36px;
  line-height: 24px;
  font-size: 16px;
  color:  ${p => getColor(p.color, p.theme)};
  border: 1px solid ${p => getColor('black15', p.theme)};
  padding: 6px 12px;
  overflow: hidden;
  
  ${(p) => p.wide && css`
    width: 100%;
  `}
`
const StyledSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 36px;
  opacity: 0;
`

export const Select = ({placeholder, value, onChange, options, wide}) => {
  const selected = options.find(option => option.value === value)
  return (
    <SelectContainer color={selected ? 'black' : 'black50'} wide={wide}>
      {selected ? selected.title: placeholder}
      <Icon type={'arrow_down'} width={16} height={16} color={'black'}/>
      <StyledSelect defaultValue={''} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled>{placeholder}</option>
        {options.map(option => (
          <option key={option.title + option.value} value={option.value}>{option.title}</option>
        ))}
      </StyledSelect>
    </SelectContainer>
  )
}