import React, {useState} from 'react'
import {Text} from '../../../ui/text'
import {SearchInput} from '../../../ui/search-input'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import {useDispatch, useSelector} from 'react-redux'
import {useDebouncedEffect} from '../../../helpers/debounce'
import {SpecializationFilter} from './filters/specialization-filter'
import {OrderTypesFilter} from './filters/order-types-filter'
import {DatesFilter} from './filters/dates-filter'
import {getTranslator} from '../../../utils/translation'

const FiltersWell = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #FFFFFF;
  border-radius: 20px 20px 0px 0px;
  border-bottom: 1px solid #D9D9D9;
  padding: 24px 0;
`

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  & > * + * {
      margin-top: 16px;
  };
`

const FiltersContainer = styled.div`
   display: flex;
   
   
   & > * + * {
      margin-left: 8px;
  };
`


export const HistoryFiltersBlock = () => {
  const [searchText, setSearchText] = useState(useSelector(state => state.profileHistory.filters.search))
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))

  useDebouncedEffect(() => dispatch.profileHistory.updateFilters({search: searchText}), 500, [searchText])

  return (
    <FiltersWell>
      <Container>
        <FilterWrapper>
          <Text width={'auto'} size={'28px'} lineHeight={'32px'} color={'black'}>
            {translator('profile.history.filter.title', true)}
          </Text>
          <FiltersContainer>
            <SearchInput
              placeholder={translator('profile.history.filter.title-placeholder', true)}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <SpecializationFilter/>
            <OrderTypesFilter/>
            <DatesFilter/>
          </FiltersContainer>
        </FilterWrapper>
      </Container>
    </FiltersWell>
  )
}