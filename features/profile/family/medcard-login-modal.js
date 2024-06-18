import React from 'react'
import {ModalTemplate} from '../../../templates/modal'
import {LoginMedcard} from '../../medcards/login'

export const MedcardLoginModal = ({current}) => {
  return <ModalTemplate padding={'24px 0 14px'} mobilePadding={'20px 0 10px'}>
    <LoginMedcard title={current.title} />
  </ModalTemplate>
}