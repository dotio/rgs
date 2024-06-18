import React, {memo} from 'react'
import styled from 'styled-components'
import {Message} from './message'
import { media } from '../../../helpers/media'

const MessageIncomingContainer = styled.div`
  display: flex;
  width: ${p => p.isConsultationRoute ? '537px' : 'calc(100% - 4px)'};
  
  ${media.mobile`
        width: 87%;
  `}
  flex-shrink: 0;
  ${p => !p.collapsed && `
    margin-top: 6px;
  `}
`

export const MessageIncoming = memo(({message, user, isConsultationRoute, ...props}) => {
  return (
    <MessageIncomingContainer collapsed={props.collapsed} isConsultationRoute={isConsultationRoute}>
      <Message alignMessage={'flex-start'} {...message} {...user} {...props} isIncoming/>
    </MessageIncomingContainer>
  )
})