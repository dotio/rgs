import React from 'react'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Col} from '../../../../ui/grid/col'
import {Row} from '../../../../ui/grid/row'
import {Img} from '../../../../ui/img'
import {Text} from '../../../../ui/text'
import {Wrapper} from '../../../../ui/wrapper'
import {useSelector} from 'react-redux'
import {Accordion} from '../../../../ui/accordion'
import styled from 'styled-components'
import {getColor} from '../../../../ui/helpers/getColor'
import {TitleText} from '../../../../ui/title-text'
import {Gap} from '../../../../ui/gap'
import {Router} from '../../../../routes'
import {T} from '../../../../utils/translation'
import {getTranslator} from '../../../../utils/translation'

const ProductWrapper = styled.div`
  display: flex;
  border: 1px solid ${p => getColor('black10', p.theme)};
  border-radius: 20px;
  padding: 16px;
  cursor: pointer;
  margin-bottom: 12px;
`

export const AboutProduct = () => {
  const product = useSelector(state => state.profileProducts.currentProduct)
  const products = useSelector(state => state.profileProducts.products)
  const myProducts = useSelector(state => state.profileProducts.myProducts)
  const isActive = !!myProducts.filter(item => item.id === product.id)
  const translator = useSelector(state => getTranslator(state.localization))

  const {information, expiryDate, legalText, daysLeft} = product
  const otherProducts = products.filter(item => item.id !== product.id)

  return (
    <Well color={'transparent'} padding={'48px 0 54px'} mobilePadding={'48px 0 8px'}>
      <Container>
        <Gap gap={'24px'}>
          {expiryDate && <Row>
            <Col lg={{cols: 5}} sm={{cols: 12}}>
              <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'}><T ucFirst>product.current.expery.title</T></Text>
            </Col>
            <Col lg={{cols: 7}} sm={{cols: 12}}>
              <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}>{expiryDate}</Text>
              {isActive && <Text
                size={'20px'}
                lineHeight={'30px'}
                color={'secondary'}
                smSize={'16px'}
                smLineHeight={'24px'}
              >
                {daysLeft}
              </Text>}
            </Col>
          </Row>}
          {information && information.length > 0 && <Row>
            <Col lg={{cols: 5}} sm={{cols: 12}}>
              <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} color={'black50'}><T ucFirst>product.current.info.title</T></Text>
            </Col>
            <Col lg={{cols: 7}} sm={{cols: 12}}>
              {information.map((item, index) => (
                <Text key={index} size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}>{item}</Text>
              ))}
            </Col>
          </Row>}
        </Gap>
        {legalText && <Wrapper padding={'36px 0 0'}>
          <Accordion title={translator('product.current.legal-text', true)}>
            <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'}>
              {legalText}
            </Text>
          </Accordion>
        </Wrapper>}
        {otherProducts && otherProducts.length > 0 &&
          <Row>
            <TitleText padding={'72px 0 16px'}><T ucFirst>product.current.other.title</T></TitleText>
            {otherProducts.map(currentProduct => (
              <Col key={currentProduct.id} lg={{cols: 6}} sm={{cols: 12}}>
                <ProductWrapper onClick={() => Router.pushRoute('/profile/products/' + currentProduct.id)}>
                  <Wrapper margin={{right: '16px'}} width={'auto'}>
                    <Img
                      src={currentProduct.image || '/static/banners/docOnline.svg'}
                      borderRadius={'16px'}
                      width={'80px'}
                      height={'80px'}
                    />
                  </Wrapper>
                  <Wrapper flow={'column'}>
                    <Text>{currentProduct.name}</Text>
                    <Text color={'black50'}>{currentProduct.subtitle}</Text>
                  </Wrapper>
                </ProductWrapper>
              </Col>
            ))}
          </Row>}
      </Container>
    </Well>
  )
}
