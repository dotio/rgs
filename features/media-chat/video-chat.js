import React, {Component}     from 'react'
import styled, {css}          from 'styled-components'
import PropTypes              from 'prop-types'
import {Icon}                 from '../../ui/icon'
import {getColor} from '../../ui/helpers/getColor'
import {Router} from '../../routes'
import {media} from '../../helpers/media'
import {Avatar} from '../../ui/avatar'
import {CONSULTATION_STATUSES} from '../../ui/helpers/consultation-statuses'

const MediaChatWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  border-radius: 16px;
  justify-content: center;
  height: ${p => p.isChatOpened && p.chatIsSmall ? '80px' : p.height};
  background-color: ${p => p.isChatOpened && p.chatIsSmall ? 'transparent' : getColor('black', p.theme)};
  align-items: center;
  flex-direction: column;
  ${p => !p.visible && `
    display: none;
  `}
  
  ${p => p.isChatOpened && media.mobile`
    background-color: transparent;
    height: 140px;
  `}
`

MediaChatWrapper.propTypes = {
  fs:     PropTypes.bool,
  visible: PropTypes.bool,
}

MediaChatWrapper.defaultProps = {
  fs:      false,
  visible: false,
}


const DoctorPhotoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const Button = styled.button`
  display: flex;
  bottom: 24px;
  left: 24px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0;
  height: 32px;
  &:active {
    outline: none;
  }
`

export const LocalVideo = styled.video`
  position: relative;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  width: 100%;
  border-radius: 16px;
  
  ${media.mobile`
    height: 140px;
    width: auto;
  `}
`

const OuterLocalVideoWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const WrapperLocalVideo = styled.div`
  position: absolute;
  width: 180px;
  height: 120px;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  top: ${p => p.top};
  right: ${p => p.right};
  border-radius: 16px;
  ${p => p.chatIsSmall && `
    width: 120px;
    height: 80px;
  `}
  
  ${media.mobile`
    top: 6px;
    width: 95px;
    height: 140px;
    object-fit: cover;
    //margin-bottom: 20px;
  `}
  
  ${p => p.chatIsSmall && p.isChatOpened && css`
    display: none;
  `}
  
  ${p => p.isChatOpened && media.mobile`
    display: none;
  `}
`

const RemoteVideoContainer = styled.div`
  position: relative;
  //height: 56.25vw;
  height: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  top: 50%;
  border-radius: 16px;
  width: ${p => p.width};
  
  ${p => p.chatIsSmall && `
    -webkit-mask-image: -webkit-radial-gradient(white, black);
    height: 100%;
  `}
  
  ${media.mobile`
    object-fit: cover;
    height: auto;
    width: 100%;
    padding: 0 6px;
    margin-top: 30px;
  `}
  
  ${p => p.chatIsSmall && p.isChatOpened && css`
    width: 120px;
    height: 80px;
  `}
  
  ${p => p.isChatOpened && media.mobile`
    width: 95px;
    height: 140px;
    padding: 0;
    margin: 0;
  `}
`

const MediaControls = styled.div`
  display: none;
  position: absolute;
  bottom: ${p => p.bottom};
  right: 22px;
  justify-content: center;
  & > * + * {
      margin-left: 20px;
  };
  
  ${p => p.chatIsSmall && `
    display: flex;
  `}
  
  ${media.mobile`
    display: none;
  `}
  
  ${p => p.isChatOpened && css`
     display: none;
  `}
`

const RemoteVideoComp = styled.video`
  width: 100%;
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  ${media.mobile`
    border-radius: 16px;
  `}
`

export class RemoteVideo extends Component {
  componentDidMount() {
    if (this.props.stream) {
      this.remoteVideo.srcObject = this.props.stream
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stream !== this.props.stream) {
      this.remoteVideo.srcObject = nextProps.stream
    }
    return null
  }

  render() {
    return (
      <RemoteVideoComp width={this.props.width} autoPlay playsInline ref={(node) => this.remoteVideo = node}/>
    )
  }
}
RemoteVideo.propTypes = {
  width: PropTypes.string,
  stream: PropTypes.object
}

RemoteVideo.defaultProps = {
  width: 'auto',
  stream: null
}

export class VideoChat extends Component {
  interval = null

  constructor(props) {
    super(props)
    this.state = {
      chatOpened: false,
    }
  }

  toggleFullScreen = () => {
    const {consultationId} = this.props

    Router.pushRoute(`/consultation/${consultationId}`)
  }

  opponentImage = () => {
    const {code} = this.props.consultation.status

    const image = CONSULTATION_STATUSES[code].id <= 3 ? 'operator' : 'doctor'

    return `/static/avatars/${image}.svg`
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {remoteStream, localVideoRef, visible, chatIsSmall, isChatOpened, videoMuted, opponent} = this.props
    const height = chatIsSmall ? '250px' : '100%'
    return(
      <MediaChatWrapper chatIsSmall={chatIsSmall} isChatOpened={isChatOpened} visible={visible} fs={false} position={'relative'} height={height} bgColor={'black'} flow={'column'} align={'center'}>
        {remoteStream && <RemoteVideoContainer chatIsSmall={chatIsSmall} isChatOpened={isChatOpened}>
          {videoMuted ?
            <DoctorPhotoWrapper>
              <Avatar src={opponent.photo ? opponent.photo : this.opponentImage()} width={'160px'} height={'160px'} borderRadius={'50%'}/>
            </DoctorPhotoWrapper>
            : <RemoteVideo playsinline stream={remoteStream} />
          }
          {!videoMuted && <MediaControls bottom={'22px'} chatIsSmall={chatIsSmall} isChatOpened={chatIsSmall && isChatOpened}>
            <Button onClick={this.toggleFullScreen}>
              <Icon width={32} height={32} color={'white'} type={'fs_arrows_close'}/>
            </Button>
          </MediaControls>}
        </RemoteVideoContainer>}
        <WrapperLocalVideo
          top={isChatOpened && chatIsSmall ? '34px' : '6px'}
          right={!chatIsSmall && isChatOpened ? '331px' : '6px'}
          chatIsSmall={chatIsSmall}
          isChatOpened={isChatOpened}
        >
          <OuterLocalVideoWrapper> <LocalVideo muted autoplay playsInline ref={localVideoRef}/></OuterLocalVideoWrapper>
        </WrapperLocalVideo>
      </MediaChatWrapper>
    )
  }
}
VideoChat.propTypes = {
  remoteStream: PropTypes.object,
  localVideoRef: PropTypes.func,
  toggleFs: PropTypes.func,
  visible: PropTypes.bool
}

VideoChat.defaultProps = {
  visible: false,
}
