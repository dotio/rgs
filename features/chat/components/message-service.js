import React, {memo} from 'react'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'

export const MessageService = memo(({message, isWidget}) => {
  const {text} = message
  return (
    <Wrapper align={'center'} justify={'center'}>
      <Text align={'center'} size={'16px'} lineHeight={'24px'} color={isWidget ? 'white' : 'black50'} whiteSpace={'pre'}>{text}</Text>
    </Wrapper>
  )
})