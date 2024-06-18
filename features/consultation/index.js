import React, {Component} from 'react'
import styled, {css} from 'styled-components'
import {connect} from 'react-redux'
import {getColor} from '../../ui/helpers/getColor'
import {Text} from '../../ui/text'
import {Icon} from '../../ui/icon'
import {Chat} from '../chat'
import {MediaChat} from '../media-chat'
import {withRouter} from 'next/router'
import {getPubSub, subscriptionCreator} from '../../helpers/pubsub'
import {media, sizes} from '../../helpers/media'
import {setCookie, getCookie} from '../../helpers/cookie'
import {ControlSettings} from './components/control-settings'
import {SearchBlock} from './components/search-block'
import {T} from '../../utils/translation'
import {requestApi} from '../../lib/api'
import {Wrapper} from '../../ui/wrapper'
import {WEBRTC_ACTIVE_OFFER} from '../media-chat/constants'
import {CircleButton} from '../../ui/circle-button'

const ConsultationWrapper = styled(Wrapper)`
  border-radius: 20px;
  height: 100%;
  background-color: ${p => getColor(p.bgColor, p.theme)};
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
`

const ConsultationContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
`

const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 720px;
  margin: 0 auto;
  width: 100%;
  height: ${p => p.chatIsSmall ? '48px' : '80px'};
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  padding: ${p => p.chatIsSmall ? '0 12px' : '0'};

  ${p => p.isSearchBlock && css`
    ${media.mobile`
      display: none;
    `}
  `}

  ${media.mobile`
    height: 56px;
    padding: 0;
  `}
`

const SettingsIconWrapper = styled.div`
  position: absolute;
  display: flex;
  z-index: 200;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  left: 48px;
  bottom: 48px;

  ${media.mobile`
    display: none;
  `}
`

const TitleText = styled(Text)`
  ${media.mobile`
    font-size: 20px;
    line-height: 24px;
  `}
`

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    padding: 0 16px;
  `}
`

const SettingsWrapper = styled.div`
  display: flex;
  width: auto;
  cursor: pointer;
  & > * + * {
    margin-left: ${p => p.chatIsSmall ? '12px' : '20px'};
  };

  ${p => p.chatIsSmall && css`
    svg {
      width: 24px;
      height: 24px;
    }
  `}

  ${p => p.isModal && css`
    margin-right: 40px;
  `}

  ${media.mobile`
    svg {
      width: 24px;
      height: 24px;
    }
  `}
`
const ControlSettingsWrapper = styled.div`
  position: absolute;
  padding-top: 38px;
  right: 0;  
  ${media.mobile`
    display: none;
  `}
`
const MenuIcon = styled(Icon)`
    z-index: 1;
`

const StyledCircleButton = styled(CircleButton)`
  display: none;
  ${media.mobile`
    display: flex;
  `}
`

class ConsultationComponentPure extends Component {
  unsub = null

  constructor(props) {
    super(props)
    this.state = {
      screen: 'consultation',
      detailsType: null,
      onlySelected: false,
      errors: {},
      activeType: 'chat',
      apiSearch: false,
      showRtcLoader: false,
      isChatOpened: false
    }
  }

  componentDidMount() {
    this.setState({activeType: 'chat'})

    this.unsub = subscriptionCreator({
      'setActiveTab': this.setActiveTab,
    })

    window.addEventListener('resize', this.resizeListener)
    this.resizeListener()

    !this.props.hasUnreadMessages && this.props.mobileHideUnread()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeType !== prevState.activeType) {
      getPubSub().emit('consultationType', this.state.activeType)
    }

    if (this.props.connectionStatus !== prevProps.connectionStatus &&
      this.props.connectionStatus === WEBRTC_ACTIVE_OFFER
    ) {
      this.setState({showRtcLoader: false})
    }

    if (this.state.activeType !== prevState.activeType &&
      (this.state.activeType === 'video' || this.state.activeType === 'audio')
    ) {
      this.setState({showRtcLoader: false})
      this.initUserMedia()
    }
  }

  componentWillUnmount() {
    this.unsub && this.unsub()
    window.removeEventListener('resize', this.resizeListener)
  }

  onControlsClick = async (type) => {
    const {createOrGoToActive, showLoader, hideLoader, router} = this.props
    const chatIsSmall = router.pathname !== '/consultation'
    showLoader(chatIsSmall && 'right')
    await createOrGoToActive(type, true)
    await this.sendCall(type)
    hideLoader(chatIsSmall && 'right')

    this.setState({showRtcLoader: true})
  }

  createChat = async () => {
    const {createOrGoToActive, showLoader, hideLoader, router} = this.props
    const chatIsSmall = router.pathname !== '/consultation'
    showLoader(chatIsSmall && 'right')
    await createOrGoToActive('chat')
    hideLoader(chatIsSmall && 'right')
  }

  static get hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
  }

  initUserMedia = () => {
    const {addAndShowModal, deleteModal} = this.props

    if (!getCookie('isFirstTime') && this.hasGetUserMedia) {
      setCookie('isFirstTime', true, {path: '/'})
      addAndShowModal({type: 'access-camera'})
      navigator.mediaDevices.getUserMedia({video: true, audio: true}).then(() => {
        deleteModal()
      })
    }
  }

  sendCall = async (type) => {
    const {consultation} = this.props

    await requestApi('post', '/app/event', {
      event: `webrtc_incoming_${type}`,
      chatId: consultation.chat.id,
      consultationId: consultation.id
    })
  }

  settingsClick = () => {
    if (!this.props.mobile) {
      this.props.showSettingsBlock(!this.props.settingsBlock)
    } else {
      this.props.addAndShowModal({type: 'control-settings'})
    }
    this.props.showSearchBlock(false)
  }

  checkConnectionClick = () => {
    this.props.addAndShowModal({type: 'check-connection'})
  }

  setActiveTab = (activeType) => {
    this.setState({activeType})
  }

  resizeListener = () => {
    if (document.documentElement.clientWidth <= sizes.mobile) {
      if (this.props.mobile) {
        return
      }
      this.props.toggleMobile(true)
      if (this.props.settingsBlock) {
        this.props.addAndShowModal({type: 'control-settings'})
        this.props.showSearchBlock(false)
      }
    } else {
      if (!this.props.mobile) {
        return
      }
      this.props.toggleMobile(false)
      if (this.props.modalQueue.find(({type}) => type === 'control-settings')) {
        this.props.deleteModal()
        this.props.showSettingsBlock(true)
      }
      if (this.props.searchBlock && this.props.settingsBlock) {
        this.props.showSettingsBlock(false)
      }
    }
  }

  setChatCollapsed = (collapsed) => {
    this.setState({isChatOpened: !collapsed})
  }

  closeConsultationModal = () => {
    const {toggleConsultationModal, changeUnread} = this.props
    changeUnread(false)
    toggleConsultationModal(false)
  }

  render() {
    const {consultation, router, searchBlock, isModal} = this.props
    const {activeType, showRtcLoader, isChatOpened} = this.state

    const isChat = activeType === 'chat'
    const chatIsSmall = router.pathname !== '/consultation'

    return (
      <ConsultationWrapper
        bgColor={isChat ? 'white' : 'black'}
        chatIsSmall={chatIsSmall}
      >
        <ConsultationContainer>
          {isChat && <ControlsContainer chatIsSmall={chatIsSmall} isSearchBlock={this.props.searchBlock}>
            <TitleWrapper>
              {chatIsSmall && <Wrapper padding={'0 6px 0 0'} width={'auto'}><Icon type={'mk_menu'} height={24} width={24} color={'black40'}/></Wrapper>}
              <TitleText
                size={chatIsSmall ? '16px' : '28px'}
                lineHeight={chatIsSmall ? '24px' : '28px'}
                color={'black'}
              >
                <T ucFirst>consultation.main.title</T>
              </TitleText>
              <SettingsWrapper chatIsSmall={chatIsSmall} isModal={isModal}>
                <MenuIcon
                  onClick={() => this.onControlsClick('video')}
                  shrink={'0'}
                  type={'camera'}
                  height={32}
                  width={32}
                  color={'primary'}
                />
                <MenuIcon
                  onClick={() => this.onControlsClick('audio')}
                  shrink={'0'}
                  type={'microphone'}
                  height={32}
                  width={32}
                  color={'primary'}
                />
                {!chatIsSmall && isChat && <MenuIcon
                  onClick={this.settingsClick}
                  shrink={'0'}
                  type={'dots'}
                  height={32}
                  width={32}
                  color={'primary'}
                />}
                {this.props.settingsBlock && !chatIsSmall &&(
                  <ControlSettingsWrapper>
                    <ControlSettings chatIsSmall={chatIsSmall}/>
                  </ControlSettingsWrapper>
                )}
              </SettingsWrapper>
            </TitleWrapper>
            {isModal && <StyledCircleButton icon={'cross'} onClick={this.closeConsultationModal} zIndex={10001}/>}
          </ControlsContainer>}
          {searchBlock && !chatIsSmall && <SearchBlock onCloseClick={() => this.props.showSearchBlock(false)}/>}
          {!isChat && !chatIsSmall && (
            <SettingsIconWrapper onClick={this.checkConnectionClick}>
              <Icon type={'settings'} shrink={'0'} height={32} width={32} color={'white'} cursor={'pointer'}/>
            </SettingsIconWrapper>
          )}
          {consultation.id && <MediaChat
            chatIsSmall={chatIsSmall}
            activeType={activeType}
            webrtcRoom={consultation.room}
            changeRtcLoader={(value) => this.setState({showRtcLoader: value})}
            onCreate={this.startConsultation}
            onOpenChatClicked={() => {this.setChatCollapsed(false)}}
            isChatOpened={isChatOpened}
          />}
          <Chat
            sendCall={this.sendCall}
            visible={isChatOpened}
            isOpened={isChatOpened}
            activeType={activeType}
            showRtcLoader={showRtcLoader}
            hideRtcLoader={() => this.setState({showRtcLoader: false})}
            onCreate={this.createChat}
            sendEvent={this.sendEvent}
            onCollapseChatClicked={() => {this.setChatCollapsed(isChatOpened)}}
          />
        </ConsultationContainer>
      </ConsultationWrapper>
    )
  }
}

const mapStateToProps = state => ({
  consultation: state.consultation.current || {},
  isLoading: state.loaders.right,
  searchBlock: state.consultation.searchBlock,
  currentModal: state.modal.current,
  modalQueue: state.modal.queue,
  settingsBlock: state.consultation.settingsBlock,
  mobile: state.consultation.mobile,
  connectionStatus: state.mediachat.connectionStatus,
  hasUnreadMessages: state.mediachat.hasUnreadMessages,
})

const mapDispatchToProps = dispatch => ({
  addAndShowModal: (type, data) => dispatch.modal.addAndShowModal(type, data),
  changeConsultation: (path, value) => dispatch.consultation.change(path, value),
  saveConsultation: () => dispatch.consultation.saveConsultation(),
  createConsultation: (type) => dispatch.consultation.create({connectionType: type}),
  getActiveConsultation: () => dispatch.consultation.getActiveConsultation(),
  createOrGoToActive: (type, redirect) => dispatch.consultation.createOrGoToActive({type, redirect}),
  deleteModal: () => dispatch.modal.deleteModal(),
  deleteAllModals: () => dispatch.modal.deleteAllModals(),
  showSettingsBlock: (value) => dispatch.consultation.showSettingsBlock(value),
  showSearchBlock: (value) => dispatch.consultation.showSearchBlock(value),
  toggleMobile: (value) => dispatch.consultation.toggleMobile(value),
  showLoader: (type) => dispatch.loaders.showLoader(type),
  hideLoader: (type) => dispatch.loaders.hideLoader(type),
  mobileHideUnread: () => dispatch.mediachat.changeUnread(false),
  toggleConsultationModal: (value) => dispatch.router.toggleConsultationModal(value),
  changeUnread: (value) => dispatch.mediachat.changeUnread(value),
})

export const Consultation = connect(mapStateToProps, mapDispatchToProps)(withRouter(ConsultationComponentPure))