import React from 'react'
import {BackTemplate} from '../../../features/profile/back-template'
import {StatusBlock} from '../../../features/profile/medcard/status-block'
import {AnamnesisBlock} from '../../../features/profile/medcard/anamnesis-block'
import {redirectNotAuth} from '../../../lib/redirect'
import {Wrapper} from '../../../ui/wrapper'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'

const Anamnesis = ({medcardId, isMainMedcard}) => {
  const parentLink = isMainMedcard ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <BackTemplate title={translator('medcard.anamnesis.template', true)} parent={translator('medcard.anamnesis.parent-template', true)} parentLink={parentLink} backUrl={parentLink}>
      <Wrapper flow={'column'} gap={'6px'}>
        <StatusBlock />
        <AnamnesisBlock medcardId={medcardId} />
      </Wrapper>
    </BackTemplate>
  )
}

Anamnesis.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Анамнез – Медкарта')

  const {reduxStore, query} = ctx
  const mainMedcardId = reduxStore.getState().user.mainMedcardId
  const medcardId = Number(query.medcardId || mainMedcardId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.fetchAnamnesis(medcardId),
    reduxStore.dispatch.profileMedcard.getStatus(medcardId),
  ])

  return {
    medcardId,
    isMainMedcard: medcardId === mainMedcardId,
  }
}

export default Anamnesis
