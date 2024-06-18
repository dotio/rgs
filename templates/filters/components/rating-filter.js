import React from 'react'
import {SwitchFilter} from '../../../ui/filter/switch-filter'
import PropTypes from 'prop-types'

export const RatingFilter = ({onlyRated, onChange}) => {
  return (
    <SwitchFilter
      title={'Рейтинг'}
      innerTitle={'Только с рейтингом'}
      tooltip={'Честный рейтинг на основе медицинской статистики.'}
      value={onlyRated}
      onChange={(value) => {
        onChange('onlyRated', value)
      }}
    />
  )
}

RatingFilter.propTypes = {
  onlyRated: PropTypes.bool,
  onChange: PropTypes.func,
}