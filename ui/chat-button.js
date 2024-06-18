import React from 'react'
import styled from 'styled-components'
import {Icon} from './icon'
import {getColor} from './helpers/getColor'
import {media} from '../helpers/media'
import {useDispatch, useSelector} from 'react-redux'

const ButtonBox = styled.div`
  position: fixed;
  z-index: 10000;
  display: none;
  align-items: center;
  justify-content: center;
  bottom: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  background: ${p => getColor('white', p.theme)};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  cursor: pointer;

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

export const ChatButton = (props) => {
  const dispatch = useDispatch()
  const hasUnreadMessages = useSelector(state => state.mediachat.hasUnreadMessages)
  const showConsultationModal = useSelector(state => state.router.showConsultationModal)
  const showModal = () => {
    dispatch.router.toggleConsultationModal(true)
    dispatch.mediachat.changeUnread(false)
  }

  return !showConsultationModal && <ButtonBox onClick={showModal} {...props}>
    {hasUnreadMessages && <ChatUnreadBadge />}
    <Icon type={'chat_grad'} />
  </ButtonBox>
}