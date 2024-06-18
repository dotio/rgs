import React from 'react'
import {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {getColor} from '../helpers/getColor'
import {Input} from './input'
import {Text} from '../text'
import {useDropdownOpenClose} from './hooks'

const AutocompleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  outline: 0;
  height: 36px;
  
  ${p => p.wide && css`
    width: 100%;
  `}
`

const StyledInput = styled(Input)`
  line-height: 24px;
  font-size: 16px;
`

const SelectContainer = styled.div`
  position: absolute;
  top: 38px;
  z-index: 10;
  width: 100%;
  border-radius: 16px;
  background-color:  ${p => getColor('white', p.theme)};
  outline: 0;
  flex-shrink: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  max-height: 300px;
  overflow-y: scroll;
`

const Option = styled.div`
  padding: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: ${p => getColor('black05', p.theme)}
  }
`

export const Autocomplete = ({wide, options, placeholder, value, onInputChange, onChange}) => {
  const [opened, setOpened, setMouseInside] = useDropdownOpenClose()
  const [inputValue, setInputValue] = useState('')

  useEffect(() => setInputValue(value), [value])

  const handleInputChange = (e) => {
    if (!opened) {
      setOpened(true)
    }
    setInputValue(e.target.value)
    onInputChange(e.target.value)
  }

  return (
    <AutocompleteContainer
      wide={wide}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
      onClick={() => setOpened(!opened)}
    >
      <StyledInput
        wide={wide}
        padding={'5px 11px'}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {opened && options && options.length > 0 && <SelectContainer>
        {options.map((option, i) => (
          <Option key={option.id || i} onClick={() => onChange(option.value)}>
            <Text>{option.title}</Text>
          </Option>
        ))}
      </SelectContainer>}
    </AutocompleteContainer>
  )
}

Autocomplete.propTypes = {
  wide: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    value: PropTypes.any,
  })),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onInputChange: PropTypes.func,
  onChange: PropTypes.func,
}
Autocomplete.defaultProps = {
  onInputChange: () => {},
  onChange: () => {},
}