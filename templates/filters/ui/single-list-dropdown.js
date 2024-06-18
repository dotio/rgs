import React, {useState} from 'react'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {SearchInput} from '../../../ui/search-input'
import {FilterButton} from '../../../ui/filter/filter-button'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'

const OptionsList = styled.div`
  max-height: 260px;
  overflow: auto;
  margin-left: -12px;
  margin-right: -12px;

  ${media.mobile`
    max-height: calc(100vh - 140px);
    min-height: 50vh;
  `}
`
const Option = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  &:last-child {
    margin-bottom: 36px;
  }
  padding: 6px 12px;
  min-height: 36px;
  border-radius: 100px;
  &:hover {
    background: ${p => getColor('black10', p.theme)};
  }
`

const ButtonsWrapper = styled(Wrapper)`
  position: absolute;
  background: ${p => getColor('white', p.theme)};
  left: 0;
  bottom: 15px;
  padding: 16px 24px 0;
  
  ${media.mobile`
    bottom: 0;
    padding: 16px;
    position: fixed;
  `}
`

export const SingleDropDown = ({
  opened,
  title,
  withSearch,
  searchPlaceholder,
  value,
  options,
  onClick,
}) => {

  const [searchText, setSearchText] = useState('')
  const selected = options.find(option => option.value === value)

  if (!opened) {
    return null
  }

  let visibleOptions = options.filter(option => {
    if (selected && selected.value === option.value) {
      return false
    }
    return option.searchBy.toUpperCase().includes(searchText.toUpperCase())
  })

  if (selected) {
    visibleOptions = [selected, ...visibleOptions]
  }

  return (
    <>
      <Text size={'20px'} lineHeight={'30px'} smSize={'24px'} smLineHeight={'28px'}>{title}</Text>
      <Wrapper
        flow={'column'}
        justify={'center'}
        align={'stretch'}
        gap={'10px'}
        padding={'16px 0'}
        mobilePadding={'16px 0'}
      >
        {withSearch && (
          <SearchInput
            width={'100%'}
            bgColor={'black10'}
            placeholder={searchPlaceholder}
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        )}
        <OptionsList value={value}>
          {visibleOptions.map((option) => (
            <Option key={option.value + option.title} onClick={() => onClick(option.value)}>
              {typeof option.title === 'string' ? (
                <Text ellipsis color={option.value === value ? 'primary' : 'black'}>{option.title}</Text>
              ) : (
                option.title
              )}
            </Option>
          ))}
        </OptionsList>
      </Wrapper>
      {value && (
        <ButtonsWrapper justify={'flex-end'} align={'center'}>
          <FilterButton borderColor={'separator'} onClick={() => onClick('')}>
            Очистить
          </FilterButton>
        </ButtonsWrapper>
      )}
    </>
  )
}
