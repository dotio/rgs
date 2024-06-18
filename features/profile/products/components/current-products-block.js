import React from 'react'
import {useSelector} from 'react-redux'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {splitEvery} from 'ramda'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Gap} from '../../../../ui/gap'
import {ProductCard} from '../product-card'
import styled from 'styled-components'
import {TitleText} from '../../../../ui/title-text'
import {T} from '../../../../utils/translation'
import {DiscountCard} from '../discount-card'
import {Wrapper} from '../../../../ui/wrapper'
import {Router} from '../../../../routes'
import {media} from '../../../../helpers/media'

const StyledWell = styled(Well)`
  margin-top: 0;
  ${media.mobile`
    margin-top: 6px;
  `}
`

export const CurrentProductsBlock = () => {
  const myProducts = useSelector(state => state.profileProducts.myProducts)
  const products = useSelector(state => state.profileProducts.products)

  return <>
    <Well>
      <Container>
        {myProducts.length === 0
          ? <TitleText color={'black50'}><T ucFirst>product.current.no-products.title</T></TitleText>
          : <TitleText padding={'0 0 16px'} color={'black'}><T ucFirst>profile.product.current.title</T></TitleText>
        }
        {myProducts.length === 0 && <TitleText><T ucFirst>product.current.no-products.description</T></TitleText>}
        <Gap direction={'top'} gap={'12px'}>
          {splitEvery(2, myProducts).map((group, index) => (
            <Row key={index}>
              {group.map((product, index) =>
                <Col key={index} lg={{cols: 6}} sm={{cols: 12, paddingBottom: index === 0 ? '12px' : ''}}>
                  <ProductCard {...product}/>
                </Col>
              )}
            </Row>
          ))}
        </Gap>
      </Container>
    </Well>
    {myProducts.length < 0 && <StyledWell color={'#C5EAE0'}>
      <Container>
        <TitleText padding={'0 0 16px'}><T ucFirst>product.current.connect-new.title</T></TitleText>
        <Wrapper gap={'12px'} flow={'column'}>
          {products.map(({id, name, subtitle, image, price, oldprice}, index)=>(
            <DiscountCard
              key={index}
              title={name}
              photo={image ? image: '/static/banners/docOnline.svg'}
              oldprice={oldprice}
              price={price}
              subtitle={subtitle}
              onClick={() => Router.pushRoute(`/profile/products/${id}`)}
            />
          ))}
        </Wrapper>
      </Container>
    </StyledWell>}
  </>
}