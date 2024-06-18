import React from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {MultiListFilter} from '../../../templates/filters/ui/multi-list-filter'
import {SingleListFilter} from '../../../templates/filters/ui/single-list-filter'

export const ThemeTypesFilter = ({value, single, withIcon, onChange, mobileWidth}) => {
  const feedbackTypes = useSelector(state => state.dictionary['feedback-types'].map(feedbackType => ({
    value: feedbackType.id.toString(),
    title: feedbackType.title,
    tooltip: feedbackType.description,
    searchBy: feedbackType.title,
  })))

  const FilterComponent = single ? SingleListFilter : MultiListFilter

  return (
    <FilterComponent
      title={'Выберите тему'}
      options={feedbackTypes}
      multi={!single}
      initialValue={value}
      onChange={onChange}
      withIcon={withIcon}
      value={value}
      mobileWidth={mobileWidth}
    />
  )
}

ThemeTypesFilter.propTypes = {
  selectedServiceTypes: PropTypes.string,
  onChange: PropTypes.func,
  single: PropTypes.bool,
  withIcon: PropTypes.bool,
}