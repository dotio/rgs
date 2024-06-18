import React from 'react'
import styled from 'styled-components'
import {ResizableTextarea} from '../../../ui/resizable-textarea'
import {Icon} from '../../../ui/icon'
import PropTypes from 'prop-types'
import {getColor} from '../../../ui/helpers/getColor'
import {subscriptionCreator} from '../../../helpers/pubsub'
import {media} from '../../../helpers/media'

const FileInput = styled.input.attrs({type: 'file'})`
  display: none;
`

const ChatInputContainer = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  align-items: center;
  min-height: 56px;
  padding: 0 6px;
  
  ${p => !p.isChat && !p.isShow && media.mobile`
    display: none;
  `}
  
  ${p => p.isChat && media.mobile`
    padding: 0;
  `}
 `

const typingStatus = {
  START: 'start',
  STOP: 'stop'
}

const FileContainer = styled.div`
  display: flex;
  width: auto;
  padding: 6px;
  background-color: ${p => getColor(p.isChat ? 'black05' : 'black50', p.theme)};
  height: auto;
  border-radius: 50%;
  color: transparent;
`

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 21px;
  padding: 7px 12px 9px 12px;
`

const SendContainer = styled.div`
  display: flex;
  color: transparent;
  width: auto;
  height: auto;
`

export class ChatInput extends React.Component {
  unsub = null

  state = {
    message: this.props.value,
  }

  componentDidMount() {
    this.unsub = subscriptionCreator({
      'mediaFileSend': this.onMediaFileSend
    })
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
  }

  onMediaFileSend = () => {
    this.fileInput.click()
  }

  onKeyDown = (e) => {
    const {onKeyDown, onEnter, sendTypingStatus} = this.props
    onKeyDown && onKeyDown(e)
    if (e.key === 'Enter') {
      if (e.ctrlKey) {
        const caretStartPosition = e.target.selectionStart
        const caretEndPosition = e.target.selectionEnd
        const {message} = this.state
        const rangeMessage = caretEndPosition === caretStartPosition ? message : message.substring(0, caretStartPosition) + message.substring(caretEndPosition, message.length)
        const enteredMessage = rangeMessage.substring(0, caretStartPosition) + '\n' + rangeMessage.substring(caretStartPosition, message.length)

        this.setState({message: enteredMessage}, () => {
          if (rangeMessage.substring(caretStartPosition, message.length)) {
            this.textarea.selectionStart = caretStartPosition + 1
            this.textarea.selectionEnd = caretStartPosition + 1
          }
        })
      } else {
        sendTypingStatus && sendTypingStatus(typingStatus.STOP)
        onEnter && onEnter(e)
        this.setState({message: ''})
        e.preventDefault()
        return false
      }
    }
  }

  onClickSend = () => {
    this.props.onClick(this.state.message)
    this.setState({message: ''})
  }

  onChange = (message) => {
    const {onChange, sendTypingStatus} = this.props
    message && sendTypingStatus && sendTypingStatus(typingStatus.START)
    onChange && onChange(message)
    this.setState({message})
  }

  onFileIconClick = (e) => {
    e.stopPropagation()
    this.fileInput.click()
  }

  onFileChange = (e) => {
    const {onFileChange, getPreview} = this.props

    let file = e.target.files[0]
    onFileChange(file)
    e.target.value = ''

    if (file && file.type.match('image.*')) {
      getPreview && getPreview(URL.createObjectURL(file))
    }
  }

  render() {
    const {
      inputPlaceholder,
      onResize,
      isWidget,
      activeType,
      isShow,
      onFocusInput,
    } = this.props
    const {message} = this.state
    const isChat = activeType === 'chat'

    return (
      <ChatInputContainer isShow={isShow} isChat={isChat}>
        <FileContainer
          isChat={isChat}
          onClick={this.onFileIconClick}
        >
          <FileInput ref={node => this.fileInput = node} onChange={this.onFileChange}/>
          <Icon
            height={24}
            width={24}
            type={'clip'}
            color={isChat ? 'black40' : 'white'}
          />
        </FileContainer>
        <InputContainer>
          <ResizableTextarea
            size={'16px'}
            color={isWidget ? 'white' : 'black'}
            borderSize={'0px'}
            padding={'0px'}
            background={'transparent'}
            placeholder={inputPlaceholder}
            onFocus={onFocusInput}
            onChange={(e) => this.onChange(e.target.value)}
            value={message}
            onKeyDown={this.onKeyDown}
            onResize={onResize}
            ref={node => this.textarea = node}
          />
        </InputContainer>
        <SendContainer onClick={this.onClickSend}>
          <Icon
            height={24}
            width={24}
            type={'send'}
            color={message ? 'primary' : 'black40'}
          />
        </SendContainer>
      </ChatInputContainer>
    )
  }
}

ChatInput.propTypes = {
  onChange: PropTypes.func,
  onResize: PropTypes.func,
  onKeyDown: PropTypes.func,
  onEnter: PropTypes.func,
  emptyMessageButton: PropTypes.shape({
    icon: PropTypes.string,
    onClick: PropTypes.func,
  }),
  value: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  attachImage: PropTypes.object,
  sendImage: PropTypes.object,
}

ChatInput.defaultProps = {
  onChange: () => {},
  onFileChange: () => {},
  value: '',
  inputPlaceholder: 'Сообщение...'
}