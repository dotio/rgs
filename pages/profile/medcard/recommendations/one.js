import React from 'react'
import {RecommendationComponent} from '../../../../features/profile/medcard/recommendations/one'
import {redirectNotAuth} from '../../../../lib/redirect'

const Recommendation = ({medcardId}) => {
  return <RecommendationComponent medcardId={medcardId}/>
}

Recommendation.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)
  const {reduxStore, query} = ctx
  const currentMedcardId = Number(query.medcardId || reduxStore.getState().user.mainMedcardId)

  reduxStore.dispatch.router.setPageTitle('Рекомендация №' + query.recommendationId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.getRecommendation(query.recommendationId),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
  ])

  return {
    medcardId: currentMedcardId,
  }
}

export default Recommendation