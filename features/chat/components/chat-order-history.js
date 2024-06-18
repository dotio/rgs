import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import {MessageService} from './message-service'
import {MessageIncoming} from './message-incoming'
import {MessageOutgoing} from './message-outgoing'
import {MessageUser} from './message-user'
import {MessageAppointment} from './message-appointment'
import moment from 'moment'
import {getColor} from '../../../ui/helpers/getColor'
import {Container} from '../../../ui/grid/container'
import {MessageCall} from './message-call'
import {media} from '../../../helpers/media'
import {getDateForChat} from '../../../helpers/date'
import {Well} from '../../../ui/well'
import {CircleButton} from '../../../ui/circle-button'
import {Wrapper} from '../../../ui/wrapper'
import {Router} from '../../../routes'
import {MessageMedcard} from './message-medcard'
import {MessageOrderDetail} from './message-order-detail'
import {MessageDoctorDetail} from './message-doctor-detail'
import {MessageClinicDetail} from './message-clinic-detail'
import {MessagePayDetail} from './message-pay-detail'
import {MessageProduct, MessagePromocode} from './message-activation'
import {TemporaryMessage} from './message-temporary'

const ChatWell = styled(Well)`
  background-color: #fff;
  position: relative;
`

const ChatContainer = styled.div`
  height: ${p => p.height};
  display: flex;
  flex-direction: column;
  overflow: auto;
  
  ${p => !p.visible && p.isWidget && `
     display: none;
  `}

  ${(p) => p.isWidget && `
     position: absolute;
     right: 0;
     width: 316px;
     bottom: 0;
     background-color: ${getColor('bgChat', p.theme)};
     padding: 0;
     border-radius: 16px;
  `}
  
    ${(p) => p.isWidget && media.mobile`
      left: 0;
      width: 100%;
    `}
`

const MessagesWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-grow: 1;
  padding: 0 0 24px 6px;
  overflow: auto;
  flex-direction: column;

  ${p => !p.visible && `
    display: none;
  `}

  ${p => !p.isChatInited && `
    justify-content: flex-end;
    margin-bottom: 24px;
  `}
`

const MessageContainer = styled(Container)`
  & > * + * {
      margin-top: 16px;
  };
`

const checkMessagesDates = (firstMessage, secondMessage) => {
  const moreOneMinute = Math.abs(moment(firstMessage.insertDate).diff(moment(secondMessage.insertDate), 'seconds')) >= 60
  return moreOneMinute || (firstMessage.userId !== secondMessage.userId)
}

export class ChatOrderHistory extends Component {
  renderMessage = (message, index) => {
    const {isWidget} = this.props
    const types = ['user', 'service']

    const key = message.id || message.clientMessageId
    const {users, messages, fileIcons, icons} = this.props
    const user = users[message.userId] || {}
    const date = moment(message.insertDate)
    const showDate = index === 0 || date.format('YYYY-MM-DD') !== moment(messages[index - 1].insertDate).format('YYYY-MM-DD')
    const collapsed = index === 0 || (checkMessagesDates(messages[index - 1], messages[index]) || types.includes(messages[index - 1].type))

    const MessageComponent = ((message) => {
      switch (true) {
        case message.type === 'medcard_detail':
          return MessageMedcard
        case message.type === 'call':
          return MessageCall
        case message.type === 'appointment':
          return MessageAppointment
        case message.type === 'order_detail':
          return MessageOrderDetail
        case message.type === 'doctor_detail':
          return MessageDoctorDetail
        case message.type === 'clinic_detail':
          return MessageClinicDetail
        // case message.type === 'pay_detail':
        // case message.type === 'product_detail':
        case message.type === 'service':
          return MessageService
        case message.type === 'user':
          return MessageUser
        case message.type === 'pay_detail':
          return MessagePayDetail
        case message.sender === 'client':
          return MessageOutgoing
        case message.type === 'promocode_link':
          return MessagePromocode
        case message.type === 'product_link':
          return MessageProduct
        case message.type === 'notice':
          return TemporaryMessage
        default:
          return MessageIncoming
      }
    })(message)

    let messageTheme = null
    if (message.type === 'message') {
      const {incomingMessageStyles, outgoingMessageStyles} = this.props
      messageTheme = message.sender === 'client' ? outgoingMessageStyles : incomingMessageStyles
    }

    return (
      <Fragment key={key}>
        {showDate && <MessageService isWidget={isWidget} message={{text: getDateForChat(date)}}/>}
        <MessageComponent
          isConsultationRoute={false}
          isWidget={isWidget}
          icons={icons}
          fileIcons={fileIcons}
          theme={messageTheme}
          message={message}
          user={user}
          collapsed={collapsed}
        />
      </Fragment>
    )
  }

  render() {
    const {messages} = this.props
    return (
      <ChatWell padding={'24px 16px 10px'}>
        <Container>
          <Wrapper justify={'flex-start'} flow={'column'}>
            <CircleButton icon={'long_arrow_left'} onClick={() => Router.back()}/>
          </Wrapper>
          <ChatContainer
            height={'100%'}
            visible={true}
          >
            <MessagesWrapper
              visible={true}
            >
              <MessageContainer>
                {messages.map(this.renderMessage)}
              </MessageContainer>
            </MessagesWrapper>
          </ChatContainer>
        </Container>
      </ChatWell>
    )
  }
}