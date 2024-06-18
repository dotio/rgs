import React from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {ModalTemplate} from '../../../../templates/modal'
import {TitleText} from '../../../../ui/title-text'
import {Col} from '../../../../ui/grid/col'
import {Row} from '../../../../ui/grid/row'
import {Wrapper} from '../../../../ui/wrapper'
import {Img} from '../../../../ui/img'
import {Text} from '../../../../ui/text'
import {getColor} from '../../../../ui/helpers/getColor'
import {Button} from '../../../../ui/button'
import {T} from '../../../../utils/translation'

const PRODUCT_PAY_MAPPING = [
  {
    title: <T ucFirst>product.pay.validity</T>,
    description: '365 дней с даты оплаты'
  },
  {
    title: <T ucFirst>product.pay.limits</T>,
    description: 'Для лиц в возрасте от 18 до 85 лет включительно.'
  },
  {
    title: <T ucFirst>product.pay.method</T>,
    description: 'Картой •••• 4276',
    button: true
  },
  {
    title: <T ucFirst>product.pay.to-pay</T>,
    description: '4 900 ₽',
  },
]

const ProductWrapper = styled.div`
  height: 112px;
  display: flex;
  border: 1px solid ${p => getColor('black10', p.theme)};
  border-radius: 20px;
  padding: 16px;
  cursor: pointer;
`

export const ProfileProductModal = () => {

  return (
    <ModalTemplate>
      <Well>
        <Container>
          <TitleText padding={'0 0 24px'}><T ucFirst>product.pay.title</T></TitleText>
          <Row>
            <Col lg={{cols: 6, paddingBottom: '24px'}} sm={{cols: 12}}>
              <ProductWrapper>
                <Wrapper margin={{right: '16px'}} width={'auto'}>
                  <Img
                    src={'/static/banners/docOnline.svg'}
                    borderRadius={'16px'}
                    width={'80px'}
                    height={'80px'}
                  />
                </Wrapper>
                <Wrapper flow={'column'}>
                  <Text><T ucFirst>product.pay.product</T></Text>
                </Wrapper>
              </ProductWrapper>
            </Col>
          </Row>
          <Row>
            {PRODUCT_PAY_MAPPING.map(({title, description, button}, index)=> <>
              <Col lg={{cols: 4, paddingBottom: '24px'}} sm={{cols: 12}} key={index}>
                <Text size={'20px'} lineHeight={'30px'} color={'black50'}>{title}</Text>
              </Col>
            <Col lg={{cols: 8, paddingBottom: '24px'}} sm={{cols: 12}}>
              <Text size={'20px'} lineHeight={'30px'}>{description}</Text>
              {button ? <Button color={'black05'}><T ucFirst>product.pay.change.button</T></Button> : null}
            </Col>
          </>
            )}
          </Row>
          <Button color={'primary'}><T ucFirst>product.pay.pay.button</T></Button>
        </Container>
      </Well>
    </ModalTemplate>
  )
}
