import React from 'react'
import {ModalTemplate} from '../../../templates/modal'
import {Wrapper} from '../../../ui/wrapper'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {ShareItem} from '../../../templates/share-link/share-item'
import styled from 'styled-components'
import {media} from '../../../helpers/media'

const StyledWrapper = styled(Wrapper)`
  
  ${media.mobile`
    overflow-x: auto;
    overflow-y: hidden;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    position: relative;
    padding-right: 16px;
    width: calc(100% + 32px);
  `}
`

export const ShareClinicModal = () => {
  const localLink = window.location.href
  const copyClipboard = () => {
    navigator.clipboard.writeText(localLink).then(function() {
      console.log('copying was successful!')
    }, function(err) {
      console.error('could not copy text: ', err)
    })
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px'} smPadding={'0 0 16px'}>Поделиться</TitleText>
        <StyledWrapper gap={'12px'} mobileGap={'20px'}>
          <ShareItem title={'Скопировать ссылку'} radius={'50%'} icon={'/static/icons/copy.png'} onClick={copyClipboard} notLink/>
          <ShareItem title={'WhatsApp'} icon={'/static/icons/whats_app.png'} link={`whatsapp://send?text=${localLink}`}/>
          <ShareItem title={'Telegram'} icon={'/static/icons/telegram.png'} link={`https://telegram.me/share/url?url=${localLink}`}/>
          <ShareItem title={'Viber'} icon={'/static/icons/viber.png'} link={`viber://forward?text=${localLink}`}/>
          <ShareItem title={'VK'} icon={'/static/icons/vk.png'} link={`http://vk.com/share.php?url=${localLink}`}/>
          <ShareItem title={'OK'} icon={'/static/icons/ok.png'} link={`https://connect.ok.ru/offer?url=${localLink}`}/>
        </StyledWrapper>
      </Container>
    </ModalTemplate>
  )
}