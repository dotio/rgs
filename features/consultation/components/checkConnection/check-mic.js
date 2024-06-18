import styled                                  from 'styled-components'
import React, { Component }                    from 'react'
import PropTypes                               from 'prop-types'
import {getColor} from '../../../../ui/helpers/getColor'
import {makeCancelable} from '../../../../helpers/promise'
import {Button} from '../../../../ui/button'
import {Text} from '../../../../ui/text'
import {Wrapper} from '../../../../ui/wrapper'
import {Icon} from '../../../../ui/icon'
import {Gap} from '../../../../ui/gap'
import {media} from '../../../../helpers/media'
import {T} from '../../../../utils/translation'

const CheckWrapper = styled(Wrapper)`
  padding: 16px;
  border-radius: 16px;
  border: 1px solid ${p => getColor('black10', p.theme)}
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  background-color: ${p => getColor('black05', p.theme)}
`

const VolumeItem = styled.div`
  display: inline-block;
  margin-right: 8px;
  width: 10%;
  max-width: 24px;
  height: 24px;
  border-radius: 2px;
  background-color: ${p => p.active ? getColor('primary', p.theme) : getColor('black15', p.theme)};
`

const MobileWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${media.mobile`
    flex-direction: column;
    align-items: stretch;
  `}
`

const Title = styled(Text)`
  ${media.mobile`
      font-size: 16px
    `}
`

const getUserMedia = (constraints) => {
  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraints).then(resolve).catch(reject)
    } else {
      const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
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

const Volume = ({volume}) => (
  <Wrapper align={'center'}>
    {Array.from(Array(10).keys()).map((val) => (
      <VolumeItem key={val} active={val/10 < volume} />
    ))}
  </Wrapper>
)

export class CheckMic extends Component {

  static propTypes = {
    onDisable: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      message: null
    }
  }

  state = {
    volume: 0
  }

  onMicrophoneDenied = (error) => {
    let messages = {
      NotFoundError: 'consultation.micro.not-found',
      NotAllowedError: 'consultation.micro.not-allow',
    }
    this.setState({
      message: {
        text: messages[error.name] || 'consultation.micro.unknown.error',
        color: 'red'
      }
    })
  }

  getAverageVolume = (array) => {
    let values = 0
    let average
    let length = array.length
    // get all the frequency amplitudes
    for (let i = 0; i < length; i++) {
      values += array[i]
    }
    average = values / length
    return average
  }

  onMicrophoneGranted = (stream) => {
    this.stream = stream
    const audioContent = new AudioContext()
    const audioStream = audioContent.createMediaStreamSource( stream )
    const analyser = audioContent.createAnalyser()
    audioStream.connect(analyser)
    analyser.fftSize = 1024
    let frequencyArray = new Uint8Array(analyser.frequencyBinCount)

    this.interval = setInterval(() => {
      analyser.getByteFrequencyData(frequencyArray)
      this.onChangeVolume(this.getAverageVolume(frequencyArray) / 100)
    }, 100)
  }

  onChangeVolume = (volume) => {
    const formattedVolume = +volume.toFixed(1)
    if (formattedVolume !== this.state.volume && formattedVolume <= 1 && formattedVolume >= 0) {
      this.setState({ volume: formattedVolume})
    }
  }

  onSuccess = () => {
    this.setState({
      message: {
        color: 'positiveGreen',
        text: 'consultation.micro.success'
      }
    })
  }

  componentDidMount() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    this.cancelablePromise = makeCancelable(getUserMedia({
      audio: {
        mandatory: {
          googEchoCancellation: 'false',
          googAutoGainControl: 'false',
          googNoiseSuppression: 'false',
          googHighpassFilter: 'false'
        }
      },
    }))

    this.cancelablePromise.promise.then(this.onMicrophoneGranted).catch(this.onMicrophoneDenied)
  }

  componentWillUnmount() {
    if (this.cancelablePromise) {
      this.cancelablePromise.cancel()
    }
    if (this.interval) {
      clearInterval(this.interval)
    }
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
    }
  }

  render() {

    const { volume, message } = this.state

    return (
      <CheckWrapper justify={'space-between'}>
        <MobileWrapper>
          <Title padding={'0 63px 0 0'} width={'auto'} color={'black'} size={'20px'} lineHeight={'24px'}><T ucFirst>consultation.micro.title</T></Title>
          <Wrapper justify={'space-between'}>
            <Wrapper flow={'column'} justify={'center'} align={'center'}>
              <Wrapper flow={'column'} align={'center'}>
                <Title color={'black50'} size={'20px'} lineHeight={'24px'} padding={'0 0 12px'}>
                  <T ucFirst>consultation.micro.subtitle</T>
                </Title>
                <Volume volume={volume}/>
              </Wrapper>
              {
                message
                  ? (
                    <Wrapper align={'center'}>
                      <Title padding={'12px 8px 0 0'} width={'auto'} size={'20px'} lineHeight={'24px'} color={message.color}><T ucFirst>{message.text}</T></Title>
                      <Wrapper padding={'12px 0 0 8px'} width={'auto'}>
                        <Icon type={'check'} color={'positiveGreen'}/>
                      </Wrapper>
                    </Wrapper>
                  ) : (
                    <Wrapper flow={'column'}>
                      <Title width={'auto'} color={'black50'} size={'20px'} lineHeight={'24px'} padding={'24px 0 12px'}>
                        <T ucFirst>consultation.micro.move</T>
                      </Title>
                      <Wrapper>
                        <Gap direction={'left'} gap={'8px'}>
                          <Button color={'primary'} onClick={this.onSuccess}><T ucFirst>consultation.micro.button.yes</T></Button>
                          <Button onClick={this.props.onDisable} color={'white'}><T ucFirst>consultation.micro.button.no</T></Button>
                        </Gap>
                      </Wrapper>
                    </Wrapper>
                  )
              }
            </Wrapper>
          </Wrapper>
        </MobileWrapper>
        <IconWrapper>
          <Icon type={'microphone'} color={'black40'}/>
        </IconWrapper>
      </CheckWrapper>
    )
  }
}
