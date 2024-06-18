import React from 'react'
import styled, {css, withTheme} from 'styled-components'
import PropTypes from 'prop-types'
import {ChatFileProgressBar} from './chat-file-progress-bar'
import {Text} from '../../../ui/text'
import {Img} from '../../../ui/img'
import {ChatBubble, getTheme} from './chat-bubble'
import {ChatMessageContainer} from './chat-message-container'
import {getColor} from '../../../ui/helpers/getColor'

const ChatFileContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  max-width: 254px;
`

const FileBox = styled.a`
  cursor: default;
  text-decoration:none;
  box-sizing: content-box;
  ${(p) => p.pointer && css`
    cursor: pointer;
  `}
`

const Image = styled.img`
  background-size: cover;
  max-height: ${p => p.maxImageHeight};
  width: auto;
  max-width: 100%;
  cursor: pointer;
  border-radius: 16px;
  background-repeat: no-repeat;
  background-position: center;
`

class ChatFileMessagePure extends React.Component {

  get isLoading(){
    return this.props.percentage > 0 && this.props.percentage < 100
  }

  renderImageMessage = () => {
    const {href, fullName, onClick, maxImageHeight, theme, ...args} = this.props
    return <ChatMessageContainer border={`solid 1px ${getColor('coal2', theme)}`} width={'auto'} containerWidth={'auto'} {...args} padding={'0'} bgColor={'transparent'}>
      <Image
        src={href}
        alt={fullName}
        onClick={onClick}
        maxImageHeight={maxImageHeight}
      />
    </ChatMessageContainer>
  }

  renderFileMessage = () => {
    const {isWidget, href, percentage, cancelFileUpload, fullName, onClick, iconImage, messageTheme, isIncoming, ...args} = this.props
    const {textColor} = getTheme(messageTheme)

    return <ChatBubble width={'auto'} {...args} messageTheme={messageTheme} bgColor={isWidget ? (isIncoming ? 'transparent' : 'white') : (isIncoming ? 'transparent' : 'black05')} withBorder={isWidget || isIncoming}>
      <FileBox href={!this.isLoading && href} download={!this.isLoading} target={'_blank'} pointer={!this.isLoading}>
        <ChatFileContainer>
          {this.isLoading ? <ChatFileProgressBar percentage={percentage} padding={'4px'} handleClick={cancelFileUpload}/> :
            <Img src={iconImage} width={'24px'} height={'24px'} bgColor={'transparent'} onClick={onClick}/>}
          <Text padding={'0 0 0 8px'} color={textColor} breakWord ellipsis>{fullName}</Text>
        </ChatFileContainer>
      </FileBox>
    </ChatBubble>
  }

  render(){
    const arrTitle = this.props.fullName.split('.')
    const extension = arrTitle[arrTitle.length - 1].toLowerCase()
    let fileType = ''
    switch (extension) {
      case 'jpeg':
      case 'png':
      case 'jpg':
      case 'gif':
        fileType = 'image'
        break
      case 'xlsx':
      case 'xls':
        fileType = 'file-xls'
        break
      case 'docx':
      case 'doc':
        fileType = 'file-doc'
        break
      case 'pdf':
        fileType = 'file-pdf'
        break
      default:
        fileType = 'file-unknown'
        break
    }

    return (
      fileType === 'image' ?
        this.renderImageMessage() : this.renderFileMessage()
    )
  }
}

export const ChatFileMessage = withTheme(ChatFileMessagePure)

ChatFileMessage.propTypes = {
  href: PropTypes.string,
  percentage: PropTypes.number,
  fullName: PropTypes.string,
  onClick: PropTypes.func,
  maxImageHeight: PropTypes.string,
  maxImageWidth: PropTypes.string,
  cancelFileUpload: PropTypes.func,
  ...ChatBubble.propTypes,
}

ChatFileMessage.defaultProps = {
  onClick: () => {},
  cancelFileUpload: () => {},
  messageTheme: 'blue',
  maxImageHeight: '133px',
}

