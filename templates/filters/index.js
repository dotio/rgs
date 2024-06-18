import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import React from 'react'
import {media} from '../../helpers/media'
import {SpecializationFilter} from './components/specialization-filter'
import {CityFilter} from './components/city-filter'
import {OtherFilters} from './components/other-filters'
import {MetroFilter} from './components/metro-filter'
import {ClinicsFilter} from './components/clinics-filter'
import {SwitchFilter} from './ui/switch-filter'
import {OrderTypesFilter} from './components/order-types-filter'
import {Wrapper} from '../../ui/wrapper'
import {SearchInput} from '../../ui/search-input'
import {SimpleDateTimeFilter} from './components/simple-date-time-filter'

const FilterWrapper = styled(Wrapper)`
  position: relative;
  flex-wrap: wrap;
  ${p => p.mapFilters && media.mobile`
    flex-wrap: nowrap;
  `}
`

const FilterContainer = styled.div`
  margin-right: 8px;
  margin-bottom: 8px;
  ${p => p.mapFilters && media.mobile`
    margin-bottom: 0;
  `}
  ${p => p.hideMobile && media.mobile`
    display: none;
  `}
  

  &:last-child {
    margin-right: 0;
    margin-bottom: 0;
  }
  
  ${p => media.mobile(p.mobileFull && css`
    width: 100%;
    flex-shrink: 0;
  `)}
`

const createFilter = (filter, onChange, clinicRoute, isChatSearch) => {
  const {key, type, value} = filter

  switch (type) {
    case 'search':
      return <SearchInput
        width={clinicRoute && '180px'}
        placeholder={filter.placeholder}
        value={value}
        bgColor={'black10'}
        onChange={(e) => onChange(key, e.target.value)}
      />
    case 'specializations':
      return <SpecializationFilter
        value={value}
        onChange={(value) => onChange(key, value)}
      />
    case 'cities':
      return <CityFilter
        value={value}
        onChange={(value) => onChange(key, value)}
      />
    case 'metro':
      return <MetroFilter
        value={value}
        onChange={(value) => onChange(key, value)}
      />
    case 'clinics':
      return <ClinicsFilter
        value={value}
        onChange={(value) => onChange(key, value)}
      />
    case 'checkerFilter':
      return <SwitchFilter
        title={filter.title}
        innerTitle={filter.subTitle}
        text={filter.text}
        value={!!value}
        onChange={(value) => onChange(key, value)}
      />
    case 'appointmentType':
      return <OrderTypesFilter
        value={filter.value}
        onChange={(value) => onChange(key, value)}
      />
    case 'simple-date-time':
      return <SimpleDateTimeFilter
        date={value}
        onChange={(value) => onChange(key, value)}
        isChatSearch={isChatSearch}
      />
    case 'otherFilters':
      return <OtherFilters data={value}/>
    default:
      return null
  }
}

export const FiltersTemplate = ({filters, onChange, mapFilters, isChatSearch}) => {

  return (
    <FilterWrapper mapFilters={mapFilters}>
      {filters.map((filter) => {
        const {options} = filter
        const clinicRoute = filter.clinicRoute
        return <FilterContainer
          mapFilters={mapFilters}
          hideMobile={options && options.hideMobile && mapFilters}
          mobileFull={filter.type === 'search' && !(options && !options.mobileFull)}
          key={filter.key}
        >
          {createFilter(filter, onChange, clinicRoute, isChatSearch)}
        </FilterContainer>
      })}
      {/*{sort && <ListSorting sortBy={sort.sortBy} onChange={onSortChange} filteringElements={sorts} />}*/}
    </FilterWrapper>
  )
}

FiltersTemplate.propTypes = {
  filters: PropTypes.array,

  /**
   * Информация по сортировке
   */
  sort: PropTypes.object,
  onChange: PropTypes.func,

  /**
   * Callback, вызываемый, когда меняет сортировка
   */
  onSortChange: PropTypes.func
}