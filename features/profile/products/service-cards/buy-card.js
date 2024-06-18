import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {Text} from '../../../../ui/text'
import {ServiceCardWell} from './service-card-well'
import {Wrapper} from '../../../../ui/wrapper'
import {Button} from '../../../../ui/button'
import {TitleText} from '../../../../ui/title-text'
import {media} from '../../../../helpers/media'
import {Icon} from '../../../../ui/icon'
import {CardTooltip} from '../components/card-tooltip'
import {isMobile} from 'react-device-detect'

const BuyServiceCardWell = styled(ServiceCardWell)`
  ${media.mobile`
    width: 100%;
  `}
`

const ContentWrapper = styled(Wrapper)`
  height: 100%;
  position: relative;
  
  ${media.mobile`
    min-height: 103px;
  `}
`

const IconWrapper = styled(Wrapper)`
  position: relative;
`

export const BuyCard = ({id, title, count, price, description, type}) => {
  const dispatch = useDispatch()

  const handleBuy = () => {
    dispatch.modal.addAndShowModal({type: 'products-selection-modal', productId: id})
  }

  const handleOperatorBuy = async () => {
    dispatch.loaders.showLoader()

    await dispatch.consultation.createOrGoToActive({type: 'chat', redirect: true})
    await dispatch.profileProducts.create({productId: id})

    dispatch.loaders.hideLoader()
  }

  return (
    <BuyServiceCardWell border={'black15'} color={'white'} padding={'16px'} mobilePadding={'12px'}>
      <ContentWrapper justify={'space-between'} flow={'column'} gap={'12px'}>
        <Wrapper justify={'space-between'}>
          <Text width={'auto'} align={'left'} color={'black'}>{title}</Text>
          {isMobile && description ? <IconWrapper
            width={'auto'}
            onClick={() => dispatch.modal.addAndShowModal({type: 'product-card-modal', data: {title, description}})}
          >
            <Icon type={'info'} width={20} height={20} color={'black50'} cursor={'pointer'}/>
          </IconWrapper> : description && <CardTooltip description={description}/>}
        </Wrapper>
        <Wrapper justify={'space-between'} align={'center'}>
          <TitleText width={'auto'} align={'left'} color={'primary'}>{count}</TitleText>
          <Button color={'primary'} onClick={type === 'operator' ? handleOperatorBuy : handleBuy}>{price}</Button>
        </Wrapper>
      </ContentWrapper>
    </BuyServiceCardWell>
  )
}