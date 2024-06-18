import React from 'react'
import {ResearchComponent} from '../../../../features/profile/medcard/researches/one'
import {redirectNotAuth} from '../../../../lib/redirect'

const ResearchOne = ({medcardId}) => {
  return <ResearchComponent medcardId={medcardId} />
}

ResearchOne.getInitialProps = async(ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx
  const currentMedcardId = Number(query.medcardId || reduxStore.getState().user.mainMedcardId)

  reduxStore.dispatch.router.setPageTitle('Исследование №' + query.researchId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.getResearch(query.researchId),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
  ])

  return {
    medcardId: currentMedcardId
  }
}

export default ResearchOne