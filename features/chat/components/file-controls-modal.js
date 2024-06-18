import React, {useRef, useEffect, useState} from 'react'
import {Container} from '../../../ui/grid/container'
import styled, {keyframes, css} from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Icon} from '../../../ui/icon'
import {Text} from '../../../ui/text'
import {T} from '../../../utils/translation'
import {getColor} from '../../../ui/helpers/getColor'
import {CircleButton} from '../../../ui/circle-button'

export const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  height: auto;
  max-height: 100%;
`

const modalKeyFrameOpen = keyframes`
  0% {
      transform: translateY(100%);
  }
  100% {
     transform: translateY(0);
  }
`
const modalKeyFrameClose = keyframes`
  0% {
      transform: translateY(0%);
  }
  100% {
     transform: translateY(100%);
  }
`

const ModalBody = styled.div`
  padding: 20px 0;
  animation: ${modalKeyFrameOpen} 0.7s linear;
  position: relative;
  width: 100%;
  background: ${p => getColor('white', p.theme)};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  min-height: 100%;
  margin-top: 16px;
  margin-bottom: auto;
  padding: 20px 0;
  ${(p) => p.close && css`
    animation: ${modalKeyFrameClose} 0.4s linear;
  `}
`

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); 
`

const Control = styled(Wrapper)`
  font-size: 16px;
  line-height: 24px;
  background-color: ${p => getColor('white', p.theme)};
  cursor: pointer;
`

export const FileControlsModal = ({onClose, extended, onDelete, onDownload, onSendChat}) => {
  const modalBody = useRef(null)
  const modalContainer = useRef(null)
  const [close, toggleClose] = useState(false)

  useEffect(() => {
    modalBody.current.addEventListener('animationstart', () => {
      if (modalBody.current.offsetHeight > document.documentElement.clientHeight){
        modalContainer.current.style.overflow = 'auto'
      } else {
        modalContainer.current.style.overflow = 'hidden'
      }
    })
    modalBody.current.addEventListener('animationend', () => {
      if (close) {
        onClose()
      }
    })
  }, [close])

  return(
    <ModalContainer ref={modalContainer}>
      <Backdrop onClick={() => {}}/>
      <ModalBody ref={modalBody} close={close}>
        <CircleButton icon={'cross'} onClick={() => {toggleClose(true)}}/>
        <Container>
          <Wrapper flow={'column'} gap={'20px'}>
            <Control onClick={onDelete}>
              <Icon type={'delete_trash'} color={'black40'}/><Text padding={'0 0 0 16px'} width={'auto'}><T ucFirst>chat.file.delete</T></Text>
            </Control>
            <Control onClick={onDownload}>
              <Icon type={'download'}/><Text padding={'0 0 0 16px'} width={'auto'}><T ucFirst>chat.file.download</T></Text>
            </Control>
            {/*<Control onClick={() => {}}>*/}
            {/*<Icon type={'share_arrow'}/><Text padding={'0 0 0 16px'} width={'auto'}><T ucFirst>chat.file.share</T></Text>*/}
            {/*</Control>*/}
            {extended && <>
              {/*<Control onClick={() => {}}>*/}
                {/*<Icon type={'pencil'} color={'black40'} width={18} /><Text padding={'0 0 0 16px'} width={'auto'}><T ucFirst>chat.file.rename</T></Text>*/}
              {/*</Control>*/}
              <Control onClick={onSendChat}>
                <Icon type={'send_22'} color={'black40'} width={22} height={22}/><Text padding={'0 0 0 16px'} width={'auto'}><T ucFirst>chat.file.send-to-chat</T></Text>
              </Control>
            </>}
          </Wrapper>
        </Container>
      </ModalBody>
    </ModalContainer>
  )
}
