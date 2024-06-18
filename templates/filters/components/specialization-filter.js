import React from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {SingleListFilter} from '../ui/single-list-filter'

export const SpecializationFilter = ({value, onChange, withIcon, isSelect, mobileWidth, isRecommendationModal}) => {
  const specializations = useSelector(state => state.dictionary['doctor-specializations'].map((specialization) => ({
    value: specialization.id.toString(),
    title: specialization.title,
    searchBy: specialization.title,
  })))

  return (
    <SingleListFilter
      title={'Специальность'}
      searchPlaceholder={'Найти специальность...'}
      options={specializations}
      value={value}
      isSelect={isSelect}
      onChange={onChange}
      withIcon={withIcon}
      mobileWidth={mobileWidth}
      isRecommendationModal={isRecommendationModal}
    />
  )
}

SpecializationFilter.propTypes = {
  isSelect: PropTypes.bool,
}