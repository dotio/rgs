import React from 'react'
import {ProfileTemplate} from '../../../features/profile/template'
import {AvailableServicesBlock} from '../../../features/profile/products/components/available-services-block'
import {CurrentProductsBlock} from '../../../features/profile/products/components/current-products-block'
import {redirectNotAuth} from '../../../lib/redirect'

const ProductsList = ({medcardId}) => {
  return (
    <ProfileTemplate medcardId={medcardId}>
      <AvailableServicesBlock/>
      <CurrentProductsBlock/>
    </ProfileTemplate>
  )
}

ProductsList.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Продукты')

  const {reduxStore} = ctx
  const medcardId = reduxStore.getState().user.mainMedcardId
  await Promise.all([
    reduxStore.dispatch.profileProducts.getAvailableServices(),
    reduxStore.dispatch.profileProducts.getMyProducts(),
    reduxStore.dispatch.profileProducts.getProducts({medcardId}),
  ])

  return {
    medcardId
  }
}

export default ProductsList