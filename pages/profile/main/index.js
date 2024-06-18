import React from 'react'
import {ProfileTemplate} from '../../../features/profile/template'
import {redirectNotAuth} from '../../../lib/redirect'
// import {NotificationsBlock} from '../../../features/profile/main/notifications-block'
import { FavoriteRepository } from '../../../features/profile/repository/favorite'
import { FavoriteShortBlock } from '../../../features/profile/main/favorite/favorite-short-block'
import {FooterLinks} from '../../../features/profile/main/footer-links'
import { LinksBlock } from '../../../features/profile/main/links-block'

const ProfileMain = ({medcardId, doctors, clinics}) => {
  return (
    <ProfileTemplate medcardId={medcardId}>
      {/*<NotificationsBlock />*/}
      <LinksBlock />
      {(!!clinics.length || !!doctors.length) && <FavoriteShortBlock clinics={clinics} doctors={doctors} />}
      <FooterLinks/>
    </ProfileTemplate>
  )
}

ProfileMain.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Профиль')

  const {doctors, clinics} = await FavoriteRepository.getList()

  return {
    medcardId: ctx.reduxStore.getState().user.mainMedcardId,
    doctors,
    clinics
  }
}

export default ProfileMain