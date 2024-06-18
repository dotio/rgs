import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FilterButton} from '../../../ui/filter/filter-button'

export const DictionaryPlaceholder = ({title, filterKey, dictionaryKey}) => {
  const dictionary = useSelector(state => state.dictionary[dictionaryKey])
  const value = useSelector(state => state.doctors.filters[filterKey])
  const dispatch = useDispatch()
  if (value.length === 0) {
    return null
  }
  return (
    <FilterButton
      selected={true}
      onClick={() => dispatch.modal.addAndShowModal({type: 'doctors-filters'})}
    >{value.length === 1 ? dictionary.find(dict => dict.id.toString() === value[0]).title : `${title} ⋅ ${value.length}`}</FilterButton>
  )
}