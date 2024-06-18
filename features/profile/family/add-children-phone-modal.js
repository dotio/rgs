import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {ModalTemplate} from '../../../templates/modal'
import React, {useState} from 'react'
import {Gap} from '../../../ui/gap'
import {Button} from '../../../ui/button'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {media} from '../../../helpers/media'
import {Input} from '../../../ui/form/input'
import {Text} from '../../../ui/text'
import {isPhoneNumber} from '../../../helpers/validator'
import {useSelector, useDispatch} from 'react-redux'
import {T} from '../../../utils/translation'

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: ${(p) => (p.isValue ? '0' : '48px')};
  width: 100%;
  height: 100px;
  border: 3px solid ${(p) => getColor('black20', p.theme)};
  border-radius: 100px;
  background-color: #ffffff;
  margin-bottom: 64px; 

  ${media.mobile`
    height: 60px;
    padding-left: 16px;
  `}
`

const StyledInput = styled(Input)`
  height: 100%;
  width: 100%;
  font-size: 48px;
  line-height: 1.5;
  letter-spacing: 2px;
  
  flex-grow: 1;

  ${media.mobile`
    font-size: 24px;
    letter-spacing: 0.3px;
  `}
`

const Code = styled(Text)`
  font-size: 48px;
  line-height: 1.5;
  padding: 0 15px 0 0;

  ${media.mobile`
    font-size: 24px;
    line-heght: 44px;
    padding: 0 8px 0 0;
  `}
`

const StyledContainer = styled(Container)`
  overflow: hidden;
`

export const AddChildrenPhoneModal = ({current}) => {
  const dispatch = useDispatch()

  const medcard = useSelector(state => state.profileMedcard.otherMedcard)
  const [phone, setPhone] = useState(current.value)
  const [sendButtonDisable, setSendButtonDisable] = useState(true)

  const submitPhone = async () => {
    await dispatch.profileMedcard.updateMedcard({medcardId: medcard.id, data: {...medcard, file: '', phone: '+7' + phone}})
    dispatch.medcards.getRelativeMedcardSettings(medcard.id)
    dispatch.modal.deleteModal()
  }

  const onPhoneChanged = (e) => {
    const {value} = e.currentTarget

    setPhone(value)

    setSendButtonDisable(!isPhoneNumber(value))
  }

  const handleKeyPress = (target) => {
    if (target.charCode === 13 && isPhoneNumber(phone)) {
      submitPhone()
    }
  }

  return (
    <ModalTemplate>
      <StyledContainer>
        <Gap direction={'bottom'} gap={'64px'} mobileGap={'48px'}>
          <TitleText><T ucFirst>profile.add-children-phone.title</T></TitleText>
          <TitleText color={'black50'}><T ucFirst>profile.add-children-phone.subtitle</T></TitleText>
        </Gap>

        <InputContainer>
          <Code width={'auto'} color={'black'}>
            <T ucFirst>profile.add-children-phone.code</T>
          </Code>
          <StyledInput
            inputMode={'numeric'}
            type='tel'
            maskChar={null}
            hideBorder
            value={phone}
            onChange={onPhoneChanged}
            onKeyPress={handleKeyPress}
            bgColor={'transparent'}
            mask={'999 999-99-99'}
            autoFocus={true}
            padding={'0'}
            borderSize={'0px'}
          />
        </InputContainer>

        <Button
          fontSize={'20px'}
          lineHeight={'30px'}
          padding={'9px 16px'}
          disabled={sendButtonDisable}
          color={'green'}
          onClick={submitPhone}>
          <T ucFirst>profile.add-children-phone.next</T>
        </Button>
      </StyledContainer>
    </ModalTemplate>
  )
}