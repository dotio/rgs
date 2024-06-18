import React, {memo} from 'react'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Icon} from '../../../ui/icon'

export const TemporaryMessage = memo(({message}) => {

  const {title, description, icon} = message.params
  return (
    <Wrapper width={'auto'} flow={'column'} align={'center'}>
      <Text width={'auto'} color={'black50'} align={'center'}>{title}</Text>
      <Wrapper gap={'6px'} align={'center'} width={'auto'}>
        <Wrapper width={'auto'} align={'center'}><Icon type={icon}  color={'black40'} width={16} height={16} /></Wrapper>
        <Text color={'black50'} align={'center'}>{description}</Text>
      </Wrapper>
    </Wrapper>
  )
})