import React from 'react'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {getColor} from '../../../ui/helpers/getColor'
import {Icon} from '../../../ui/icon'
import {getPubSub} from '../../../helpers/pubsub'
import {useDispatch} from 'react-redux'
import {T} from '../../../utils/translation'

const CallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > * + * {
      margin-top: 8px;
  };
  
  align-items: flex-start;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 80px;
  height: 80px;
  background-color: ${p => getColor(p.bgColor, p.theme)};
  border-radius: 20px;
  
  &:first-child {
     margin-right: 8px;
  }
`

export const MessageCall = ({message}) => {
  const {id, callType} = message

  const dispatch = useDispatch()

  const onAccept = () => {
    getPubSub().emit('setActiveTab', callType)
    dispatch.chat.deleteMessage('id', id)
  }

  const onDecline = () => {
    dispatch.chat.deleteMessage('id', id)
  }

  return (
    <CallWrapper>
      <Text size={'16px'} lineHeight={'24px'} color={'black50'}>
        <T ucFirst>chat.call.title</T> { callType === 'audio' ? (<T ucFirst>chat.call.title.audio</T>) : (<T ucFirst>chat.call.title.video</T>)}
      </Text>
      <Wrapper>
        <IconWrapper bgColor={'primary'} onClick={onAccept}>
          <Icon type={'call'} width={32} height={32} color={'white'}/>
        </IconWrapper>
        <IconWrapper bgColor={'red'} onClick={onDecline}>
          <Icon type={'hang_up'} width={32} height={32} color={'white'}/>
        </IconWrapper>
      </Wrapper>
    </CallWrapper>
  )
}