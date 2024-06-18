import React from 'react'
import ResearchesListComponent from '../../../../features/profile/medcard/researches'
import {redirectNotAuth} from '../../../../lib/redirect'
import {BackTemplate} from '../../../../features/profile/back-template'

const Researches = ({medcardId, isMainMedcard}) => {
  const parentLink = isMainMedcard ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`
  return (
    <BackTemplate
      title={'Исследования и анализы'}
      parentLink={parentLink}
      parent={'Медкарта'}
      backUrl={parentLink}>
      <ResearchesListComponent medcardId={medcardId} />
    </BackTemplate>
  )
}

Researches.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Исследования')

  const {reduxStore, query} = ctx
  const {medcardId, ...filters} = query
  const currentMedcardId = Number(medcardId || reduxStore.getState().user.mainMedcardId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.getResearches({medcardId: currentMedcardId, filters}, reduxStore.getState()),
    reduxStore.dispatch.profileMedcard.setResearchesFilters(filters),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
  ])

  return {
    medcardId: currentMedcardId,
    isMainMedcard: currentMedcardId === reduxStore.getState().user.mainMedcardId,
  }
}

export default Researches