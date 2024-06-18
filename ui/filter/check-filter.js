import PropTypes from 'prop-types'
import React from 'react'
import {FastFilter} from './fast-filter'
import {Checkbox} from '../form/checkbox'
import {Gap} from '../gap'
import {addRemove} from '../../helpers/array'

export const CheckFilter = ({title, options, value, onChange}) => {
  return (
    <FastFilter
      title={title}
      placeholder={title}
      initialValue={value}
      onChange={onChange}
      render={(value, setValue) => {
        return (
          <Gap gap={'16px'}>
            {options.map(option => (
              <Checkbox
                key={option.value}
                checked={value.includes(option.value)}
                onClick={() => setValue(addRemove(option.value, value))}
                title={option.title}
                subTitle={option.tooltip}
              />
            ))}
          </Gap>
        )
      }}/>
  )
}
CheckFilter.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.array,
  onChange: PropTypes.func,
}