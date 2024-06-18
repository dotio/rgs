import React from 'react'
import {ProfileTemplate} from '../../../features/profile/template'
import {MedcardComponent} from '../../../features/profile/medcard'
import {redirectNotAuth} from '../../../lib/redirect'

const Medcard = ({medcardId}) => (
  <ProfileTemplate medcardId={medcardId}>
    <MedcardComponent medcardId={medcardId} />
  </ProfileTemplate>
)

Medcard.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx

  reduxStore.dispatch.router.setPageTitle('Медкарта')

  const medcardId = query.medcardId ? query.medcardId : reduxStore.getState().user.mainMedcardId

  await Promise.all([
    ctx.reduxStore.dispatch.profileMedcard.getOrders({medcardId, limit: 3}),
    ctx.reduxStore.dispatch.profileMedcard.getResearches({medcardId, limit: 3, offset: 0}, reduxStore.getState()),
    ctx.reduxStore.dispatch.profileMedcard.getRecommendations({medcardId, offset: 0}, reduxStore.getState()),
    ctx.reduxStore.dispatch.profileMedcard.getFiles({medcardId, limit: 3, offset: 0}),
    ctx.reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
    ctx.reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    ctx.reduxStore.dispatch.profileMedcard.getStatus(medcardId),
  ])

  return {
    medcardId,
  }
}

export default Medcard