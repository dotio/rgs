import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {SingleListFilter} from '../ui/single-list-filter'

export const CityFilter = ({value, onChange}) => {
  const cities = useSelector((state) => state.dictionary.cities.map(({id, name}) => ({
    value: id.toString(),
    title: name,
    searchBy: name
  })))

  return (
    <SingleListFilter
      title={'Город'}
      searchPlaceholder={'Найти город...'}
      options={cities}
      value={value}
      onChange={onChange}
    />
  )
}

CityFilter.propTypes = {
  selectedCityId: PropTypes.number,
  onChange: PropTypes.func,
}