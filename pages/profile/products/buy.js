import React from 'react'
import {ProductBuyComponent} from '../../../features/profile/products/buy'
import {redirectNotAuth} from '../../../lib/redirect'

const Buy = () => {
  return <ProductBuyComponent />
}

Buy.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)
  const {reduxStore, query} = ctx
  await reduxStore.dispatch.profileProducts.getCurrentProduct(query.productId)
}

export default Buy