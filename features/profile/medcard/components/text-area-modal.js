import React, {useState} from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {Container} from '../../../../ui/grid/container'
import {ModalTemplate} from '../../../../templates/modal'
import {TitleText} from '../../../../ui/title-text'
import {Textarea} from '../../../../ui/textarea'
import {Button} from '../../../../ui/button'
import {getColor} from '../../../../ui/helpers/getColor'

const Title = styled(TitleText)`
  margin-bottom: 24px;
`

const StyledTextarea = styled(Textarea)`
  resize: none;
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  padding: 12px 12px 20px 12px;
  border: 1px solid ${p => getColor('black20', p.theme)};
  border-radius: 16px;
  background: transparent;
  margin-bottom: 24px;
  
  &::-webkit-input-placeholder,
  &::-moz-placeholder, 
  &:-moz-placeholder,
  &:-ms-input-placeholder {
    color: ${p => getColor('black40', p.theme)}
  }
  
  &:active, &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => getColor('black40', p.theme)};
  }
  
`

export const TextAreaModal = ({current}) => {
  const dispatch = useDispatch()
  const {code, title, value, medcardId} = current.data
  const [text, setText] = useState(value)

  const onSubmit = () => {
    dispatch.profileMedcard.changeAnamnesis({code, value: text, medcardId})
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate icon={'long_arrow_left'}>
      <Container>
        <Title>{title}</Title>
        <StyledTextarea
          rows={5}
          defaultValue={text}
          onChange={(e) => setText(e.currentTarget.value)}
        />
        <Button color={'green'} onClick={onSubmit}>Сохранить</Button>
      </Container>
    </ModalTemplate>
  )
}