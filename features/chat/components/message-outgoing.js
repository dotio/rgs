import React, {memo} from 'react'
import {Message} from './message'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { media } from '../../../helpers/media'

const MessageOutgoingWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shrink: 0;
  width: calc(100% - 4px);
  ${p => !p.collapsed && `
    margin-top: 6px;
  `}
`

const MessageOutgoingContainer = styled.div`
  display: flex;
  width: ${p => p.isConsultationRoute ? '537px' : 'calc(100% - 4px)'};
  justify-content: flex-end;
  ${media.mobile`
    width: 87%;
  `}
`

const MessageOutgoingPure = memo(({message, cancelFileUpload, isConsultationRoute, ...props}) => {
  return (
    <MessageOutgoingWrapper collapsed={props.collapsed} justify={'flex-end'} shrink={'0'}>
      <MessageOutgoingContainer isConsultationRoute={isConsultationRoute}>
        <Message {...message} cancelUpload={cancelFileUpload} contentAlign={'flex-end'} alignMessage={'flex-end'} {...props}/>
      </MessageOutgoingContainer>
    </MessageOutgoingWrapper>
  )
})

const mapDispatchToProps = dispatch => ({
  cancelFileUpload: (clientMessageId) => dispatch.chat.cancelFileUpload(clientMessageId)
})

export const MessageOutgoing = connect(null, mapDispatchToProps)(MessageOutgoingPure)