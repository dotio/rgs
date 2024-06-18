import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import React, {useState} from 'react'
import {FastFilter} from './fast-filter'
import {Text} from '../text'
import {addRemove} from '../../helpers/array'
import {getPlaceholder} from './helpers'
import {SearchInput} from '../search-input'
import {getColor} from '../helpers/getColor'

const OptionsList = styled.div`
  margin-top: 10px;
  max-height: 224px;
  overflow: auto;
  margin-left: -12px;
  margin-right: -12px;
`
const Option = styled.div`
  cursor: pointer;
  margin-bottom: 4px;
  display: flex;
  align-items:center;
  &:last-child {
    margin-bottom: 0;
  }
  padding: 0 12px;
  height: 36px;
  border-radius: 100px;
  ${p => p.selected && css`
    background: ${p => getColor('black10', p.theme)};
  `}
  &:hover {
    background: ${p => getColor('black10', p.theme)};
  }
`

export const ListFilter = ({title, searchPlaceholder, options, multi, value, onChange}) => {
  const [searchText, setSearchText] = useState('')

  const visibleOptions = options.filter(option => option.searchBy.toUpperCase().includes(searchText.toUpperCase()))
  return (
    <FastFilter
      title={title}
      placeholder={getPlaceholder(value, options, title)}
      initialValue={value}
      onChange={onChange}
      multi={multi}
      render={(value, setValue) => {
        return (
          <>
            <SearchInput
              width={'100%'}
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <OptionsList>
              {visibleOptions.map(option => (
                <Option
                  key={option.value + option.title}
                  selected={multi && value.includes(option.value)}
                  onClick={() => setValue(multi ? addRemove(option.value, value) :[option.value])}
                >
                  {typeof option.title === 'string' ? <Text>{option.title}</Text> : option.title}
                </Option>
              ))}
            </OptionsList>
          </>
        )
      }}/>
  )
}
ListFilter.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func,
  multi: PropTypes.bool,
}
ListFilter.defaultProps = {
  multi: false,
}