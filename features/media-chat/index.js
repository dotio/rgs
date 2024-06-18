import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import SimpleWebRTC from 'simplewebrtc-fork'
import {getCookie} from '../../helpers/cookie'
import {VideoChat} from './video-chat'
import {getConfig} from '../../helpers/config'
import styled, {css} from 'styled-components'
import {WEBRTC_ACTIVE_OFFER, WEBRTC_STATUS_DISCONNECTED, WEBRTC_STATUS_CONNECTING, WEBRTC_STATUS_CONNECTED} from './constants'
import {forEachObjIndexed} from 'ramda'
import {Text} from '../../ui/text'
import {Button} from '../../ui/button'
import {Icon} from '../../ui/icon'
import {getColor} from '../../ui/helpers/getColor'
import {media} from '../../helpers/media'
import {Wrapper} from '../../ui/wrapper'
import {formatDuration} from '../../helpers/duration/format-duration'
import {subscriptionCreator as WsSubscriptionCreator} from '../../helpers/websocket'
import {container} from '../../helpers/container'
import {T} from '../../utils/translation'
import {requestApi} from '../../lib/api'
import {getPubSub} from '../../helpers/pubsub'
import {Router} from '../../routes'
import {isMobile} from 'react-device-detect'
import {Avatar} from '../../ui/avatar'
import {CONSULTATION_STATUSES} from '../../ui/helpers/consultation-statuses'

const {WEBRTC_URL} = getConfig().publicRuntimeConfig

const MediaChatContainer = styled.div`
  display: flex;
  border-radius: 16px;
  position: ${p => p.isChatOpened && p.chatIsSmall ? 'absolute' : 'relative'};
  flex-direction: column;
  width: ${p => p.isChatOpened && p.chatIsSmall ? '120px' : '100%'};
  height: ${p => p.isChatOpened && p.chatIsSmall ? '80px' : '100%'};
  justify-content: center;
  background: ${p => p.isChatOpened && p.chatIsSmall ? 'transparent' : 'linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%), #191919'};
  backdrop-filter: blur(10px);
  padding: ${p => p.chatIsSmall ? '0 6px' : '0'};
  ${(p) => !p.visible && `
    display: none;
  `}
  
  ${p => p.isChatOpened && p.chatIsSmall && css`
    z-index: 100000;
    background: transparent;
    right: 12px;
    top: 50px;
    position: absolute;
  `}
  
  
  ${p => p.isChatOpened && media.mobile`
    z-index: 100000;
    background: transparent;
    width: 90px;
    height: 154px;
    right: 12px;
    top: 50px;
    position: absolute;
  `}
`


const FullNameDoctor = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

export const DoctorInfoWrapper = styled(Wrapper)`
  position: absolute;
  left: 16px;
  top: 12px;
  z-index: 5;
  
  ${p => p.isChatOpened && p.chatIsSmall && css`
    display: none;
  `}
  
  ${p => p.isChatOpened && media.mobile`
    display: none;
  `}
`

const StartConsultationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  position: absolute;
  & > * + * {
      margin-top: 16px;
  };
`

const MediaControls = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  bottom: ${p => p.isWidget && p.chatIsSmall ? '112px' : '24px'};
  left: 0;
  right: 0;
  justify-content: center;
  & > * + * {
      margin-left: ${p => p.chatIsSmall ? '12px' : '20px'};
  };
  
  ${media.mobile`
    bottom: 12px;
     
    & > * + * {
      margin-left: 12px;
    };
  `}
  ${p => p.isChatOpened && p.chatIsSmall && css`
    display: none;
  `}
  
  ${p => p.isChatOpened && media.mobile`
    display: none;
  `}
`

const ControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${p => getColor(p.bgColor, p.theme)};
  padding: 12px;
  cursor: pointer;
  
  ${p => p.isSettings && !p.chatIsSmall && `
    display: none;
  `}
  
  ${p => p.isSettings && media.mobile`
    display: flex;
  `}
`

const ChatControlWrapper = styled(ControlWrapper)`
  position: relative;
  display: none;
  
  ${media.mobile`
    display: flex;
  `}
`
const ChatUnreadBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  border-radius: 100px;
  width: 8px;
  height: 8px;
  background-color: ${p => getColor('dangerousRed', p.theme)};
`

const DoctorPhotoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`


export class MediaChatPure extends PureComponent {
  constructor(props) {
    super(props)
    this.webrtc = null
    this.interval = null
    this.connected = false
    this.state = {
      remoteStream: null,
      duration: 0,
      startTime: 0,
      isInit: false,
      onlyAudio: false,
      videoMuted: false,
      audioMuted: false,
      ignoreOffer: false,
    }
  }

  componentDidMount() {
    this.unsubscribe = WsSubscriptionCreator({
      'consultationUpdate': this.updateConsultation,
    }, container.get('ws'))

    if (this.props.webrtcRoom) {
      this.initWebRtc()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.webrtcRoom !== this.props.webrtcRoom) {
      this.initWebRtc()
    }

    if ((prevProps.acceptStatus !== this.props.acceptStatus) && this.props.acceptStatus) {
      this.props.acceptStatus === 'accept' && this.acceptCall(this.props.type)
      this.props.acceptStatus === 'reject' && this.rejectCall()
      this.props.setAcceptStatus('')
    }

    forEachObjIndexed((fn, key) => {
      if (prevProps[key] !== this.props[key]) {
        fn(this.props[key])
      }
    }, this.trackedProps)
  }

  componentWillUnmount() {
    this.stop()
    this.unsubscribe()
  }

  initWebRtc = () => {
    this.connected = true
    if (this.webrtc) {
      return false
    }

    const {webrtcRoom, setConnectionStatus, connectionStatus} = this.props
    const {videoMuted, onlyAudio} = this.state

    this.setState({startTime: +new Date()})
    setConnectionStatus(WEBRTC_STATUS_CONNECTING)

    const webrtc = new SimpleWebRTC({
      url: WEBRTC_URL,
      localVideoEl: this.localVideo,
      remoteVideosEl: '',
      autoRequestMedia: false,
      media: {audio: true, video: true},
      socketio: {
        'force new connection': true,
        query: `token=${getCookie('token')}`,
      },
    })

    webrtc.connection.on('message', (data) => {
      const isValidType = data.type === 'mute' || data.type === 'unmute'

      if (!this.state.isInit && isValidType && data.payload.name === 'video') {
        this.props.changeRtcLoader(false)
        this.setState({ignoreOffer: true})
        const isMute = data.type === 'mute'

        this.props.setType(isMute ? 'audio' : 'video')

        this.setState({onlyAudio: isMute})
        isMute && webrtc.pauseVideo()
        return
      }

      /* Если из МК инициировать видео-звонок в самый первый раз за сессию, то приходит 1 сообщение типа offer */
      if (data.type === 'offer' && !this.state.ignoreOffer) {
        this.props.changeRtcLoader(false)
        this.props.setType('video')
      }
    })

    webrtc.on('peerReady', () => {
      setConnectionStatus(WEBRTC_ACTIVE_OFFER)
    })

    webrtc.on('waitingPeerRemove', () => {
      this.setState({isInit: false})
      setConnectionStatus(WEBRTC_STATUS_DISCONNECTED)
    })

    webrtc.on('localStream', () => {
      if (videoMuted || onlyAudio) {
        webrtc.pauseVideo()
      }
      connectionStatus !== WEBRTC_STATUS_CONNECTED && setConnectionStatus(WEBRTC_STATUS_CONNECTED)
    })

    webrtc.joinRoom(webrtcRoom)

    // a peer video has been added
    webrtc.on('videoAdded', (video, peer) => {
      this.setState({remoteStream: peer.stream})
    })
    webrtc.on('videoRemoved', () => {
      this.setState({remoteStream: null})
      if (this.connected === false) {
        return
      }
      this.restart()
    })

    // remote p2p/ice failure
    webrtc.on('connectivityError', (peer) => {
      console.log('remote fail', peer)
    })
    this.webrtc = webrtc
  }

  stop = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }

    if (this.webrtc) {
      this.connected = false
      this.webrtc.stopLocalVideo()
      this.webrtc.leaveRoom()
      this.webrtc.disconnect()
      this.webrtc = null

      this.setState({
        startTime: 0,
        duration: 0,
        videoMuted: false,
        audioMuted: false,
        remoteStream: null,
        ignoreOffer: false,
        isInit: false
      })
      getPubSub().emit('setActiveTab', 'chat')
      this.props.setConnectionStatus(WEBRTC_STATUS_DISCONNECTED)
      this.props.setType('chat')
    }
  }

  restart = () => {
    this.stop()
    this.initWebRtc()
  }

  get opponentProps() {
    const {consultation} = this.props
    const defaultOpponent = {
      name: '',
      surname: '',
      middlename: '',
      photo: '',
      specialization: ''
    }

    if (consultation && consultation.chat) {
      const chat = consultation.chat
      const opponent = chat.opponent

      return {
        ...defaultOpponent,
        ...opponent,
        specialization: chat.specializationTitle
      }

    }

    return {
      ...defaultOpponent
    }
  }

  opponentImage = () => {
    const {code} = this.props.consultation.status

    const image = CONSULTATION_STATUSES[code].id <= 3 ? 'operator' : 'doctor'

    return `/static/avatars/${image}.svg`
  }

  /**
   * Вкл/выкл видео
   */
  toggleVideo = (onlyAudio) => {
    const videoMuted = onlyAudio ? false : !this.state.videoMuted
    this.setState({videoMuted, onlyAudio: false}, () => {
      if (videoMuted) {
        this.webrtc.pauseVideo()
      } else {
        this.webrtc.resumeVideo()
      }
    })
  }

  /**
   * Вкл/выкл аудио
   */
  toggleAudio = () => {
    const audioMuted = !this.state.audioMuted
    this.setState({audioMuted: audioMuted})
    if (audioMuted) {
      this.webrtc.mute()
    } else {
      this.webrtc.unmute()
    }
  }

  /**
   * Вызов окна проверки связи
   */
  settingsClick = () => {
    const {addAndShowModal} = this.props

    addAndShowModal({type: 'check-connection'})
  }

  /**
   * Принять звонок
   * @param type
   * @returns {Promise<void>}
   */
  acceptCall = async (type) => {
    const {setConnectionStatus, connectionStatus} = this.props

    getPubSub().emit('setActiveTab', type)
    await this.sendEvent(`webrtc_${type}_connect`)
    this.onInterval()
    this.webrtc.startLocalVideo()

    this.webrtc.on('readyToCall', () => {
      this.webrtc.initCall()
      this.setState({isInit: true})
      if (this.state.onlyAudio) {
        this.webrtc.pauseVideo()
      }
      connectionStatus !== WEBRTC_STATUS_CONNECTED && setConnectionStatus(WEBRTC_STATUS_CONNECTED)
    })
  }

  /**
   * Отклонить звонок
   */
  rejectCall = () => {
    this.restart()
  }

  /**
   * Положить трубку
   */
  onPhoneDown = async () => {
    await this.sendEvent('webrtc_disconnect')
    this.restart()
  }

  onInterval = () => {
    if (this.state.startTime) {
      this.interval = setInterval(this.checkInterval, 1000)
    } else {
      this.setState({duration: 0})
      clearInterval(this.interval)
    }
  }

  checkInterval = () => {
    this.setState(({duration}) => ({duration: duration + 1}))
  }

  sendEvent = async (event) => {
    const {consultation} = this.props

    await requestApi('post', '/app/event', {
      event,
      chatId: consultation.chat.id,
      consultationId: consultation.id
    })
  }

  updateConsultation = ({active}) => {
    if (!active) {
      const {reset} = this.props

      if (Router.pathname === '/consultation') {
        Router.push('/consultation')
      }

      this.stop()
      reset()
    } else {
      const {consultation} = this.props

      const consultationId = consultation ? consultation.id : null
      if (consultationId) {
        this.props.getConsultation(consultationId, true)
      }
    }
  }

  render() {
    const {
      onCreate,
      consultation,
      chatIsSmall,
      activeType,
      connectionStatus,
      onOpenChatClicked,
      isChatOpened,
    } = this.props

    const {remoteStream, audioMuted, videoMuted, onlyAudio, startTime} = this.state
    const opponent = this.opponentProps
    const fullNameDoctor = `${opponent.name} ${opponent.surname}`

    const isWidget = activeType !== 'chat'

    return (
      <MediaChatContainer visible={isWidget} chatIsSmall={chatIsSmall} isChatOpened={isChatOpened}>
        {consultation && (
          <DoctorInfoWrapper gap={'4px'} flow={'column'} isChatOpened={isChatOpened} chatIsSmall={chatIsSmall}>
            {fullNameDoctor.trim() && (
              <FullNameDoctor
                color={'white'}
                size={chatIsSmall ? '16px' : '28px'}
                lineHeight={chatIsSmall ? '24px' : '28px'}
                width={'auto'}
              >
                {fullNameDoctor}
              </FullNameDoctor>
            )}
            <Wrapper justify={'flex-start'}>
              <Text width={'auto'} color={'white70'} size={'16px'} lineHeight={'24px'} padding={'0 8px 0 0'}>
                {opponent.specialization}
              </Text>
              <Text width={'auto'} color={'white70'} size={'16px'} lineHeight={'24px'}>
                {formatDuration(this.state.duration * 1000)}
              </Text>
            </Wrapper>
          </DoctorInfoWrapper>
        )}
        {connectionStatus === WEBRTC_STATUS_CONNECTED && onlyAudio && (
          <DoctorPhotoWrapper>
            <Avatar src={opponent.photo ? opponent.photo : this.opponentImage()} width={'160px'} height={'160px'} borderRadius={'50%'}/>
          </DoctorPhotoWrapper>
        )}
        <VideoChat
          consultationId={consultation.id}
          isChatOpened={isChatOpened}
          chatIsSmall={chatIsSmall}
          activeType={activeType}
          opponent={opponent}
          visible={connectionStatus === WEBRTC_STATUS_CONNECTED && !onlyAudio}
          localVideoRef={(node) => this.localVideo = node}
          videoMuted={videoMuted}
          remoteStream={remoteStream}
          consultation={consultation}
          startTime={startTime}
        />
        <MediaControls
          isWidget={isWidget}
          chatIsSmall={chatIsSmall}
          isChatOpened={isChatOpened}
        >
          {!isMobile && <ControlWrapper
            isSettings={true}
            chatIsSmall={chatIsSmall}
            onClick={this.settingsClick}
            bgColor={'transparent'}
          >
            <Icon color={'white'} width={32} height={32} type={'settings'}/>
          </ControlWrapper>}

          <ChatControlWrapper
            onClick={() => {
              onOpenChatClicked()
              this.props.changeUnread(false)
            }}
            bgColor={'white20'}
          >
            <Icon color={'white'} width={32} height={32} type={'chat'}/>
            {this.props.hasUnreadMessages && <ChatUnreadBadge />}
          </ChatControlWrapper>

          <ControlWrapper
            onClick={() => this.toggleVideo(onlyAudio)}
            bgColor={videoMuted || onlyAudio ? 'white' : 'white20'}
          >
            <Icon color={videoMuted || onlyAudio ? 'black' : 'white'} width={32} height={32} type={`camera${videoMuted || onlyAudio ? '_off' : ''}`}/>
          </ControlWrapper>
          <ControlWrapper
            onClick={this.toggleAudio}
            bgColor={audioMuted ? 'white' : 'white20'}
          >
            <Icon color={audioMuted ? 'black' : 'white'} width={32} height={32} type={`microphone${audioMuted ? '_off' : ''}`}/>
          </ControlWrapper>
          <ControlWrapper onClick={this.onPhoneDown} bgColor={'red'}>
            <Icon width={32} height={32} shrink={'0'} color={'white'} type={'phone-down'}/>
          </ControlWrapper>
        </MediaControls>
        {!consultation && <StartConsultationWrapper onClick={onCreate}>
          <Text align={'center'} color={'white'} size={'16px'} lineHeight={'24px'}>
            <T ucFirst>media-chat.title</T>
          </Text>
          <Button><T ucFirst>media-chat.button.call</T></Button>
        </StartConsultationWrapper>}
      </MediaChatContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.mediachat,
  consultation: state.consultation.current,
})

const mapDispatchToProps = dispatch => ({
  addAndShowModal: (data) => dispatch.modal.addAndShowModal(data),
  getConsultation: (id) => dispatch.consultation.getConsultation({id, force: true}),
  setType: (connectionType) => dispatch.mediachat.setType(connectionType),
  setAcceptStatus: (status) => dispatch.mediachat.setAcceptStatus(status),
  setConnectionStatus: (status) => dispatch.mediachat.setConnectionStatus(status),
  changeUnread: (value) => dispatch.mediachat.changeUnread(value),
  reset: () => dispatch.consultation.reset()
})

export const MediaChat = connect(mapStateToProps, mapDispatchToProps)(MediaChatPure)