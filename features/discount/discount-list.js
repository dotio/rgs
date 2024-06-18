import React from 'react'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Discount} from './discount'
import {Text} from '../../ui/text'
import {Gap} from '../../ui/gap'
import styled from 'styled-components'
import {media} from '../../helpers/media'

const TitleText = styled(Text)`
  font-size: 28px;
  line-height: 32px;
  
  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
  `} 
`

export const DiscountList = ({discounts, title}) => {
  return (
    <Container>
      <Row>
        <Col>
          <Gap gap={'16px'}>
            <TitleText>{title}</TitleText>
            <div>
              {discounts.map((discount, index) =>
                <Discount key={index} {...discount} />
              )}
            </div>
          </Gap>
        </Col>
      </Row>
    </Container>
  )
}