import React from 'react'
import styled, { css } from 'styled-components'
import { Text } from '../../ui/text'
import { pluralize } from '../../ui/helpers/pluralize'
import { media } from '../../helpers/media'
import { Wrapper } from '../../ui/wrapper'
import {getTranslator} from '../../utils/translation'
import {useSelector, useDispatch} from 'react-redux'
import {CartBlockSmall} from './diagnostics-cart-small'
import {useRouter} from 'next/dist/client/router'

const CartContainer = styled.div`
  z-index: 10000;
  position: fixed;
  right: 350px;
  bottom: ${p => p.isChat ? '74px' : '10px'};
  visibility: hidden;
  height: 0;
  transition: height 0.5s visibility 0.5s opacity 0.1s;
  
  ${p => p.hide && css`
    display: none;
  `}
  
  ${p => p.active && css`
    visibility: visible;
    height : 64px;
    opacity: 1;

    ${media.medium`
      right: 12px;
      bottom: 10px;
  `}

   ${media.mobile`
      right: 10px;
      bottom: 78px;
      height : 48px;
    `}
  `}
  
   ${p => media.medium(p.isChat && 'bottom: 74px;')}
   ${p => media.mobile(p.isChat && 'bottom: 140px;')}

  &:hover {
    cursor: pointer;
  }
`
const CartWell = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 169px;
  height: inherit;
  position: relative;
  top: 0;
  padding: 8px;
  background: black;
  opacity: 0.8;
  backdrop-filter: blur(100px);
  border-radius: 16px;

  ${media.mobile`
    padding: 0;
    width: auto;
    border-radius: 12px;
  `}
`

const TitleWrapper = styled(Wrapper)`
  ${media.mobile`
    display: none;
  `}
`

export const CartBlock = ({isChat = false}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const translator = useSelector(state => getTranslator(state.localization))
  const cartSum = useSelector(state => state.clinics.cartSum)
  const type = useSelector(state => state.mediachat.type)
  const cart = useSelector((state) => state.clinics.cart)
  const itemsCount = cart && cart.reduce((sum, {qty}) => sum + qty, 0)
  const showClinicCart = () => dispatch.modal.addAndShowModal({ type: 'clinic-cart' })
  const hideCart = router.pathname === '/consultation' && type !== 'chat'

  return (
    <CartContainer hide={hideCart} active={itemsCount} isChat={isChat}>
      <CartWell onClick={showClinicCart}>
        <CartBlockSmall itemsCount={itemsCount}>
          <TitleWrapper flow={'column'} padding={'0 0 0 12px'} width={'auto'}>
            <Text width={'auto'} color={'white'}>
              {`
              ${pluralize(itemsCount, `${translator('clinic.diagnostics.cart.service', true)}`, `${translator('clinic.diagnostics.cart.services', true)}`, `${translator('clinic.diagnostics.cart.of-services', true)}`)}`}
            </Text>
            <Text width={'auto'} color={'black40'}>
              {`${cartSum} ${translator('clinic.diagnostics.currency', true)}`}
            </Text>
          </TitleWrapper>
        </CartBlockSmall>
      </CartWell>
    </CartContainer>
  )
}
