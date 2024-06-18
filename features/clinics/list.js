import React from 'react'
import {ClinicsListFilter} from './clinic-list-filters'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../utils/translation'

export const ClinicsListComponent = ({resizeMap, coords}) => {
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <ClinicsListFilter title={translator('clinic.main.title', true)} resizeMap={resizeMap} coords={coords} />
  )
}