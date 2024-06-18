import styled                                  from 'styled-components'
import { Component }                           from 'react'
import React                                   from 'react'
import {Wrapper} from '../../../../ui/wrapper'
import {getColor} from '../../../../ui/helpers/getColor'
import {Text} from '../../../../ui/text'
import {Icon} from '../../../../ui/icon'
import {Button} from '../../../../ui/button'
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
  background-color: ${p => getColor('primary', p.theme)}
`


const Player = styled.div`
  cursor: ${p => p.playing ? 'default' : 'pointer'};
  ${p => p.playing && `
    opacity: 0.4;
  `}
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

export class CheckDynamic extends Component {

  state = {
    playing: false,
    message: null
  }

  play = () => {
    if (!this.state.playing) {
      this.setState({
        playing: true
      }, () => {
        this.audio.play()
        this.audio.addEventListener('ended', this.onStop)
      })
    }
  }

  onStop = () => {
    this.setState({
      playing: false
    })
    this.audio.removeEventListener('ended', this.onStop)
  }

  onSuccess = () => {
    this.setState({
      message: {
        color: 'positiveGreen',
        text: 'consultation.dynamic.success'
      }
    })
  }

  render() {

    const { playing, message } = this.state

    return (
      <CheckWrapper justify={'space-between'}>
        <MobileWrapper>
          <Title padding={'0 66px 0 0'} width={'auto'} color={'black'} size={'20px'} lineHeight={'24px'}><T ucFirst>consultation.dynamic.title</T></Title>
          <Wrapper flow={'column'} justify={'space-between'}>
            <Title color={'black50'} size={'20px'} lineHeight={'24px'}><T ucFirst>consultation.dynamic.subtitle</T></Title>
            <Wrapper flow={'column'} align={'center'} justify={'center'}>
              { message
                ? (
                  <Wrapper>
                    <Title padding={'8px 0 0'} width={'auto'} size={'20px'} lineHeight={'24px'} color={message.color}><T ucFirst>{message.text}</T></Title>
                    <Wrapper padding={'8px 0 0 8px'} width={'auto'}>
                      <Icon type={'check'} color={'positiveGreen'}/>
                    </Wrapper>
                  </Wrapper>
                )
                : (
                <>
                  <Title color="black50" size={'20px'} lineHeight={'24px'} padding={'12px 0 12px'}><T ucFirst>consultation.dynamic.sound</T></Title>
                  <Wrapper>
                    <Gap direction={'left'} gap={'8px'}>
                      <Button color={'primary'} onClick={this.onSuccess}><T ucFirst>consultation.dynamic.button.yes</T></Button>
                      <Button onClick={this.props.onDisable} color={'white'}><T ucFirst>consultation.dynamic.button.no</T></Button>
                    </Gap>
                  </Wrapper>
                </>
                )
              }
            </Wrapper>
          </Wrapper>
        </MobileWrapper>
        <Player onClick={this.play} playing={playing}>
          <IconWrapper>
            <Icon width={24} height={24} type={'dynamic'} color={'white'}/>
          </IconWrapper>
          <audio ref={audio => this.audio = audio} src="/static/audio/sample.mp3"/>
        </Player>
      </CheckWrapper>
    )
  }
}
