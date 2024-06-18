import React from 'react'
import {OrdersListComponent} from '../../../../features/profile/medcard/orders'
import {redirectNotAuth} from '../../../../lib/redirect'
import {BackTemplate} from '../../../../features/profile/back-template'

const Orders = ({medcardId, isMainMedcard}) => {
  const parentLink = isMainMedcard ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`

  return (
    <BackTemplate title={'Обращения'} parent={'Медкарта'} parentLink={parentLink} backUrl={parentLink}>
      <OrdersListComponent medcardId={medcardId}/>
    </BackTemplate>
  )
}

Orders.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)
  ctx.reduxStore.dispatch.router.setPageTitle('Обращения')

  const {reduxStore, query} = ctx

  const {medcardId, ...filters} = query
  const currentMedcardId = Number(medcardId || reduxStore.getState().user.mainMedcardId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.getOrders({medcardId: currentMedcardId, filters}, reduxStore.getState()),
    reduxStore.dispatch.profileMedcard.setOrdersFilters(filters),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
  ])

  return {
    medcardId: currentMedcardId,
    isMainMedcard: currentMedcardId === reduxStore.getState().user.mainMedcardId,
  }
}

export default Orders