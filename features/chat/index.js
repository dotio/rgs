import React, {Component, Fragment} from 'react'
import {ChatInput} from './components/chat-input'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {MessageService} from './components/message-service'
import {MessageIncoming} from './components/message-incoming'
import {MessageOutgoing} from './components/message-outgoing'
import {MessageUser} from './components/message-user'
import {MessageAppointment} from './components/message-appointment'
import {withRouter} from 'next/router'
import {ServiceMessageChat, ServiceUserChat} from './mocks'
import {ChatLoader} from './components/chat-loader'
import {ChatRtcLoader} from './components/chat-rtc-loader'
import {ChatRtcButtons} from './components/chat-rtc-buttons'
import moment from 'moment'
import {Text} from '../../ui/text'
import {Container} from '../../ui/grid/container'
import {MessageCall} from './components/message-call'
import {CONSULTATION_STATUSES} from '../../ui/helpers/consultation-statuses'
import {media} from '../../helpers/media'
import {T} from '../../utils/translation'
import {WEBRTC_ACTIVE_OFFER} from '../media-chat/constants'
import {getDateForChat} from '../../helpers/date'
import {MessageChooseMedcard} from './components/order/message-choose-medcard'
import {ConsultationRepository} from '../consultation/repository'
import {subscriptionCreator} from '../../helpers/websocket'
import {container} from '../../helpers/container'
import {MessageChooseType} from './components/order/message-choose-type'
import {MessageMedcard} from './components/message-medcard'
import {MessagePayDetail} from './components/message-pay-detail'
import {MessageOrderDetail} from './components/message-order-detail'
import {MessageDoctorDetail} from './components/message-doctor-detail'
import {MessageClinicDetail} from './components/message-clinic-detail'
import {MessageProduct, MessagePromocode} from './components/message-activation'
import {TemporaryMessage} from './components/message-temporary'
import {SearchContainer} from './components/search-container'
import {Icon} from '../../ui/icon'
import {GTM} from '../../general/gtm'

const ChatContainer = styled.div`
  height: ${p => p.height};
  display: flex;
  flex-direction: column;
  overflow: auto;
  
  ${p => !p.visible && p.isWidget && `
     display: none;
  `}

  ${(p) => p.isWidget && `
     z-index: 999;
     position: absolute;
     right: 0;
     width: 316px;
     bottom: 0;
     background: #262626;
     backdrop-filter: blur(10px);
     padding: 0;
     border-radius: 16px;
  `}
  
  ${(p) => p.isWidget && media.mobile`
    left: 0;
    width: 100%;
  `}
`

const CollapseWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 12px 14px 12px 0;
  
  ${(p) => !p.isOpened && media.mobile`
    display: none;
  `}
`

const MessagesWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 0;
  flex-grow: 1;
  padding: 0 0 24px;
  overflow: auto;
  flex-direction: column;
  flex-flow: column nowrap;
  
  & > :first-child {
    margin-top: auto !important;
  }

  ${p => !p.visible && `
    display: none;
  `}

  ${media.mobile`
    padding-bottom: 16px;
    margin-bottom: 0;
  `}
`

const MessageContainer = styled(Container)`

  ${p => p.chatIsSmall && `
    padding: 0 12px;
  `}

  & > * + * {
      margin-top: 16px;
  };
`

const StartConsultationWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  cursor: pointer;
  padding: 16px;
`

const InputStyledContainer = styled(Container)`
  ${media.mobile`
    padding: 0 16px 0 10px;
  `}
`

const checkMessagesDates = (firstMessage, secondMessage) => {
  const moreOneMinute = Math.abs(moment(firstMessage.insertDate).diff(moment(secondMessage.insertDate), 'seconds')) >= 60

  return moreOneMinute || (firstMessage.userId !== secondMessage.userId)
}

export class ChatPure extends Component {
  constructor(props) {
    super(props)
    this.scrollBottom = true //нужно ли скролить вниз
    this.scrollTopHeight = null

    this.state = {
      flowControls: {
        showMedcard: false,
        showConnectionType: false
      }
    }
  }

  async componentDidMount() {
    const {chatId, loggedIn} = this.props
    if (chatId) {
      this.props.initChat(chatId, true)
    } else {
      !loggedIn && this.addServiceMockMessage()
    }

    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    this.scrollTopHeight = this.messagesContainer.scrollHeight
    this.messagesContainer.addEventListener('scroll', this.onChatScroll)
    this.subscribeToEvents()
  }

  async componentDidUpdate(prevProps) {
    const {fromSearch, showRtcLoader, messages, isLoadingMessages, chatId, endChat, resetChat, initChat, activeType, lastChatId, consultation, loggedIn, getHistoryBeforeChat, router} = this.props
    if (this.scrollBottom && !fromSearch) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    if(prevProps.showRtcLoader !== showRtcLoader) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    if (prevProps.messages.length < messages.length && !isLoadingMessages) {
      this.scrollBottom = true
      router.pathname.includes('consultation') && activeType !== 'video' && this.props.setChangeUnread(false)
    }

    if (prevProps.chatId !== chatId && chatId) {
      await endChat()
      await resetChat()
      initChat(chatId, true)
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
      this.messagesContainer.removeEventListener('scroll', this.onChatScroll)
      this.messagesContainer.addEventListener('scroll', this.onChatScroll)
      this.subscribeToEvents()
    }

    if (prevProps.activeType !== activeType) {
      this.setState({isOpened: false})
    }

    if (!consultation && prevProps.lastChatId !== lastChatId) {
      if(loggedIn){
        const result = getHistoryBeforeChat(lastChatId)
        result === 0 && this.addServiceMockMessage()
      } else {
        this.addServiceMockMessage()
      }
    }

    if(consultation === null){
      this.props.setToggleBottomTemplate(true)
    }
  }

  async componentWillUnmount() {
    this.messagesContainer.removeEventListener('scroll', this.onChatScroll)
    await this.props.endChat()
    this.unsubscribe && this.unsubscribe()
    this.props.setToggleBottomTemplate(true)
  }

  subscribeToEvents = () => {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
    this.unsubscribe = subscriptionCreator({
      'select-medcard': this.onSelectMedcard,
      'selectConnectionType': this.onSelectConnectionType,
      'incoming-reject': this.props.hideRtcLoader,
    }, container.get('ws'))
  }

  onSend = (value) => {
    if (value) {
      this.scrollBottom = true
      this.props.sendMessage(value)
      this.props.setToggleBottomTemplate(true)
    }
  }

  handleChangeFlowControls = (type, value) => {
    this.setState(({flowControls}) => ({flowControls: {...flowControls, [type]: value}}))
  }

  onSelectMedcard = () => {
    this.handleChangeFlowControls('showMedcard', true)
  }

  onSelectConnectionType = () => {
    this.handleChangeFlowControls('showConnectionType', true)
    GTM.pushEvent({
      event: 'transferToDoctor'
    })
  }

  selectMedcard = async (selectedMedcard) => {
    const {id} = this.props.consultation

    try {
      await ConsultationRepository.selectMedcard(id, selectedMedcard)
      this.handleChangeFlowControls('showMedcard', false)
    } catch (e) {

    }
  }

  selectConnectionType = () => {
    this.handleChangeFlowControls('showConnectionType', false)
  }

  onInputResize = () => {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
  }

  onFileChange = async (data) => {
    const arrTitle = data.name.split('.')
    const extension = arrTitle[arrTitle.length - 1].toLowerCase()
    const allowedTypes = ['jpg', 'jpeg', 'gif', 'png', 'doc', 'docx', 'txt', 'xls', 'xlsx', 'xlsm', 'pdf']
    const mBytes = data.size / 1024 / 1024

    if (data.name.length <= 255 && allowedTypes.includes(extension) && mBytes <= 50) {
      this.scrollBottom = true
      await this.props.sendFile(data)
      this.onInputResize()
    }
  }

  onEnterSend = (e) => {
    this.onSend(e.currentTarget.value)
  }

  addServiceMockMessage = () => {
    const {pushMessages} = this.props
    pushMessages([ServiceMessageChat], [ServiceUserChat])
  }

  onChatScroll = () => {
    const {searchMessages, consultation, chatIdForHistory} = this.props
    if(!consultation && chatIdForHistory) {
      if (this.scrollTopHeight > this.messagesContainer.scrollTop) {
        if (this.messagesContainer.scrollTop < 300
          && ((!this.scrollTopHeight && this.scrollTopHeight !== 0) || this.scrollTopHeight > this.messagesContainer.scrollTop)
        ) {
          const prevScrollHeight = this.messagesContainer.scrollHeight
          this.props.getPrevMessages && this.props.getPrevMessages().then(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollTop + this.messagesContainer.scrollHeight - prevScrollHeight
            this.scrollTopHeight = this.messagesContainer.scrollTop
          })
        } else {
          this.scrollTopHeight = this.messagesContainer.scrollTop
        }
      }
    }
    if (consultation && !searchMessages.length) {
      if (this.scrollTopHeight > this.messagesContainer.scrollTop) {
        if (this.messagesContainer.scrollTop < 300
          && ((!this.scrollTopHeight && this.scrollTopHeight !== 0) || this.scrollTopHeight > this.messagesContainer.scrollTop)
        ) {
          const prevScrollHeight = this.messagesContainer.scrollHeight
          this.props.getPrevMessages && this.props.getPrevMessages().then(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollTop + this.messagesContainer.scrollHeight - prevScrollHeight
            this.scrollTopHeight = this.messagesContainer.scrollTop
          })
        } else {
          this.scrollTopHeight = this.messagesContainer.scrollTop
        }
      } else {
        if (
          ((this.messagesContainer.scrollTop + this.messagesContainer.getBoundingClientRect().height) === this.messagesContainer.scrollHeight)
          && this.scrollTopHeight < this.messagesContainer.scrollTop
        ) {
          const prevScrollHeight = this.messagesContainer.scrollHeight
          this.props.getNextMessages && this.props.getNextMessages().then(() => {
            this.messagesContainer.scrollTop = this.messagesContainer.scrollTop + this.messagesContainer.scrollHeight - prevScrollHeight
            this.scrollTopHeight = this.messagesContainer.scrollTop
          })
        }
      }
    }

    this.scrollBottom = this.messagesContainer.scrollTop + this.messagesContainer.offsetHeight === this.messagesContainer.scrollHeight
  }

  showTabbar = () => {
    this.props.setToggleBottomTemplate(true)
  }

  renderMessage = (message, index) => {
    const {router, activeType} = this.props
    const types = ['user', 'service']

    const key = message.id || message.clientMessageId
    const {users, messages, fileIcons, icons} = this.props
    const user = users[message.userId] || {}
    const date = moment(message.insertDate)
    const isWidget = activeType !== 'chat'
    const isConsultationRoute = router.pathname === '/consultation'
    const showDate = index === 0
      || date.format('YYYY-MM-DD') !== moment(messages[index - 1].insertDate).format('YYYY-MM-DD')
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
        case message.type === 'notice':
          return TemporaryMessage
        case message.sender === 'client':
          return MessageOutgoing
        case message.type === 'promocode_link':
          return MessagePromocode
        case message.type === 'product_link':
          return MessageProduct
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
          isConsultationRoute={isConsultationRoute && !isWidget}
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

  onAcceptStatus = async (status) => {
    await this.props.setAcceptStatus(status)
    this.scrollBottom = true
  }

  get isConsultationChat() {
    const {connectionType} = this.props.consultation

    return connectionType === 'chat'
  }

  renderLoader() {
    const {consultation, showRtcLoader, callType} = this.props
    const isChat = callType === 'chat'

    const isWaitingForDoctor = consultation && consultation.status && CONSULTATION_STATUSES[consultation.status.code].id === 4
    const isStatusWaiting = consultation && consultation.status && consultation.id && CONSULTATION_STATUSES[consultation.status.code].id < 3 || isWaitingForDoctor

    return (
      <>
        {consultation && isChat && isStatusWaiting && this.isConsultationChat && !showRtcLoader && <ChatLoader isWaitingForDoctor={isWaitingForDoctor}/>}
        {showRtcLoader && <ChatRtcLoader isWaitingForDoctor={isWaitingForDoctor} onRendered={() => this.scrollBottom = true}/>}
      </>
    )
  }

  handleFocusInput = () =>{
    this.props.setToggleBottomTemplate(false)
  }

  render() {
    const {sendCall, searchMessages, messages, router, chatId, onCollapseChatClicked, fileIcons, icons, incomingMessageStyles, outgoingMessageStyles, onCreate, activeType, connectionStatus, callType, isOpened} = this.props
    const {flowControls} = this.state
    const {showMedcard, showConnectionType} = flowControls
    const chatIsSmall = router.pathname !== '/consultation'
    const isWidget = activeType !== 'chat'

    return (
      <ChatContainer
        height={isOpened || !isWidget ? '100%' : 'auto'}
        isWidget={isWidget}
        visible={!!chatId}
      >

        {isWidget && (
          <CollapseWrapper isOpened={isOpened} onClick={onCollapseChatClicked}>
            <Text padding={'0 10px 0 0'} color={'white'} align={'right'}>
              {isOpened ? <T ucFirst>chat.main.hide</T> : <T ucFirst>chat.main.open</T>}
            </Text>
            <Icon shrink={'0'} width={20} height={20} type={isOpened ? 'bg_arrow_down' : 'bg_arrow_top'} color={'white'}/>
          </CollapseWrapper>
        )}

        <MessagesWrapper
          isWidget={isWidget}
          chatIsSmall={chatIsSmall}
          ref={node => this.messagesContainer = node}
          visible={!isWidget || isOpened}
          onClick={this.showTabbar}
        >
          {!searchMessages.length && (
            <MessageContainer chatIsSmall={chatIsSmall}>
              {(isOpened || !isWidget) && messages.map(this.renderMessage)}
              {this.renderLoader()}
              {connectionStatus === WEBRTC_ACTIVE_OFFER && callType !== 'chat' && !showConnectionType && (
                <ChatRtcButtons
                  onRendered={() => this.scrollBottom = true}
                  setAcceptStatus={this.onAcceptStatus}
                  type={callType}
                />
              )}
              {showMedcard && (
                <MessageChooseMedcard
                  onClickContinue={this.selectMedcard}
                  chatIsSmall={chatIsSmall}
                  isWidget={isWidget}
                  onRendered={() => this.scrollBottom = true}
                />
              )}
              {showConnectionType && (
                <MessageChooseType selectConnectionType={this.selectConnectionType} sendCall={sendCall} />
              )}
            </MessageContainer>
          )}
          {searchMessages.length > 0 && <SearchContainer
            fileIcons={fileIcons}
            icons={icons}
            isWidget={isWidget}
            router={router}
            outgoingMessageStyles={outgoingMessageStyles}
            incomingMessageStyles={incomingMessageStyles}
          />}
        </MessagesWrapper>
        {!searchMessages.length && <InputStyledContainer>
          {chatId ?
            <ChatInput
              isWidget={isWidget}
              onEnter={this.onEnterSend}
              onClick={this.onSend}
              isShow={isOpened}
              onFocusInput={this.handleFocusInput}
              onFileChange={this.onFileChange}
              onResize={this.onInputResize}
              activeType={activeType}
            /> : !isWidget ?
              <StartConsultationWrapper onClick={onCreate}>
                <Text align={'center'} size={'16px'} lineHeight={'24px'} color={'primary'}><T ucFirst>chat.main.button.begin</T></Text>
              </StartConsultationWrapper> :
              null
          }
        </InputStyledContainer>}
      </ChatContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  consultation: Object.keys(state.consultation.current).length > 0 ? state.consultation.current : null,
  chatId: Object.keys(state.consultation.current).length > 0 ? state.consultation.current.chat.id : 0,
  chatIdForHistory: state.user.lastChatId,
  connectionStatus: state.mediachat.connectionStatus,
  messages: state.chat.messages,
  users: state.chat.users,
  fromSearch: state.chat.fromSearch,
  callType: state.mediachat.type,
  isLoading: !state.router.isLoading && !state.loaders.global && state.chat.isLoading,
  isLoadingMessages: state.chat.isLoadingMessages,
  isError: state.chat.isError,
  errorMessage: state.chat.errorMessage,
  searchMessages: state.chat.searchMessages,
  loggedIn: state.login.loggedIn,
  lastChatId: state.user.lastChatId,
})

const mapDispatchToProps = dispatch => ({
  sendMessage: (text) => dispatch.chat.sendMessage(text),
  sendFile: (file) => dispatch.chat.sendFile(file),
  getPrevMessages: () => dispatch.chat.getPrevMessages(),
  getNextMessages: () => dispatch.chat.getNextMessages(),
  initChat: (chatId, force) => dispatch.chat.initChat({chatId, force}),
  endChat: () => dispatch.chat.endChat(),
  resetChat: () => dispatch.chat.reset(),
  pushMessages: (messages, users) => dispatch.chat.pushMessages(messages, users),
  setAcceptStatus: (status) => dispatch.mediachat.setAcceptStatus(status),
  getHistoryBeforeChat: (chatId) => dispatch.chat.getHistoryBeforeChat(chatId),
  setToggleBottomTemplate: (value) => dispatch.router.toggleBottomTemplate(value),
  setChangeUnread: (value) => dispatch.mediachat.changeUnread(value),
})

export const Chat = connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatPure))