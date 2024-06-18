import React, {useCallback, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ModalTemplate} from '../../../../templates/modal'
import {Container} from '../../../../ui/grid/container'
import {FilteredItemList} from '../../../../ui/filtered-item-list'
import {getTranslator} from '../../../../utils/translation'
import {uniqBy, prop} from 'ramda'

const placeholderMap = {
  drugs: 'profile.medcard.anamnesis-edit.drugs',
  allergies: 'profile.medcard.anamnesis-edit.allergies',
  injuries: 'profile.medcard.anamnesis-edit.injuries',
  diseases: 'profile.medcard.anamnesis-edit.diseases',
  surgery: 'profile.medcard.anamnesis-edit.surgery',
  vaccinationPlanned: 'profile.medcard.anamnesis-edit.vaccinationPlanned',
  prostheses: 'profile.medcard.anamnesis-edit.prostheses',
}

export const AnamnesisListFieldEditScrollModal = ({current}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const {code, title, medcardId} = current.data

  const anamnesisField = useSelector((state) => state.profileMedcard.anamnesis.find((anamnesisField) => anamnesisField.code === code))
  const items = useSelector((state) => state.dictionary[code])

  const handleChange = (newValue) => {
    dispatch.profileMedcard.changeAnamnesis({code, value: newValue, medcardId})
    dispatch.modal.deleteModal()
  }

  useEffect(() => {
    const initialItems = uniqBy(prop('id'), [...items, ...anamnesisField.selectedItems])

    dispatch.dictionary.setDictionary(code, initialItems)
  }, [])

  const onScroll = useCallback(async (e) => {
    const canLoad = e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight - 100

    if(canLoad) {
      await dispatch.dictionary.fetchAnamnesisScrollDictionary({force: true, code})
    }
  }, [])

  return (
    <ModalTemplate title={title} onScrollEvent={onScroll}>
      <Container>
        <FilteredItemList
          code={code}
          placeholder={translator(placeholderMap[code], true) || translator('profile.medcard.anamnesis-edit.find', true)}
          onChange={handleChange}
          initialSelectedItems={anamnesisField.selectedItems}
          items={items || []}
        />
      </Container>
    </ModalTemplate>
  )
}