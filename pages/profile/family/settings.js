import React from 'react'
import { RelativeMedcardSettings } from '../../../features/profile/family/settings'
import {redirectNotAuth} from '../../../lib/redirect'
import {T} from '../../../utils/translation'
import {ProfileTemplate} from '../../../features/profile/template'

const RelativeMedcardSettingsPage = ({medcardId}) => {
  return (
    <ProfileTemplate
      parentTitle={<T ucFirst>profile.product.menu.family</T>}
      parentLink={'/profile/family'}
      medcardId={medcardId}
      noLogoutButton
      backUrl={'/profile/family'}
    >
      <RelativeMedcardSettings />
    </ProfileTemplate>)
}

RelativeMedcardSettingsPage.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Настройки – Семья')

  const {reduxStore, query} = ctx

  await reduxStore.dispatch.medcards.getRelativeMedcardSettings(query.id)
  await reduxStore.dispatch.profileMedcard.getOtherCard(query.id)

  return {
    medcardId: query.id
  }
}

export default RelativeMedcardSettingsPage