import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Text} from '../../../ui/text'
import {Icon} from '../../../ui/icon'
import {FilterButton} from '../../../ui/filter/filter-button'
import {getTranslator} from '../../../utils/translation'

export const OtherFilters = ({data}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <FilterButton onClick={() => dispatch.modal.addAndShowModal({type: 'other-filters', data})}>
      <Text as={'span'} color={'inherit'} padding={'0 6px 0 0'}>{translator('doctor.filters-modal.title', true)}</Text>
      <Icon type={'dots_16'} color={'black40'} width={16} height={16}/>
    </FilterButton>
  )
}