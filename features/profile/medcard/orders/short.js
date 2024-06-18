import React from 'react'
import styled from 'styled-components'
import {Container} from '../../../../ui/grid/container'
import {Wrapper} from '../../../../ui/wrapper'
import {media} from '../../../../helpers/media'
import {OrderBlock} from '../components/order-block'
import {SectionTitle} from '../../components/section-title'
import {AddContentBlock} from '../components/add-content-block'
import {useDispatch, useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'

const OrdersWrapper = styled(Wrapper)`
  ${media.mobile`
    overflow-x: auto;
    flex-wrap: nowrap;
  `}
`

export const OrdersShort = ({medcardId}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const {items, total} = useSelector(state => state.profileMedcard.orders)
  const dispatch = useDispatch()

  const openNewOrderModal = () => {dispatch.modal.addAndShowModal({type: 'new-order-modal', medcardId})}
  return (
    <Container>
      <Wrapper flow={'column'}>
        <SectionTitle
          title={translator('profile.medcard.order-short.appeals', true)}
          count={total}
          link={total > 0 ? `/profile/${medcardId}/medcard/orders` : ''}
        />
        {items.length
          ? <OrdersWrapper gap={'12px'}>
            {items.slice(0, 3).map(order => (
              <OrderBlock
                key={order.id}
                {...order}
              />
            ))}
          </OrdersWrapper>
          : <AddContentBlock onAddContent={openNewOrderModal} />
        }
      </Wrapper>
    </Container>
  )
}