import React, {useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from '../../../ui/grid/container'
import {Wrapper} from '../../../ui/wrapper'
import {getColor} from '../../../ui/helpers/getColor'
import {CircleButton} from '../../../ui/circle-button'
import {FiltersTemplate} from '../../../templates/filters'
import {useDebouncedEffect} from '../../../helpers/debounce'

const BorderedWrapper = styled(Wrapper)`
  border-top: 1px solid ${p => getColor('black05', p.theme)};
  border-bottom: 1px solid ${p => getColor('black05', p.theme)};
  padding: 16px 0 8px 0;
`

const CloseButton = styled(CircleButton)`
  position: static;
`

export const SearchBlock = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.consultation.searchFilter)
  const [searchText, setSearchText] = useState(filters ? filters.search: '')
  const isMobile = useSelector(state => state.consultation.mobile)

  const getFilters = () => {
    return [
      {
        type: 'search',
        key: 'search',
        value: searchText,
        placeholder: 'Найти...',
        options: {
          mobileFull: false,
        }
      },
      {
        type: 'simple-date-time',
        key: 'date',
        value:  filters.date,
      },
    ]
  }

  const handleFiltersChange = (field, value) => {
    if(field === 'search') {
      setSearchText(value)
      return
    }

    dispatch.consultation.updateSearchFilter({
      [field]: value
    })
  }

  useDebouncedEffect(() => dispatch.consultation.updateSearchFilter({search: searchText.trim()}), 500, [searchText])

  const onClose = () => {
    dispatch.consultation.setSettingsBlock(isMobile)
    dispatch.consultation.resetSearchFilter()
    dispatch.consultation.setSearchBlock(false)
  }

  return (
    <BorderedWrapper padding={'16px 0'} align={'center'}>
      <Container>
        <Wrapper justify={'space-between'}>
          <FiltersTemplate onChange={handleFiltersChange} filters={getFilters()} isChatSearch/>
          <CloseButton icon={'cross'} onClick={onClose}/>
        </Wrapper>
      </Container>
    </BorderedWrapper>
  )
}