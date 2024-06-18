import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Img} from '../../../ui/img'
import {useDispatch} from 'react-redux'
import {Text} from '../../../ui/text'
import {CircleButton} from '../../../ui/circle-button'
import {media} from '../../../helpers/media'
import {ControlsButtonBlock} from '../../clinics/components/controls-button-block'

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 0 72px 0;

  ${media.mobile`
    padding: 77px 0;
  `}
`

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`

const ModalBody = styled(Wrapper)`
  justify-content: center;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
  max-width: calc(100vw - 1px);
  width: auto;
  max-height: calc(100vh - 110px);
  height: auto;
  border-radius: 4px;
  overflow: hidden;
  
  ${media.mobile`
    height: 100%;
    width: 100%;
    max-height: calc(100% - 110px);
  `}
`

const ModalImage = styled(Img)`
  display: block;
  max-width: 100%;
  height: 100%;
  max-height: calc(100vh - 110px);
  border-radius: 4px;
  
  ${media.mobile`
    height: auto;
    width: 100%;
    max-height: calc(100% - 110px);
  `}
`

const BottomBlock = styled(Wrapper)`
  position: fixed;
  bottom: 24px;
  left: 0;
  pointer-events: none;

  ${media.mobile`
    display: flex;
    justify-content: center;
  `}
`

const StyledText = styled(Text)`
  ${media.mobile`
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
`

const LeftCircleButton = styled(CircleButton)`
  left: 16px;
`

export const ImageModal = ({current}) => {
  const {title, url, withoutControlsButton} = current.data
  const dispatch = useDispatch()
  const modalContainer = useRef(null)
  const isMobile = useSelector(state => state.consultation.mobile)

  useEffect(() => {
    modalContainer.current.focus()
  })

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      dispatch.modal.deleteModal()
    }
  }

  return (
    <ModalContainer onKeyDown={onKeyDown} ref={modalContainer} tabIndex={100}>
      <Backdrop onClick={() => dispatch.modal.deleteModal()}/>
      {isMobile && <LeftCircleButton icon={'cross'} onClick={() => dispatch.modal.deleteModal()}/>}
      {!withoutControlsButton && <ControlsButtonBlock />}
      <ModalBody justify={'space-around'}>
        <ModalImage src={url} onClick={() => dispatch.modal.deleteModal()}/>
        <BottomBlock>
          <StyledText
            color={'white'}
            size={'16px'}
            lineHeight={'24px'}
            align={'center'}
          >
            {title}
          </StyledText>
        </BottomBlock>
      </ModalBody>
    </ModalContainer>
  )
}
