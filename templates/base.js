import React, { useEffect, useState, useRef, forwardRef } from 'react'
import {connect} from 'react-redux'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {subscriptionCreator} from '../helpers/pubsub'
import {subscriptionCreator as wsSubscriptionCreator} from '../helpers/websocket'
import {container} from '../helpers/container'
import {media} from '../helpers/media'
import {Loader} from '../ui/loader'
import {Consultation} from '../features/consultation'
import {ChatButton} from '../ui/chat-button'
import {CartBlock} from './cart/diagnostics-cart'

const SideTemplate = styled.div`
  position: ${p => p.position};
  width: 316px;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  flex-direction: column;
`

const LeftSideTemplate = styled(forwardRef((props, ref) => <SideTemplate ref={ref} {...props}/>))`
  margin-right: 6px;
  height: ${p => p.height ? p.height : '100%'};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  
  ${p => p.isLoginScreen && css`
    display: none;
  `}
  
  ${media.mobile`
    display: none;
  `}
  
  ${p => p.top && `
    top: ${p.top}
  `}
  
  ${p => p.bottom && `
    bottom: ${p.bottom}
  `}
`

const RightSideTemplate = styled(forwardRef((props, ref) => <SideTemplate ref={ref} {...props}/>))`
  right: 6px;
  top: 6px;
  bottom: 6px;
  height: auto;
  min-width: 316px;
  ${p => media.mobile(`
    bottom: calc(${parseInt(p.mobileBottomPadding)}px + 6px);
    top: 0;
    right: 0;
  `)}
  
  ${p => p.isConsultation ? css`
    width: ${p.consultationRightWidth}px;
    opacity: ${p.consultationRightWidth ? '1' : '0'};
    flex-shrink: 1;
    flex-grow: 1;
    margin-right: ${p.disableMargin ? '0': '322px'};
    ${media.mobile`
      margin-right: 0;
    `}
   
    ${media.medium`
      margin-right: 0;
    `}
  ` : css`
    margin-left: 6px;
    ${!p.isLoginScreen && media.mobile`
      display: none;
    `}
    ${media.medium`
      display: none;
    `}
  `}
  
  ${p => !p.isConsultation && p.isLoginScreen && media.mobile`
    width: 100%;
    transform: translateY(100%);
    transition: transform 0.3s linear;
    bottom: 0;
    z-index: 10001;
  `}
  
  ${p => !p.isConsultation && p.isLoginScreen && p.showConsultationModal && media.mobile`
    transform: translateY(0);
  `}
  
  ${p => p.withAnimation && `
    transition: width 0.3s linear, opacity 0.5s ease-out;
  `}
`

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px;
  position: relative;
  ${p => media.mobile(`
    padding: 0 0 ${p.mobileBottomPadding}px;
  `)}
`

const CenterTemplate = styled.div`
  display: flex;
  margin: auto;
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  flex-direction: column;
  flex-shrink: 1;
  
  ${media.mobile`
    padding-bottom: 6px;
  `}
`

const BottomTemplate = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: none;
  ${p => media.mobile(`
      display: ${p.isHide ? 'none' : 'flex' }
  `)}
`

const BaseTemplatePure = (props) => {
  let prevScroll = 0
  let unsub = null
  let wsSub = null

  const [bottomTemplateHeight, setBottomTemplateHeight] = useState(0)
  const [consultationRightWidth, setConsultationRightWidth] = useState(0)
  const [consultationType, setConsultationType] = useState('chat')
  const bottomTemplateRef = useRef(null)
  const hiddenRightTemplate = useRef(null)
  const leftSideTemplate = useRef(null)

  const onDocumentScroll = (e) => {
    if (prevScroll) {
      const differenceScroll = prevScroll - e.target.documentElement.scrollTop
      const scrollDirectionBottom = differenceScroll < 0

      leftSideTemplate.current.style.overflowY = 'auto'

      let scrollTop = null

      if (scrollDirectionBottom) {
        scrollTop = Math.min(
          leftSideTemplate.current.scrollHeight,
          leftSideTemplate.current.scrollTop + Math.abs(differenceScroll)
        )
      } else {
        scrollTop = leftSideTemplate.current.scrollTop - differenceScroll
      }

      leftSideTemplate.current.scrollTop = scrollTop

      leftSideTemplate.current.style.overflowY = 'hidden'
    } else {
      leftSideTemplate.current.scrollTop = 0
    }

    prevScroll = e.target.documentElement.scrollTop
  }

  const onResize = () => {
    if(props.isConsultation) {
      setConsultationRightWidth(hiddenRightTemplate.current.getBoundingClientRect().width)
    }
  }

  const onCartUpdate = () => props.fetchCart(true)

  useEffect(() => {
    document.addEventListener('scroll', onDocumentScroll)
    window.addEventListener('resize', onResize)

    setBottomTemplateHeight(bottomTemplateRef.current.getBoundingClientRect().height)
    if(props.isConsultation) {
      setConsultationRightWidth(hiddenRightTemplate.current.getBoundingClientRect().width)
    }

    unsub = subscriptionCreator({
      'consultationType': setConsultationType
    })

    wsSub = wsSubscriptionCreator({
      'cart-update': onCartUpdate
    }, container.get('ws'))

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('scroll', onDocumentScroll)
      unsub && unsub()
      wsSub && wsSub()
    }
  })

  return (
    <MainContainer mobileBottomPadding={`${bottomTemplateHeight}`}>
      <LeftSideTemplate height={'auto'} top={'6px'} bottom={'6px'} position={'fixed'} ref={leftSideTemplate} isLoginScreen={props.isLoginScreen}>
        {props.leftBlock}
      </LeftSideTemplate>
      <LeftSideTemplate isLoginScreen={props.isLoginScreen} />
      {!props.isConsultation && (
        <CenterTemplate>
          {props.children}
          <Loader fixed={true} bgColor={'rgba(255, 255, 255, 0.7)'} color={'primary'} center={true} show={props.centerLoader}/>
          {props.isLoggedIn && !props.isLoginScreen && <CartBlock />}
        </CenterTemplate>
      )}
      <RightSideTemplate
        ref={hiddenRightTemplate}
        isConsultation={props.isConsultation}
        disableMargin={consultationType !== 'chat'}
      />
      <RightSideTemplate
        position={'fixed'}
        mobileBottomPadding={bottomTemplateHeight}
        consultationRightWidth={consultationRightWidth}
        isConsultation={props.isConsultation}
        isLoginScreen={props.isLoginScreen}
        disableMargin={consultationType !== 'chat'}
        showConsultationModal={props.showConsultationModal}
        withAnimation
      >
        <Consultation isModal={props.isLoginScreen} />
        {props.isConsultation && props.isLoggedIn && <CartBlock isChat />}
      </RightSideTemplate>
      <BottomTemplate
        ref={bottomTemplateRef}
        isHide={(props.isConsultation && consultationType !== 'chat') || props.isLoginScreen || !props.showBottomTemplate}
      >
        {props.bottomBlock}
      </BottomTemplate>
      <Loader fixed={true} bgColor={'rgba(255, 255, 255, 0.7)'} color={'primary'} global={props.isLoginScreen} center={!props.isLoginScreen} right={false} show={props.showLoader} />
      {props.rightLoader && <Loader fixed={true} bgColor={'rgba(255, 255, 255, 0.7)'} color={'primary'} right={true} show={true} />}
      {props.isLoginScreen && !props.isConsultation && <ChatButton />}
    </MainContainer>
  )
}
BaseTemplatePure.propTypes = {
  showLoader: PropTypes.bool,
  leftBlock: PropTypes.element,
}

const mapStateToProps = state => ({
  centerLoader: state.loaders.center,
  showLoader: (state.router.isLoading || state.loaders.global) && !state.loaders.center,
  rightLoader: state.loaders.right,
  showBottomTemplate: state.router.bottomTemplate,
  isLoggedIn: state.login.loggedIn,
  showConsultationModal: state.router.showConsultationModal,
})

const mapDispatchToProps = dispatch => ({
  fetchCart: (force) => dispatch.clinics.fetchCart(force),
})

export const BaseTemplate = connect(mapStateToProps, mapDispatchToProps)(BaseTemplatePure)

BaseTemplate.propTypes = {
  leftBlock: PropTypes.element,
}

