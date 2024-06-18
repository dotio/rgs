import {Col} from '../../../ui/grid/col'
import {Wrapper} from '../../../ui/wrapper'
import {Gap} from '../../../ui/gap'
import {Checkbox} from '../../../ui/form/checkbox'
import {addRemove} from '../../../helpers/array'
import React from 'react'
import {FiltersGroup} from './filters-group'

export const CheckGroup = ({title, value, onChange, options}) => {
  const sliceIndex = Math.ceil(options.length / 2)
  const optionsGroups = [
    options.slice(0, sliceIndex),
    options.slice(sliceIndex)
  ]
  return (
    <FiltersGroup title={title}>
      {optionsGroups.map((options, index) => (
        <Col key={index} lg={{cols: 6}}>
          <Wrapper flow={'column'} align={'flex-start'} padding={'6px 0 0 0'}>
            <Gap gap={'8px'}>
              {options.map(option => (
                <Checkbox
                  key={option.value}
                  onClick={() => onChange(addRemove(option.value, value))}
                  title={option.title}
                  checked={value.includes(option.value)}
                />
              ))}
            </Gap>
          </Wrapper>
        </Col>
      ))}
    </FiltersGroup>
  )
}