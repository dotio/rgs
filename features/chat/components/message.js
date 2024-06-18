import React, {memo} from 'react'
import {connect} from 'react-redux'
import {ChatBubble} from './chat-bubble'
import {ChatFileMessage} from './chat-file-message'
import {fileTypeUri} from '../helpers/filetype-uri'

const getFirstChar = (str) => str? str[0] : ''

const MessagePure = memo(({
  file,
  users,
  userId,
  time,
  text,
  contentAlign,
  isIncoming,
  photo,
  cancelUpload,
  clientMessageId,
  collapsed,
  addAndShowModal,
  alignMessage,
  name,
  surname,
  isWidget,
  searchText
}) => {
  const avatar = isIncoming? {
    src: photo,
    text: `${getFirstChar(name)}${getFirstChar(surname)}`,
    size: '24px',
    borderRadius: '24px',
  } : null

  const showImagePopup = () => {
    const arrTitle = file.title.split('.')
    const extension = arrTitle[arrTitle.length - 1].toLowerCase()

    switch (extension) {
      case 'jpeg':
      case 'png':
      case 'jpg':
      case 'gif':
        addAndShowModal({type: 'image', data: {url: file.url, title: arrTitle[0]}})
        break
      default:
        return null
    }
  }

  const getMessageInfo = () => {
    const currentUser = users[userId]
    const initials = currentUser && isIncoming? `${currentUser.firstName} ${currentUser.lastName}` : ''

    return {
      contentAlign,
      time,
      textColor: 'black50',
      text: initials,
      collapsed
    }
  }

  return (file && file.title ?
    <ChatFileMessage
      cancelFileUpload={() => cancelUpload && cancelUpload(clientMessageId)}
      onClick={showImagePopup}
      messageTheme={isIncoming ? (isWidget ?  'widget' : 'blue' ) : 'gray'}
      bgColor={'black05'}
      isWidget={isWidget}
      isIncoming={isIncoming}
      percentage={file.percentage}
      fullName={file.title}
      messageInfo={getMessageInfo()}
      href={file.url}
      iconImage={fileTypeUri(file.title)}
      avatar={avatar}
      collapsed={collapsed}
    /> :
    <ChatBubble
      justify={contentAlign}
      align={contentAlign}
      messageTheme={isIncoming? (isWidget ?  'widget' : 'blue' ): 'gray'}
      alignMessage={alignMessage}
      messageInfo={getMessageInfo()}
      avatar={avatar}
      collapsed={collapsed}
      searchText={searchText}
    >
      {text}
    </ChatBubble>
  )
})

const mapStateToProps = state => ({
  users: state.chat.users
})

const mapDispatchToProps = dispatch => ({
  addAndShowModal: (data) => dispatch.modal.addAndShowModal(data)
})

export const Message = connect(mapStateToProps, mapDispatchToProps)(MessagePure)