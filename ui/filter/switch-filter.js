import React from 'react'
import {FastFilter} from '../../ui/filter/fast-filter'
import {Switch} from '../../ui/switch'
import {addRemove} from '../../helpers/array'
import {Wrapper} from '../../ui/wrapper'
import {Text} from '../text'

export const SwitchFilter = ({title, innerTitle, value, onChange, tooltip}) => {

  const onSwitchClicked = (value, setValue) => {
    const newValue = addRemove(true, value)
    setValue(newValue)

    onChange(newValue)
  }

  return (
    <FastFilter
      title={title}
      placeholder={title}
      initialValue={value ? [value] : []}
      onChange={onChange}
      requiredBottomControlPanel={false}
      render={(value, setValue) => {
        return (
          <Wrapper justify={'space-between'} gap={'16px'}>
            <div>
              <Text>{innerTitle}</Text>
              <Text color={'black50'}>{tooltip}</Text>
            </div>
            <Switch onClick={() => onSwitchClicked(value, setValue)} active={value.includes(true)}/>
          </Wrapper>
        )
      }}/>
  )
}