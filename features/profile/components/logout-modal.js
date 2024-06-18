import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../../templates/modal'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'
import {Button} from '../../../ui/button'
import {Container} from '../../../ui/grid/container'
import {media} from '../../../helpers/media'
import {Router} from '../../../routes'
import {T} from '../../../utils/translation'
import React from 'react'

export const StyledButton = styled(Button)`
  padding: 8px 15px;
  font-size: 20px;
  line-height: 30px;
`

const Background = styled.div`
  background: no-repeat url('/static/banners/exit-bg-lg.png');
  height: 344px;
  background-size: cover;
  background-position-x: 60%;
  position: relative;
  
  ${media.mobile`
    background: no-repeat url('/static/banners/exit-bg-sm.png');
    height: 200px;
    background-position: top center;
    background-size: cover;
  `}
`

const StyledWrapper = styled(Wrapper)`
    position: absolute;
    bottom: 24px;
    
    ${media.mobile`
      position: relative;
      bottom: unset;
    `}
`

export const LogoutModal = () => {
  const dispatch = useDispatch()
  const exitAction = async () => {
    await dispatch.login.logout()
    dispatch.modal.deleteModal()
    Router.pushRoute('/')
  }

  const cancelAction = () => {
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate padding={'0 0 16px'} mobilePadding={'0 0 16px'}>

      <Container>
        <Background/>
        <StyledWrapper flow={'column'} gap={'24px'} mobileGap={'16px'}>
          <TitleText><T ucFirst>profile.logout.title</T></TitleText>
          <Wrapper gap={'16px'}>
            <StyledButton color={'primary'} onClick={exitAction}><T ucFirst>profile.logout.out</T></StyledButton>
            <StyledButton color={'black05'} onClick={cancelAction}><T ucFirst>profile.logout.no-out</T></StyledButton>
          </Wrapper>
        </StyledWrapper>
      </Container>
    </ModalTemplate>
  )
}