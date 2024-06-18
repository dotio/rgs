import React from 'react'
import styled from 'styled-components'
import {Router} from '../../../routes'
import {getColor} from '../../../ui/helpers/getColor'
import {Img} from '../../../ui/img'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import moment from 'moment'
import {T} from '../../../utils/translation'

const ProductWrapper = styled.div`
  height: 112px;
  display: flex;
  border: 1px solid ${p => getColor('black10', p.theme)};
  border-radius: 20px;
  padding: 16px;
  cursor: pointer;
`

const StyledText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const ProductCard = ({id, title, boxId, image, date}) => {
  return (
    <ProductWrapper onClick={() => Router.pushRoute('profile/products/one', {productId: id, boxId})}>
      <Wrapper margin={{right: '16px'}} width={'auto'}>
        <Img src={image ? image : '/static/product/empty-product.svg'} borderRadius={'16px'} width={'80px'} height={'80px'}/>
      </Wrapper>
      <Wrapper flow={'column'}>
        <StyledText>{title}</StyledText>
        {date !== null ?
          <Text color={'black50'}><T ucFirst>profile.product.card.before</T> {moment(date).format('DD.MM.YYYY')}
          </Text> : ''}
      </Wrapper>
    </ProductWrapper>
  )
}