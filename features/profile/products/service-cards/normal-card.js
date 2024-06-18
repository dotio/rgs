import React, {useState} from 'react'
import styled from 'styled-components'
import {media} from '../../../../helpers/media'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {ServiceCardWell} from './service-card-well'
import {Wrapper} from '../../../../ui/wrapper'
import {useDispatch} from 'react-redux'
import {Button} from '../../../../ui/button'
import {T} from '../../../../utils/translation'
import {isMobile} from 'react-device-detect'
import {Icon} from '../../../../ui/icon'
import {CardTooltip} from '../components/card-tooltip'

const ContentWrapper = styled(Wrapper)`
  height: 100%;
  position: relative;
  
  ${media.mobile`
    min-height: 103px;
  `}
`

const ButtonWrapper = styled(Wrapper)`
  min-width: 95px;
`

const IconWrapper = styled(Wrapper)`
  position: relative;
`

export const NormalCard = ({id, title, count, price, description}) => {
  const dispatch = useDispatch()

  const [hover, setHover] = useState(false)

  const handleBuy = () => {
    dispatch.modal.addAndShowModal({type: 'products-selection-modal', productId: id})
  }

  return <ServiceCardWell color={'black05'} padding={'16px'} mobilePadding={'12px'}>
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
        <TitleText width={'auto'} align={'left'} size={'28px'} lineHeight={'32px'}>{count}</TitleText>
        <ButtonWrapper width={'auto'} onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} onClick={handleBuy} justify={'flex-end'}>
          <Button color={hover ? 'primary' : 'transparent'}>
            {hover ? price : <T ucFirst>profile.product.avalivale.buy-more</T>}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </ContentWrapper>
  </ServiceCardWell>
}