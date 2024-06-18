import React from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {TitleText} from '../../../../ui/title-text'
import {Wrapper} from '../../../../ui/wrapper'
import {media} from '../../../../helpers/media'
import {OrderInfo} from './order-info'
import moment from 'moment'

const HeaderWrapper = styled(Wrapper)`
  ${TitleText} {
    width: 50%;
    
    ${media.mobile`
      width: 100%;
    `}
  }

  ${media.mobile`
    flex-direction: column-reverse;
  `}
`

const TitleRightText = styled(TitleText)`
   ${media.mobile`
      text-align: left;
   `}
`

export const OrderDateListItem = ({date, note, list}) => {
  return (
    <Well>
      <Container>
        <HeaderWrapper>
          <TitleText color={'black'}>{moment(date).format('DD MMMM')}</TitleText>
          {note && <TitleRightText align={'right'} color={'secondary'}>{note}</TitleRightText>}
        </HeaderWrapper>
      </Container>
      <Wrapper gap={'36px'} flow={'column'}>
        {list.map(order => <OrderInfo key={order.id} {...order}/>)}
      </Wrapper>
    </Well>
  )

}