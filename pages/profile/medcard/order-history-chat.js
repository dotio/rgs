import React, {Component} from 'react'
import {ChatOrderHistory} from '../../../features/chat/components/chat-order-history'
import {Wrapper} from '../../../ui/wrapper'

export class ChatHistory extends Component {
  render() {
    const {messages, users, backUrl} = this.props
    return (
      <Wrapper>
        <ChatOrderHistory messages={messages} users={users} backUrl={backUrl}/>
      </Wrapper>
    )
  }
}

ChatHistory.getInitialProps = async (ctx) => {
  const {reduxStore, query} = ctx

  const promises = [
    reduxStore.dispatch.chat.getHistoryMessages({id: query.chatId, onlyOneChat: 1}),
  ]

  await Promise.all(promises)

  return {
    messages: reduxStore.getState().chat.historyMessages,
    users: reduxStore.getState().chat.usersHistory,
    backUrl: query.backUrl ? query.backUrl : '/profile/medcard/orders',
  }
}

export default ChatHistory