import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {ProductSuccess} from '../../../features/profile/products/product-success'
import {redirectNotAuth} from '../../../lib/redirect'

const PageBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const Success = () => {
  const productSuccess = useSelector(state => state.profileProducts.productSuccess)
  return (
    <PageBox>
      <ProductSuccess data={productSuccess}/>
    </PageBox>
  )
}

Success.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)
  const {reduxStore, query} = ctx
  const productId = query.productId
  await reduxStore.dispatch.profileProducts.getProductSuccess(productId)
}

export default Success