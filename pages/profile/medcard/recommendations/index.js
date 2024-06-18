import React from 'react'
import {RecommendationsListComponent} from '../../../../features/profile/medcard/recommendations'
import {redirectNotAuth} from '../../../../lib/redirect'
import {BackTemplate} from '../../../../features/profile/back-template'

const Recommendations = ({medcardId, isMainMedcard}) => {
  const parentLink = isMainMedcard ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`
  return (
    <BackTemplate title={'Рекомендации'} parentLink={parentLink} parent={'Медкарта'} backUrl={parentLink}>
      <RecommendationsListComponent medcardId={medcardId}/>
    </BackTemplate>
  )
}

Recommendations.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Рекомендации')

  const {reduxStore, query} = ctx
  const {medcardId, ...filters} = query
  const currentMedcardId = Number(medcardId || reduxStore.getState().user.mainMedcardId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.getRecommendations({medcardId: currentMedcardId, filters}, reduxStore.getState()),
    reduxStore.dispatch.profileMedcard.setRecommendationsFilters(filters),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
  ])

  return {
    medcardId: currentMedcardId,
    isMainMedcard: currentMedcardId === reduxStore.getState().user.mainMedcardId,
  }
}

export default Recommendations