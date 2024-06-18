import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import styled, {css} from 'styled-components'
import {Wrapper} from './wrapper'
import {Text} from './text'
import {media} from '../helpers/media'
import {Gap} from './gap'
import {SearchInput} from './search-input'
import {Checkbox} from './form/checkbox'
import {addRemove} from '../helpers/array'
import {getColor} from './helpers/getColor'
import {ModalSaveButton} from '../features/profile/components/modal-save-button'
import {T} from '../utils/translation'
import {useDebouncedEffect} from '../helpers/debounce'

const SearchResults = styled(Wrapper)`
  //height: calc(100vh - 200px);
  //overflow-y: auto;
  
`

const StyledText = styled(Text)`
  color: ${p => getColor('black', p.theme)};

  ${p => p.checked && css`
    color: ${getColor('primary', p.theme)};
  `}
  
  ${p => p.disabled && css`
    color: ${getColor('black20', p.theme)};
  `}

  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const SaveButton = styled(ModalSaveButton)`
  position: fixed;
  bottom: 20px;
`

const ItemsWrapper = styled(Wrapper)`
  align-items: center;
  &:last-child{
    margin-bottom: 20px;
  }
`

export const FilteredItemList = ({code, items, initialSelectedItems, placeholder, onChange}) => {
  const dispatch = useDispatch()
  const noItemsOption = items.find((item) => item.id === 0)
  const initialSelectedItemIds = initialSelectedItems.map((item) => item.id)

  const [selectedItems, setSelectedItems] = useState(initialSelectedItems)
  const [searchText, setSearchText] = useState('')

  const sortedItems = [
    ...initialSelectedItems,
    ...items.filter((d) => !initialSelectedItemIds.includes(d.id))
  ]

  const isNoItemsOptionSelected = noItemsOption && selectedItems.find(({id}) => id === noItemsOption.id)
  const isAnyOtherOptionSelected = selectedItems.length > 0 && !isNoItemsOptionSelected

  const changeHandler = () => isNoItemsOptionSelected
    ? onChange([noItemsOption])
    : onChange(selectedItems.map((id) => id))

  useDebouncedEffect(() => dispatch.dictionary.fetchAnamnesisDictionary({force: true, code, search: searchText, limit: 20, offset: 0}), 500, [searchText])

  useEffect(() => {
    return () => {
      dispatch.dictionary.fetchAnamnesisDictionary({force: true, code, limit: 20, offset: 0})
    }
  }, [])

  return (
    <>
      <Gap gap={'24px'} mobileGap={'16px'}>
        <SearchInput
          bgColor={'black10'}
          width={'100%'}
          placeholder={placeholder}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          big
          mobileSmall
        />
        <SearchResults flow={'column'} gap={'24px'} mobileGap={'16px'}>
          {noItemsOption && !searchText && <Checkbox
            noMargin
            checked={isNoItemsOptionSelected}
            key={noItemsOption.id}
            disabled={isAnyOtherOptionSelected}
            onClick={() => setSelectedItems(isNoItemsOptionSelected ? [] : [noItemsOption])}
            renderItem={() =>
              <StyledText
                size={'28px'}
                lineHeight={'32px'}
                checked={isNoItemsOptionSelected}
                padding={'0 0 0 12px'}
                disabled={isAnyOtherOptionSelected}
              >
                {noItemsOption.title}
              </StyledText>
            }
          />}
          {sortedItems.map((item) => {
            if(item.id === 0) {
              return null
            }

            const selected = selectedItems.length > 0 && selectedItems.find(({id}) => item.id === id)

            return <ItemsWrapper key={'item-' + item.id}>
              <Checkbox
                checked={selected}
                noMargin
                key={item.id}
                onClick={() => setSelectedItems(addRemove(item, selectedItems))}
                disabled={isNoItemsOptionSelected}
                renderItem={() =>
                  <StyledText
                    size={'28px'}
                    lineHeight={'32px'}
                    checked={selected}
                    disabled={isNoItemsOptionSelected}
                    padding={'0 0 0 12px'}
                  >
                    {item.title}
                  </StyledText>
                }
              />
            </ItemsWrapper>
          })}
        </SearchResults>
      </Gap>
      <Wrapper padding={'0 0 48px'}>
        <SaveButton mobileFixed color={'primary'} onClick={changeHandler}><T ucFirst>profile.medcard.anamnesis.save.button</T></SaveButton>
      </Wrapper>
    </>
  )
}