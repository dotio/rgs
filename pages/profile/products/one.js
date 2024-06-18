import React from 'react'
import {ProductHeader} from '../../../features/profile/products/product-one/header'
import {ProductDetail} from '../../../features/profile/products/product-one/detail'
import {AboutProduct} from '../../../features/profile/products/product-one/about-product'
import styled from 'styled-components'
import {redirectNotAuth} from '../../../lib/redirect'

const PageBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const ProductOne = () => {
  return <PageBox>
    <ProductHeader />
    <ProductDetail />
    <AboutProduct />
  </PageBox>
}

ProductOne.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx
  const medcardId = reduxStore.getState().user.mainMedcardId
  await Promise.all([
    reduxStore.dispatch.profileProducts.getCurrentProduct({productId: query.productId, boxId: query.boxId}),
    reduxStore.dispatch.profileProducts.getProducts({medcardId})
  ])

  ctx.reduxStore.dispatch.router.setPageTitle(`Продукт "${reduxStore.getState().profileProducts.currentProduct.name}"`)
}

export default ProductOne