import React, {memo} from 'react'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {ChatBubble, getTheme} from './chat-bubble'
import {Router} from '../../../routes'
import {Avatar} from '../../../ui/avatar'

const MessageContainer = styled.div`
  display: flex;
  width: ${p => p.isConsultationRoute ? '288px' : 'calc(100% - 4px)'};

  &:hover {
    cursor: pointer;
  }
`

const DescriptionContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`

export const MessageDoctorDetail = memo(({message, isConsultationRoute, isWidget}) => {
  const {doctorId, specialization, firstName, lastName, middleName, photo} = message.params

  const theme = isWidget ?  'widget' : 'blue'
  const {textColor} = getTheme(theme)

  return (
    <MessageContainer isConsultationRoute={isConsultationRoute} onClick={() => Router.pushRoute(`/doctor/${doctorId}`)}>
      <ChatBubble messageTheme={theme} width={'100%'} padding={'11px'}>
        <Avatar src={photo ? photo : '/static/doctor/male_doctor.svg'} height={'48px'} minHeight={'48px'} width={'48px'}/>
        <DescriptionContainer>
          <Text color={textColor}>
            {[lastName, firstName].join(' ')}
          </Text>
          <Text color={textColor}>
            {middleName}
          </Text>
          <Text color={'black50'}>
            {specialization}
          </Text>
        </DescriptionContainer>
      </ChatBubble>
    </MessageContainer>
  )
})