import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ListFilter} from '../../../../ui/filter/list-filter'
import {getTranslator} from '../../../../utils/translation'

export const SpecializationFilter = () => {
  const specializations = useSelector(state => state.dictionary['doctor-specializations'])
  const specializationId = useSelector(state => state.profileHistory.filters['specializationId'])
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <ListFilter
      title={translator('profile.history.filter.specilization', true)}
      searchPlaceholder={translator('profile.history.filter.specilization-placeholder', true)}
      options={specializations.map((specialization) => ({
        value: specialization.id.toString(),
        title: specialization.title,
        searchBy: specialization.title,
      }))}
      value={specializationId ? [specializationId] : []}
      onChange={(value) => {
        dispatch.profileHistory.updateFilters({
          specializationId: value.length ? value[0] : null
        })
      }}
    />
  )
}