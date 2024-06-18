import React, {Fragment} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import moment from 'moment'
import {MessageService} from './message-service'
import {MessageIncoming} from './message-incoming'
import {getDateForChat} from '../../../helpers/date'

const checkMessagesDates = (firstMessage, secondMessage) => {
  const moreOneMinute = Math.abs(moment(firstMessage.insertDate).diff(moment(secondMessage.insertDate), 'seconds')) >= 60
  return moreOneMinute || (firstMessage.userId !== secondMessage.userId)
}


const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px;
  
  & > * + * {
      margin-top: 16px;
  };
`

const SearchMessagesWrapper = styled(Container)`
`

const SearchHover = styled.div`
  width: 100%;
  padding: 8px 0;
  cursor: pointer;
  &:hover {
    background: #F2F2F2;
    border-radius: 20px;
  }
`

export const SearchContainer = (props) => {
  const dispatch = useDispatch()
  const {searchMessages, users} = useSelector((state) => state.chat)
  const {search} = useSelector((state) => state.consultation.searchFilter)

  const onClickMessage = (message) => () => {
    dispatch.chat.fetchSearchHistory(message)
    dispatch.chat.clearSearchMessages()
  }

  const renderMessage = (message, index) => {
    const {router, isWidget, icons, fileIcons} = props
    const types = ['user', 'service']

    const key = message.id || message.clientMessageId
    const user = users[message.userId] || {}
    const date = moment(message.insertDate)
    const isConsultationRoute = router.pathname === '/consultation'
    const showDate = index === 0
      || date.format('YYYY-MM-DD') !== moment(searchMessages[index - 1].insertDate).format('YYYY-MM-DD')
    const collapsed = index === 0|| (checkMessagesDates(searchMessages[index - 1], searchMessages[index]) || types.includes(searchMessages[index - 1].type))

    let messageTheme = null
    if (message.type === 'message') {
      const {incomingMessageStyles, outgoingMessageStyles} = props
      messageTheme = message.sender === 'client' ? outgoingMessageStyles : incomingMessageStyles
    }

    return (
      <Fragment key={key}>
        {showDate && <MessageService isWidget={isWidget} message={{text: getDateForChat(date)}}/>}
        <SearchHover onClick={onClickMessage(message)}>
          <SearchMessagesWrapper>
            <MessageIncoming
              searchText={search}
              isConsultationRoute={isConsultationRoute && !isWidget }
              isWidget={isWidget}
              icons={icons}
              fileIcons={fileIcons}
              theme={messageTheme}
              message={message}
              user={user}
              collapsed={collapsed}
            />
          </SearchMessagesWrapper>
        </SearchHover>
      </Fragment>
    )
  }

  return (
    <SearchWrapper>
      {searchMessages.map(renderMessage)}
    </SearchWrapper>
  )
}