import React from 'react'
import {FilesListComponent} from '../../../../features/profile/medcard/files'
import {redirectNotAuth} from '../../../../lib/redirect'
import {BackTemplate} from '../../../../features/profile/back-template'

const Files = ({medcardId, isMainMedcard}) => {
  const parentLink = isMainMedcard ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`
  return (
    <BackTemplate title={'Другие файлы'} parentLink={parentLink} parent={'Медкарта'} backUrl={parentLink}>
      <FilesListComponent medcardId={medcardId}/>
    </BackTemplate>
  )
}

Files.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Другие файлы')

  const {reduxStore, query} = ctx
  const {medcardId, ...filters} = query
  const currentMedcardId = Number(medcardId || reduxStore.getState().user.mainMedcardId)

  await Promise.all([
    reduxStore.dispatch.profileMedcard.getFiles({medcardId: currentMedcardId, filters: {...filters}})
  ])

  return {
    medcardId: currentMedcardId,
    isMainMedcard: currentMedcardId === reduxStore.getState().user.mainMedcardId,
  }
}

export default Files