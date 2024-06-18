import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ModalTemplate} from '../../../../templates/modal'
import {Container} from '../../../../ui/grid/container'
import {Text} from '../../../../ui/text'
import {Gap} from '../../../../ui/gap'
import {FilteredItemList} from '../../../../ui/filtered-item-list'
import {getTranslator} from '../../../../utils/translation'

const placeholderMap = {
  drugs: 'profile.medcard.anamnesis-edit.drugs',
  allergies: 'profile.medcard.anamnesis-edit.allergies',
  injuries: 'profile.medcard.anamnesis-edit.injuries',
  diseases: 'profile.medcard.anamnesis-edit.diseases',
  surgery: 'profile.medcard.anamnesis-edit.surgery',
  vaccinationPlanned: 'profile.medcard.anamnesis-edit.vaccinationPlanned',
  prostheses: 'profile.medcard.anamnesis-edit.prostheses',
}

export const AnamnesisListFieldEditModal = ({current}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))

  const {code, title, medcardId} = current.data
  const anamnesisField = useSelector((state) => state.profileMedcard.anamnesis.find((anamnesisField) => anamnesisField.code === code))
  const items = useSelector((state) => state.dictionary[code])

  const handleChange = (newValue) => {
    dispatch.profileMedcard.changeAnamnesis({code, value: newValue, medcardId})
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate>
      <Container>
        <Gap gap={'24px'}>
          <Text size={'28px'} lineHeight={'32px'}>{title}</Text>
          <FilteredItemList
            placeholder={translator(placeholderMap[code], true) || translator('profile.medcard.anamnesis-edit.find', true)}
            onChange={handleChange}
            initialSelectedItems={anamnesisField.selectedItems}
            items={items || []}
          />
        </Gap>
      </Container>
    </ModalTemplate>
  )
}