import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {MultiListFilter} from '../ui/multi-list-filter'

export const ClinicsFilter = ({value, onChange}) => {
  const clinicsList = useSelector(state => state.dictionary.clinics.map(({id, title}) => ({
    value: id.toString(),
    title: title,
    searchBy: title
  })))

  return (
    <MultiListFilter
      title={'Клиника'}
      searchPlaceholder={'Найти клинику...'}
      options={clinicsList}
      multi={true}
      initialValue={value}
      onChange={onChange}
    />
  )
}

ClinicsFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}