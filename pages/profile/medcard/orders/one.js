import React from 'react'
import {OrderOneComponent} from '../../../../features/profile/medcard/orders/one'
import {redirectNotAuth} from '../../../../lib/redirect'

const OrderOne = ({medcardId}) => {
  return <OrderOneComponent  medcardId={medcardId}/>
}

OrderOne.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)
  const {reduxStore, query} = ctx
  const currentMedcardId = Number(query.medcardId || reduxStore.getState().user.mainMedcardId)

  ctx.reduxStore.dispatch.router.setPageTitle('Обращение №' + ctx.query.orderId)


  await Promise.all([
    reduxStore.dispatch.profileMedcard.getOrder(query.orderId),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
  ])

  return {
    medcardId: currentMedcardId,
  }
}

export default OrderOne