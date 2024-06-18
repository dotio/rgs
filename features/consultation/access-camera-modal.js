import React from 'react'
import {useDispatch} from 'react-redux'
import {Text} from '../../ui/text'
import {Button} from '../../ui/button'
import {Wrapper} from '../../ui/wrapper'
import {ModalTemplate} from '../../templates/modal'
import {T} from '../../utils/translation'

export const AccessCameraModal = () => {
  const dispatch = useDispatch()

  const onClickButton = () => dispatch.modal.deleteModal()

  return (
    <ModalTemplate>
      <Wrapper flow={'column'} gap={'16px'} padding={'0 112px'}>
        <Text size={'28px'} lineHeight={'32px'}>
          <T ucFirst>consultation.access.title</T>
        </Text>
        <Text size={'20px'} lineHeight={'30px'}>
          <T ucFirst>consultation.access.subtitle</T>
        </Text>
        <Button color={'primary'} onClick={onClickButton}>
          <T ucFirst>consultation.access.button</T>
        </Button>
      </Wrapper>
    </ModalTemplate>
  )
}