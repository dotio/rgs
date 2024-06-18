import React from 'react'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
// import {Row} from '../../ui/grid/row'
// import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {TitleText} from '../../ui/title-text'
import {Icon} from '../../ui/icon'
import {Br} from '../../ui/br'
import {Wrapper} from '../../ui/wrapper'
import {CommunicationButton} from './communication-button'
import {Phone} from '../../ui/phone'
import {Well} from '../../ui/well'
import {media} from '../../helpers/media'
import {useDispatch, useSelector} from 'react-redux'
// import {Button} from '../../ui/button'
// import {Link} from '../../routes'
// import {getColor} from '../../ui/helpers/getColor'
import {getTranslator} from '../../utils/translation'
import {requestApi} from '../../lib/api'

const TitleWrapper = styled(Wrapper)`
  ${media.mobile`
    padding-top: 4px;
    width: 100%;
    flex-direction: column-reverse;
    align-items: center;
    
    & > *:first-child {
      padding-top: 4px;
    }
  `}
`
// const LoginWrapper = styled(Wrapper)`
//   ${media.mobile`
//     justify-content: flex-start;
//   `}
// `
const ConnectionWrapper = styled(Wrapper)`
  padding: 36px 0 12px;
  ${media.mobile`
    padding: 40px 0 12px;
  `}
`

// const LoginContainerWrapper = styled.div`
//   margin-top: 24px;
//   padding-top: 20px;
//   border-top: solid 1px ${p => getColor('black15', p.theme)};
//
//   ${media.mobile`
//     margin-top: 20px;
//   `}
// `

const StyledIcon = styled(Icon)`
  ${media.mobile`
    display: none;
  `}
`

const StyledText = styled(Text)`
  ${media.mobile`
    padding-bottom: 12px;
  `}
`

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-direction: column;
  `}
`

export const CommunicationBlock = () => {
  //const loggedIn = useSelector(state => state.login.loggedIn)
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const consultation = useSelector(state => state.consultation.current)

  const onClickCommunicationButton = (type) => async () => {
    await dispatch.consultation.createOrGoToActive({type, redirect: true})

    if(consultation.active && type !== 'chat') {
      await requestApi('post', '/app/event', {
        event: `webrtc_incoming_${type}`,
        chatId: consultation.chat.id,
        consultationId: consultation.id
      })
    }
  }

  return (
    <Well>
      <Container>
        <Wrapper flow={'column'} padding={'0 0 48px'} mobilePadding={'0 0 40px'}>
          <TitleText align={'center'} color={'black'}>{translator('communication.online.title', true)}</TitleText>
          <Wrapper align={'center'} justify={'center'} gap={'6px'}>
            <StyledIcon type={'mark'} color={'green'} shrink={'0'} />
            <TitleText width={'auto'} align={'center'} color={'black50'}>{translator('communication.medcine.title', true)}</TitleText>
          </Wrapper>
          <TitleWrapper width={'auto'} justify={'center'} gap={'14px'} mobileGap={'0'}>
            <Wrapper width={'auto'} align={'center'} justify={'center'} gap={'6px'}>
              <Icon type={'shield'} color={'black40'} shrink={'0'} />
              <TitleText width={'auto'} align={'center'} color={'black50'}>{translator('communication.private.title', true)}</TitleText>
            </Wrapper>
            <Wrapper width={'auto'} align={'center'} justify={'center'} gap={'6px'}>
              <Icon type={'clock'} color={'black40'} shrink={'0'} />
              <TitleText width={'auto'} align={'center'} color={'black50'}>{translator('communication.round-the-clock.title', true)} </TitleText>
            </Wrapper>
          </TitleWrapper>
          <ConnectionWrapper align={'center'} justify={'center'}>
            <Text align={'center'} color={'black50'}>{translator('communication.connection.title', true)}</Text>
          </ConnectionWrapper>
          <Wrapper align={'center'} justify={'center'} gap={'16px'} mobileGap={'4px'}>
            <CommunicationButton width={'98px'} color={'black05'} icon={'chat'} onClick={onClickCommunicationButton('chat')}>{translator('communication.connection.button.chat', true)}</CommunicationButton>
            <CommunicationButton color={'primary'} width={'120px'} middle={true} icon={'camera24'} onClick={onClickCommunicationButton('video')}>{translator('communication.connection.button.video', true)}</CommunicationButton>
            <CommunicationButton color={'black05'} width={'117px'} icon={'microphone24'} onClick={onClickCommunicationButton('audio')}>{translator('communication.connection.button.audio', true)}</CommunicationButton>
          </Wrapper>
        </Wrapper>
        <StyledWrapper justify={'space-between'} align={'center'}>
          <StyledText smAlign={'center'} color={'black50'}>{translator('communication.phone.title', true)}<Br mobile={true} medium={false} large={false}/>{translator('communication.phone.title.medconsultant', true)}</StyledText>
          <Phone phone={translator('communication.phone.number', true)} shortPhone={translator('communication.phone.short-number', true)} />
        </StyledWrapper>
      </Container>
      {/*{!loggedIn && <LoginContainerWrapper>*/}
      {/*  <Container>*/}
      {/*    <Row>*/}
      {/*      <Col lg={{cols: 8}} sm={{cols: 12, paddingBottom: '12px'}}>*/}
      {/*        <Text color={'black50'}>*/}
      {/*          <Text as={'span'}>{translator('communication.auth.title', true)}</Text><Br mobile={false}/> {translator('communication.auth.title.registration', true)}*/}
      {/*        </Text>*/}
      {/*      </Col>*/}
      {/*      <Col lg={{cols: 4}} sm={{cols: 12}}>*/}
      {/*        <LoginWrapper justify={'flex-end'} align={'center'}>*/}
      {/*          <Link route={'/login'} passHref>*/}
      {/*            <Button as={'a'} color={'primary'}>{translator('communication.auth.button', true)}</Button>*/}
      {/*          </Link>*/}
      {/*        </LoginWrapper>*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*  </Container>*/}
      {/*</LoginContainerWrapper>}*/}
    </Well>
  )
}