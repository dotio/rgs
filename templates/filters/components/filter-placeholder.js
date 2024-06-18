import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FilterButton} from '../../../ui/filter/filter-button'

export const FilterPlaceholder = ({title, filterKey}) => {
  const value = useSelector(state => state.doctors.filters[filterKey])
  const dispatch = useDispatch()
  if (value === null) {
    return null
  }
  return (
    <FilterButton
      selected={true}
      onClick={() => dispatch.modal.addAndShowModal({type: 'doctors-filters'})}
    >{title}</FilterButton>
  )
}