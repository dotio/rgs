import styled                                  from 'styled-components'
import { Component }                           from 'react'
import React                                   from 'react'
import PropTypes                               from 'prop-types'
import {makeCancelable} from '../../../../helpers/promise'
import {Wrapper} from '../../../../ui/wrapper'
import {Text} from '../../../../ui/text'
import {Button} from '../../../../ui/button'
import {getColor} from '../../../../ui/helpers/getColor'
import {Gap} from '../../../../ui/gap'
import {Icon} from '../../../../ui/icon'
import {media} from '../../../../helpers/media'
import {T} from '../../../../utils/translation'

const CheckWrapper = styled(Wrapper)`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${p => getColor('black10', p.theme)}
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  
  ${media.mobile`
    flex-direction: column;
    align-items: stretch;
    height: 96px;
  `}
`

const Title = styled(Text)`
  ${media.mobile`
      font-size: 16px
    `}
`

const Video = styled.video`
  width: 128px;
  height: 80px;
  background: #000;
  border-radius: 12px;

  ${media.mobile`
    width: 65px;
    height: 98px;
  `}
`

const getUserMedia = constraints => {
  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(resolve)
        .catch(reject)
    } else {
      const getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      getUserMedia(
        {
          video: true
        },
        resolve,
        reject
      )
    }
  })
}

export class CheckCamera extends Component {
  static propTypes = {
    onDisable: PropTypes.func
  };

  constructor(props) {
    super(props)
    this.state = {
      message: null
    }
  }

  onCameraGranted = stream => {
    this.stream = stream
    this.video.srcObject = stream
    this.video.play()
  };

  onCameraDenied = error => {
    let messages = {
      NotFoundError: 'consultation.camera.not-found',
      NotAllowedError: 'consultation.camera.not-allow'
    }
    this.setState({
      message: {
        text: messages[error.name] || 'consultation.camera.unknown.error',
        color: 'red'
      }
    })
  };

  onSuccess = () => {
    this.setState({
      message: {
        color: 'positiveGreen',
        text: 'consultation.camera.success'
      }
    })
  }

  componentDidMount() {
    this.video.setAttribute('autoplay', '')
    this.video.setAttribute('muted', '')
    this.video.setAttribute('playsinline', '')
    this.cancelablePromise = makeCancelable(
      getUserMedia({
        video: true
      })
    )
    this.cancelablePromise.promise
      .then(this.onCameraGranted)
      .catch(this.onCameraDenied)
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel()
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop())
    }
  }

  render() {
    const {message} = this.state
    return (
      <CheckWrapper justify={'space-between'}>
        <MobileWrapper>
          <Title padding={'0 93px 0 0'} width={'auto'} color={'black'} size={'20px'} lineHeight={'24px'}><T ucFirst>consultation.camera.title</T></Title>
          <Wrapper justify={'space-between'}>
            {
              message
                ? (
                  <Wrapper>
                    <Title padding={'0 8px 0 0'} width={'auto'} size={'20px'} lineHeight={'24px'} color={message.color}><T ucFirst>{message.text}</T></Title>
                    <Icon type={'check'} color={'positiveGreen'}/>
                  </Wrapper>
                ) : (
                <>
                  <Wrapper flow={'column'}>
                    <Title color={'black50'} size={'20px'} lineHeight={'24px'} padding={'0 0 12px'}><T ucFirst>consultation.camera.view</T></Title>
                    <Wrapper>
                      <Gap direction={'left'} gap={'8px'}>
                        <Button color={'primary'} onClick={this.onSuccess}><T ucFirst>consultation.camera.button.yes</T></Button>
                        <Button onClick={this.props.onDisable} color={'white'}><T ucFirst>consultation.camera.button.no</T></Button>
                      </Gap>
                    </Wrapper>
                  </Wrapper>
                </>
                )
            }
          </Wrapper>
        </MobileWrapper>
        <Video ref={video => (this.video = video)}/>
      </CheckWrapper>
    )
  }
}
