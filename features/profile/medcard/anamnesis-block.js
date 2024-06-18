import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Gap} from '../../../ui/gap'
import {EditableDataRow} from '../../../ui/editable-data-row'
import {T} from '../../../utils/translation'
import {noSelectedItemsOptionMap} from '../../../features/profile/medcard/no-selected-items-option-map'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'

const sortedAnamnesisFields = ['injuries', 'surgery', 'diseases', 'drugs', 'prostheses', 'allergies', 'vaccinationPlanned', 'bloodType', 'other']
const anamnesisFieldSortComparator = (a, b) =>
  sortedAnamnesisFields.includes(a.code) && sortedAnamnesisFields.includes(b.code)
    ? sortedAnamnesisFields.indexOf(a.code) - sortedAnamnesisFields.indexOf(b.code)
    : 0

const formatValue = (value = '') => Array.isArray(value) ? value.map((item) => item.title).join(', ') : value

export const AnamnesisBlock = ({medcardId}) => {
  const dispatch = useDispatch()
  const anamnesis = useSelector((state) => state.profileMedcard.anamnesis)
  const sortedAnamnesis = [...anamnesis].sort(anamnesisFieldSortComparator)

  const showAnamnesisModal = async (field) => {
    const {code,title, value} = field
    if(field.code === 'bloodType') {
      await dispatch.dictionary.fetchAnamnesisDictionary({force: true, code})
      dispatch.modal.addAndShowModal({
        type: 'blood-types',
        data: {
          code,
          title,
          medcardId,
        },
      })
      return
    }

    if(code === 'other') {
      dispatch.modal.addAndShowModal({
        type: 'text-area-modal',
        data: {
          code,
          title,
          value,
          medcardId
        },
      })
      return
    }

    await dispatch.dictionary.fetchAnamnesisScrollDictionary({force: true, code})
    dispatch.modal.addAndShowModal({
      type: 'anamnesis-list-edit-scroll',
      data: {
        code,
        title,
        medcardId
      },
    })
  }

  const getValue = (field) => {
    if(field.code === 'other') {
      return field.value
    }

    return field.selectedItems && field.selectedItems.length > 0 && field.selectedItems[0].id === 0 ? noSelectedItemsOptionMap[field.code].title : formatValue(field.selectedItems)
  }

  return (
    <Well>
      <Container>
        <Wrapper padding={'0 0 24px'} mobilePadding={'0 0 16px'}>
          <TitleText><T ucFirst>profile.medcard.anamnesis.title</T></TitleText>
        </Wrapper>
        <Gap gap={'24px'}>
          {sortedAnamnesis.map((field) => (
            <EditableDataRow
              key={field.code}
              label={field.title}
              value={getValue(field)}
              editableWhenFilled
              onEdit={() => showAnamnesisModal(field)}
            />
          ))}
        </Gap>
      </Container>
    </Well>
  )
}
