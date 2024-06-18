import React from 'react'
import {redirectNotAuth} from '../../../lib/redirect'
import {ProductCheckComponent} from '../../../features/profile/products/check'

const Check = ({orderId}) => {
  return <ProductCheckComponent orderId={orderId} />
}

Check.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)
  const {query} = ctx
  return {
    orderId: query.orderId
  }
}

export default Check