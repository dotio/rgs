import React, {useState} from 'react'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {SearchInput} from '../../../ui/search-input'
import {FilterButton} from '../../../ui/filter/filter-button'
import styled, {css} from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Checkbox} from '../../../ui/form/checkbox'
import {addRemove} from '../../../helpers/array'
import {media} from '../../../helpers/media'

const OptionsList = styled.div`
  max-height: 270px;
  overflow: auto;
  ${media.mobile`
    max-height: calc(100vh - 140px);
    padding-bottom: 20px;
    min-height: 50vh;
  `}
  
  ${p => media.mobile(p.orderTypeWithoutMinHeight && css`
    min-height: 0;
  `)}
`
const Option = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding-top: 16px;
  min-height: 36px;
  border-radius: 100px;
  
  &:first-child{
    padding-top: 0;
  }
`

const ApplyButton = styled(FilterButton)`
  color: ${p => getColor('black', p.theme)};
  background-color: ${p => getColor('black05', p.theme)};
  border: none;
  &:hover {
    border: none;
  }
`

const ButtonsWrapper = styled(Wrapper)`
  position: absolute;
  background: ${p => getColor('white', p.theme)};
  left: 0;
  bottom: 15px;
  padding: 16px 24px 0 24px;
  
  ${media.mobile`
    bottom: 0;
    padding: 16px;
    position: fixed;
  `}
`

export const MultiDropDown = ({
  resetValue,
  applyValue,
  opened,
  title,
  withSearch,
  searchPlaceholder,
  options,
  renderItem,
  value,
  orderTypePadding,
  orderTypeWithoutMinHeight
}) => {
  const [localValue, setLocalValue] = useState(value)
  const [searchText, setSearchText] = useState('')
  const [touch, setTouch] = useState(false)

  let visibleOptions = searchPlaceholder
    ? options.filter((option) => option.searchBy.toUpperCase().includes(searchText.toUpperCase()))
    : options

  const selectedItems = options.filter(option => value.includes(option.value))
  const listOptions = [...selectedItems, ...visibleOptions.filter(item => !value.includes(item.value))]

  const changeValue = async (value) => {
    await setLocalValue(addRemove(value, localValue))
    setTouch(true)
  }

  if (!opened) {
    return null
  }
  return (
    <>
      <Text size={'20px'} lineHeight={'30px'} smSize={'24px'} smLineHeight={'28px'} padding={'0 0 16px'}>{title}</Text>
      <Wrapper
        flow={'column'}
        justify={'center'}
        align={'stretch'}
        padding={orderTypePadding && '0 0 60px'}
        mobilePadding={orderTypePadding && '0'}
      >
        {withSearch && (
          <Wrapper padding={'0 0 16px'}>
            <SearchInput
              width={'100%'}
              bgColor={'black10'}
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </Wrapper>
        )}
        <OptionsList orderTypeWithoutMinHeight={orderTypeWithoutMinHeight}>
          {listOptions.map((option) => {
            return renderItem ? (
              renderItem(option, localValue.includes(option.value), () => changeValue(option.value))
            ) : (
              <Option
                key={option.value + option.title}
                onClick={() => changeValue(option.value)}
              >
                <Checkbox
                  title={option.title}
                  subTitle={option.tooltip}
                  alignItems={'flex-start'}
                  checked={localValue.includes(option.value)}
                />
              </Option>
            )
          })}
        </OptionsList>
      </Wrapper>
      {localValue.length !== 0 && <ButtonsWrapper justify={selectedItems.length ? 'space-between' : 'flex-end'} align={'center'}>
        {selectedItems.length > 0 && (
          <FilterButton borderColor={'separator'} onClick={resetValue}>Очистить</FilterButton>
        )}
        {touch && localValue.length !== 0 && <ApplyButton onClick={() => applyValue(localValue)}>Применить</ApplyButton>}
      </ButtonsWrapper>}
    </>
  )
}
