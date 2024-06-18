import {ChatMessageContainer} from './chat-message-container'
import PropTypes from 'prop-types'
import React from 'react'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'

const ColoredText = styled(Text)`
  span {
    color: ${p => getColor('primary', p.theme)};
    font-weight: bold;
  }
`

export const defaultChatBubbleThemes = {
  'blue': {
    textColor: 'black',
    backgroundColor: 'white',
    withBorder: true,
    borderColor: 'black15',
  },
  'gray': {
    textColor: 'black',
    backgroundColor: 'black05',
  },
  'widget': {
    textColor: 'white',
    backgroundColor: 'transparent',
    withBorder: true,
    borderColor: 'black50',
  },
}

export const getTheme = (messageTheme) => {
  if (typeof messageTheme === 'object') {
    return messageTheme || {}
  } else {
    return defaultChatBubbleThemes[messageTheme] || {}
  }
}

export const ChatBubble = (props) => {
  const {children, messageTheme, searchText} = props
  const {textColor, backgroundColor, withBorder} = getTheme(messageTheme)

  const currentText = () => {
    const lowerChildren = children.toLowerCase()
    const lowerSearch = searchText && searchText.toLowerCase()

    if(searchText && lowerChildren.includes(lowerSearch)) {
      const start = lowerChildren.indexOf(lowerSearch)
      const end = start + searchText.length

      const text = children.slice(0, start) + '<span>' + children.slice(start, end) +  '</span>'  + children.slice(end, children.length)

      return (
        <ColoredText dangerouslySetInnerHTML={{__html: text}}/>
      )
    }

    return (
      <Text color={textColor} breakWord whiteSpace={'pre-wrap'}>
        {children}
      </Text>
    )
  }

  return (
    <ChatMessageContainer bgColor={backgroundColor} withBorder={withBorder} padding={'11px 15px'} align={'center'} {...props}>
      {typeof children === 'string' ? currentText() : children}
    </ChatMessageContainer>)
}

ChatBubble.propTypes = {
  messageTheme: PropTypes.oneOfType([
    PropTypes.oneOf(['blue', 'gray']),
    PropTypes.shape({
      textColor: PropTypes.string,
      backgroundColor: PropTypes.string,
    })
  ]),
  ...ChatMessageContainer.propTypes,
}

ChatBubble.defaultProps = {
  messageTheme: 'blue',
}