import React from 'react'
import {MedcardNewComponent} from '../../../features/medcards/new'
import {ModalTemplate} from '../../../templates/modal'

export const AddMedcardModal = ({current}) => {
  return <ModalTemplate>
    <MedcardNewComponent
      isChild={current.isChild}
      title={current.title}
      isModal
    />
  </ModalTemplate>
}