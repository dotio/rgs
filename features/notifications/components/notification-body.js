import React from 'react'
import {Wrapper} from '../../../ui/wrapper'
import {Icon} from '../../../ui/icon'
import {Text} from '../../../ui/text'

const ICONS = {
  success: {
    type: 'circle_success',
    color: 'primary'
  },
  warn: {
    type: 'circle_warning',
    color: 'dangerousRed'
  },
  error: {
    type: 'circle_warning',
    color: 'dangerousRed'
  }
}

export const NotificationBody = ({type, text}) => {
  return (
    <Wrapper gap={'14px'} align={'center'}>
      {ICONS[type] && <Icon type={ICONS[type].type} color={ICONS[type].color} width={20} height={20} />}
      <Text size={'16px'} lineHeight={'24px'} color={ICONS[type] ? 'white' : 'black'}>{text}</Text>
    </Wrapper>
  )
}