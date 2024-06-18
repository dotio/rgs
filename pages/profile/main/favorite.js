import React from 'react'
import {FavoriteBlock} from '../../../features/profile/favorite-block'
import {FavoriteRepository} from '../../../features/profile/repository/favorite'
import {BackTemplate} from '../../../features/profile/back-template'
import {EmptyFavorite} from '../../../features/profile/main/favorite/empty-favorite'
import {Wrapper} from '../../../ui/wrapper'
import {redirectNotAuth} from '../../../lib/redirect'

const Favorite = ({doctors, clinics}) => {
  return (
    <BackTemplate title={'Избранное'} parent={'Профиль'} parentLink={'/profile'}>
      <Wrapper gap={'6px'} flow={'column'}>
        {doctors.length > 0 && <FavoriteBlock title={'Врачи'} items={doctors} type={'doctor'}/>}
        {clinics.length > 0 && <FavoriteBlock title={'Клиники'} items={clinics} type={'clinic'}/>}
        {clinics.length === 0 && doctors.length === 0 && <EmptyFavorite />}
      </Wrapper>
    </BackTemplate>
  )
}

Favorite.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Избранное')

  const {doctors, clinics} = await FavoriteRepository.getList()
  return {
    doctors,
    clinics
  }
}

export default Favorite