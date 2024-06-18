import React from 'react'
import {SwitchFilter} from '../../../ui/filter/switch-filter'
import PropTypes from 'prop-types'

export const ChildFilter = ({onlyChild, onChange}) => {
  return (
    <SwitchFilter
      title={'Детский врач'}
      innerTitle={'Детский врач'}
      tooltip={'Включите фильтр, если ищите врача для ребёнка.'}
      value={onlyChild}
      onChange={(value) => { onChange('onlyChild', value)}}
    />
  )
}

ChildFilter.propTypes = {
  onlyChild: PropTypes.bool,
  onChange: PropTypes.func,
}