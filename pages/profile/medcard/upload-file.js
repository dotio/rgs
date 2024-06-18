import React from 'react'
import styled from 'styled-components'
import {redirectNotAuth} from '../../../lib/redirect'
import {Upload} from '../../../features/profile/medcard/components/upload'
import {media} from '../../../helpers/media'

const UploadWrapper = styled.div`
  height: calc(100vh - 12px);
  
  ${media.mobile`
    height: calc(100vh - 80px);
    padding: 6px 6px 0 6px;
    overflow: hidden;
  `}
`

const MedcardUploadFile = ({medcardId}) => {
  return (
    <UploadWrapper>
      <Upload medcardId={medcardId} />
    </UploadWrapper>
  )
}

MedcardUploadFile.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Загрузка файла')

  const {reduxStore, query} = ctx
  const medcardId = Number(query.medcardId || reduxStore.getState().user.mainMedcardId)

  await Promise.all([
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
  ])

  return {
    medcardId,
  }
}

export default MedcardUploadFile