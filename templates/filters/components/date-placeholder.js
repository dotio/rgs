import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {FilterButton} from '../../../ui/filter/filter-button'
import moment from 'moment'

export const DatePlaceholder = () => {
  const date = useSelector(state => state.doctors.filters['date'])
  const dispatch = useDispatch()
  if (date === null) {
    return null
  }
  return (
    <FilterButton
      selected={true}
      onClick={() => dispatch.modal.addAndShowModal({type: 'doctors-filters'})}
    >{moment(date).format('D MMMM')}</FilterButton>
  )
}