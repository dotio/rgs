import React, {useRef, useEffect, useState} from 'react'
import styled, {keyframes, css} from 'styled-components'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {getColor} from '../../ui/helpers/getColor'
import {CircleButton} from '../../ui/circle-button'
import {media} from '../../helpers/media'
import {TitleText} from '../../ui/title-text'
import {Wrapper} from '../../ui/wrapper'
import {Container} from '../../ui/grid/container'
import {isMobile} from 'react-device-detect'
import {Router} from '../../routes'

export const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 12000;
  width: 100%;
  height: 100%;
  padding: 6px 328px 0 328px;
  
  ${media.medium`
    padding: 6px 6px 0 328px;
  `}
  
  ${media.mobile`
    padding: 0;
    bottom: 0;
    top: unset;
    height: auto;
    max-height: 100%;
  `}
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
  animation: ${modalKeyFrameOpen} 0.3s ease-in-out;
  margin-top: auto;
  position: relative;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: ${p => p.padding};
  background: ${p => getColor(p.backColor, p.theme)};
  
  ${p => p.close && css`
    animation: ${modalKeyFrameClose} 0.3s ease-in-out;
  `}
  
  ${media.mobile`
    min-height: 100%;
    margin-bottom: auto;
    padding-bottom: 50px !important;
  `}
  
  ${p => media.mobile(p.mobilePadding && `padding: ${p.mobilePadding}`)}
  ${p => media.mobile(p.mobileMargin && `margin: ${p.mobileMargin}`)}
`

const ScrollContainer = styled.div`
  overflow-y: ${p => p.withoutScroll ? 'hidden' : 'auto'};
  height: auto;
  max-height: ${isMobile ? 'calc(100vh - 108px)' : 'calc(100vh - 48px)'};
  ${p => p.headerHeight && `
    max-height: ${isMobile ? `calc(100vh - 108px - ${p.headerHeight})` : `calc(100vh - 48px - ${p.headerHeight})`};
  `}
`
const modalBackdropOpen = keyframes`
  0% {
      opacity: 0;
  }
  100% {
      opacity: 1;
  }
`
const modalBackdropClose = keyframes`
  0% {
      opacity: 1;
  }
  100% {
      opacity: 0;
  }
`

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  animation: ${modalBackdropOpen} 0.3s ease-out;

  ${p => p.close && css`
    animation: ${modalBackdropClose} 0.3s ease-out;
  `}
`

const StyledTitleText = styled(TitleText)`
    ${media.mobile`
      max-width: 300px;
  `}
`

export const ModalTemplate = props => {
  const dispatch = useDispatch()
  const modalBody = useRef(null)
  const [close, toggleClose] = useState(false)
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(0)
  const modals = useSelector((state) => state.modal.queue)
  const modalContainer = useRef(null)
  const backDrop = useRef(null)

  useEffect(() => {
    modalBody.current.addEventListener('animationstart', () => {
      if (modals && modals.length === 1){
        modalContainer.current.style.overflow = 'auto'
        backDrop.current.style.background = 'rgba(0, 0, 0, 0.6)'
      } else {
        modalContainer.current.style.overflow = 'hidden'
        backDrop.current.style.background = 'transparent'
      }
    })
    modalBody.current.addEventListener('animationend', () => {
      if (close) {
        if(props.servicePay) {
          dispatch.profileProducts.getAvailableServices()
          dispatch.modal.deleteAllModals()
        }
        if(props.addCard) {
          dispatch.profileSettings.getCards()
        }
        if(props.payProduct) {
          Router.pushRoute('profile/products/check', {orderId: props.payProduct})
          dispatch.modal.deleteAllModals()
        }
        if(props.url){
          dispatch.modal.deleteAllModals()
        }
        dispatch.modal.deleteModal()
      }
    })
  }, [close])

  useEffect(() => {
    if (props.title) {
      setHeaderHeight(headerRef.current.offsetHeight + 'px')
    }
  }, [props.title])

  const handleClick = () => {
    toggleClose(true)
    props.onDelete && props.onDelete()
  }

  return (
    <ModalContainer ref={modalContainer}>
      <Backdrop onClick={handleClick} close={close} ref={backDrop}/>
      <ModalBody backColor={props.backColor !== null ? props.backColor : 'white'} mobileMargin={props.mobileMargin} padding={props.padding} ref={modalBody} close={close} mobilePadding={props.mobilePadding}>
        {props.title && (
          <Container ref={headerRef}>
            <Wrapper justify={'space-between'} padding={props.titlePadding} mobilePadding={props.titleMobilePadding}>
              <StyledTitleText>{props.title}</StyledTitleText>
              <Wrapper width={'auto'}>
                <CircleButton static={props.title} icon={props.icon} onClick={handleClick} zIndex={props.zIndex}/>
              </Wrapper>
            </Wrapper>
          </Container>
        )}
        {!props.disableIcon && !props.title && <CircleButton relative={props.title} icon={props.icon} onClick={() => toggleClose(true)} zIndex={props.zIndex}/>}
        <ScrollContainer withoutScroll={props.withoutScroll} headerHeight={headerHeight} onScroll={props.onScrollEvent}>
          {props.children}
        </ScrollContainer>
      </ModalBody>
    </ModalContainer>
  )
}

ModalTemplate.propTypes = {
  padding: PropTypes.string,
  mobilePadding: PropTypes.string,
  icon: PropTypes.string,
  backColor: PropTypes.string,
  disableIcon: PropTypes.bool,
  title: PropTypes.string,
  onScrollEvent: PropTypes.func,
  servicePay: PropTypes.bool,
  payProduct: PropTypes.string,
  withoutScroll: PropTypes.bool,
  addCard: PropTypes.bool,
}

ModalTemplate.defaultProps = {
  padding: '24px 0',
  mobilePadding: '16px 0',
  mobileMargin: '16px 0 0',
  icon: 'cross',
  backColor: 'white',
  disableIcon: false,
  title: '',
  titleMobilePadding: '0 0 16px 0',
  titlePadding: '0 0 16px 0',
  servicePay: false,
  payProduct: ''
}