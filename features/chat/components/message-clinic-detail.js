import React, {memo, useMemo} from 'react'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {ChatBubble, getTheme} from './chat-bubble'
import {Router} from '../../../routes'

const MessageContainer = styled.div`
  display: flex;
  width: ${p => p.isConsultationRoute ? '288px' : 'calc(100% - 4px)'};
  &:hover {
    cursor: pointer;
  }
`

const ClinicIcon = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  flex-grow: 0;
  background-image: url(${p => p.icon});
  background-size: 48px auto;
  background-position: top center;
  background-repeat: no-repeat;
  margin-right: 12px;
`

const DescriptionContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

export const MessageClinicDetail = memo(({message, isConsultationRoute, isWidget}) => {
  const {clinicId, clinicName, clinicLogo, clinicAddress, clinicMetro} = message.params
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [message.id || message.clientMessageId])

  const theme = isWidget ?  'widget' : 'blue'
  const {textColor} = getTheme(theme)

  return (
    <MessageContainer isConsultationRoute={isConsultationRoute} onClick={() => Router.pushRoute(`/clinic/${clinicId}`)}>
      <ChatBubble width={'100%'} messageTheme={theme} padding={'11px'}>
        <ClinicIcon icon={clinicLogo ? clinicLogo : `/static/mocks/clinic${memoizedRandom}.svg`}/>
        <DescriptionContainer>
          <Text color={textColor}>{clinicName}</Text>
          <Text color={'black50'} >{clinicAddress}</Text>
          {clinicMetro && <Text color={'black50'}>{`м. ${clinicMetro}`}</Text>}
        </DescriptionContainer>
      </ChatBubble>
    </MessageContainer>
  )
})