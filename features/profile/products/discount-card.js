import React from 'react'
import styled from 'styled-components'
import {Img} from '../../../ui/img'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {media} from '../../../helpers/media'

const DiscountWell = styled.div`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  min-height: 112px;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-radius: 20px;
  width: 100%;
  background-color: ${p => getColor('white', p.theme)};
  cursor: pointer;
`

const TextsWrapper = styled.div`
  display: flex;
  max-width: 400px;
  justify-content: flex-start;
  flex-direction: column;
`

const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 100%;
  width: auto;
  flex-shrink: 0;
  align-items: flex-end;
  ${media.mobile`
    align-items: flex-start;
  `}
  
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`

export const DiscountCard = ({photo, title, subtitle, price, oldprice, onClick}) => {
  return (
    <DiscountWell padding={'16px'} onClick={onClick}>
      <Wrapper align={'center'} margin={{right: '16px'}} width={'auto'}>
        <Img height={'80px'} width={'80px'} shrink={'0'} src={photo} />
      </Wrapper>
      <ContentWrapper>
        <TextsWrapper>
          <Text breakWord align={'left'}>{title}</Text>
          {subtitle && <Text breakWord align={'left'} color={'black50'}>{subtitle}</Text>}
        </TextsWrapper>
        <PriceWrapper>
          <Text width={'auto'} color={'primary'} size={'28px'} lineHeight={'32px'}>{price}</Text>
          {oldprice && <Text width={'auto'} decoration={'line-through'} color={'black40'}>{oldprice}</Text>}
        </PriceWrapper>
      </ContentWrapper>
    </DiscountWell>
  )
}