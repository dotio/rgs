import React, {useState} from 'react'
import {Container} from '../../../../ui/grid/container'
import {ModalTemplate} from '../../../../templates/modal'
import {useDispatch, useSelector} from 'react-redux'
import {TitleText} from '../../../../ui/title-text'
import {RadioButton} from '../../../../ui/form/radio-button'
import {Wrapper} from '../../../../ui/wrapper'
import {Button} from '../../../../ui/button'
import {T} from '../../../../utils/translation'
import styled from 'styled-components'
import {Text} from '../../../../ui/text'
import {media} from '../../../../helpers/media'

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

export const BloodTypeModal = ({current}) => {
  const dispatch = useDispatch()
  const {code, title, medcardId} = current.data
  const bloodTypes = useSelector(state => state.dictionary['bloodType'])
  const anamnesisField = useSelector((state) => state.profileMedcard.anamnesis.find((anamnesisField) => anamnesisField.code === code))
  const [value, setValue] = useState(anamnesisField.selectedItems.length > 0 ? anamnesisField.selectedItems[0] : null)

  const handleSubmit = async () => {
    await dispatch.profileMedcard.changeAnamnesis({code, value: [value], medcardId})
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText  padding={'0 32px 24px 0'}>{title}</TitleText>
        <Wrapper gap={'24px'} flow={'column'}>
          {bloodTypes && bloodTypes.map(bloodType =>
            <Wrapper align={'center'} key={bloodType.id} onClick={() => setValue(bloodType)}>
              <RadioButton checked={value && bloodType.id === value.id}/>
              <StyledText width={'auto'} pointer={true} padding={'0 0 0 12px'} size={'28px'} lineHeight={'32px'}>{bloodType.title}</StyledText>
            </Wrapper>
          )}
        </Wrapper>
        <Wrapper padding={'32px 0 0'}>
          <Button onClick={handleSubmit} padding={'8px 15px'} color={'primary'} cursor={'pointer'} fontSize={'20px'} lineHeight={'30px'}><T ucFirst>medcard.anamnesis.blood.button</T></Button>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}