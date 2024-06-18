import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {MedcardItem} from './medcard-item'
import {Icon} from '../../../ui/icon'
import {useSelector} from 'react-redux'
import {SelectDropdown} from '../../../ui/form/select-dropdown'
import {T} from '../../../utils/translation'
import {useDispatch} from 'react-redux'
import {isMobile} from 'react-device-detect'

const AddMedcard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 60px;
  border-top: 1px solid ${p => getColor('black10', p.theme)};
`

const AddMedcardInfo = styled.div`
  padding-left: 8px;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(147.74deg, #40B2C9 13.44%, #55DF94 85.6%);
  border-radius: 10px;
`

export const MedcardDropdown = ({isDutyDoctor, items, medcardId, onChange, backUrl, margin, mobileModal, disabled, isActivation = false}) => {

  const dispatch = useDispatch()
  const medcardsList = items ? items : useSelector(state => state.medcards.list)

  const renderSelected = () => {
    const selected =  medcardId ? medcardsList.find(medcard => medcard.id === medcardId) : medcardsList[0]
    if(medcardId.length === 0) {
      onChange(selected.id)
    }
    return <MedcardItem {...selected} disabled={disabled}/>
  }

  const onMedcardClick = (medcardId) => {
    if (mobileModal) {
      dispatch.modal.deleteTargetModal(mobileModal)
    }
    onChange(medcardId)

    isActivation && dispatch.profileMedcard.getOtherCard(medcardId)
  }

  const addMedcardModal = () => {
    dispatch.modal.addAndShowModal({type: 'select-add-medcard', backUrl: backUrl})
  }

  useEffect(() => {
    dispatch.profileMedcard.getOtherCard(medcardId)
  }, [])

  const renderItems = () => {
    return medcardsList.filter(medcard => isMobile ? medcard : medcard.id !== medcardId).map(medcard => {
      return <MedcardItem isDutyDoctor={isDutyDoctor} {...medcard} onClick={() => onMedcardClick(medcard.id)} key={'medcard-' + medcard.id} />
    }).concat(!isDutyDoctor && <AddMedcard onClick={addMedcardModal} key={'medcard-add'}>
      <Wrapper align={'center'}>
        <IconBox>
          <Icon type={'big_plus'} width={20} height={20} />
        </IconBox>
        <AddMedcardInfo>
          <Text breakWord size={'16px'} lineHeight={'24px'} color={'primary'}>
            <T ucFirst>activation.medcard.add</T>
          </Text>
        </AddMedcardInfo>
      </Wrapper>
    </AddMedcard>)
  }

  return <SelectDropdown margin={margin} disabled={disabled} renderSelected={renderSelected} renderItems={renderItems} mobileModal={mobileModal}/>
}