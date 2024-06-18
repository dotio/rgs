import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {ModalTemplate} from '../../../templates/modal'
import React, {useState} from 'react'
import {Gap} from '../../../ui/gap'
import {Button} from '../../../ui/button'
import {useDispatch} from 'react-redux'
import {CodeInput} from '../../../ui/form/code-input'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {Timer} from '../../../ui/timer'
import {T} from '../../../utils/translation'

const CodeContainer = styled.div`
  margin-bottom: 64px;
`

const ChangePhoneInfoContainer = styled.div`
  display: flex;
  
  margin-bottom: 32px;
`

const ActiveText = styled(Text)`
  width: auto;
  color: ${p => getColor('green', p.theme)};
  
  &:hover {
    cursor: pointer;
  }
`

const TimerText = styled(Text)`
   display: inline;
   width: auto;
   
   color: ${p => getColor('black50', p.theme)};
`

const RESEND_CODE_TIMEOUT = 60

export const ConfirmAddPhoneModal = ({current}) => {
  const dispatch = useDispatch()

  const {phone} = current.data

  const [code, setCode] = useState('')
  const [showResendCode, setShowResendCode] = useState(false)
  const [saveButtonDisable, setSaveButtonDisable] = useState(true)

  const isError = false


  const onChangePhoneClicked = () => {
    dispatch.modal.deleteModal()
    dispatch.modal.addAndShowModal({type: 'add-child-phone'})
  }

  const onResendPhoneClicked = () => {
    setShowResendCode(false)
  }

  const onCodeChanged = (value) => {
    setCode(value)

    setSaveButtonDisable(!value || value.length < 4)
  }

  const submitCode = () => {
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate>
      <Container>
        <Gap direction={'bottom'} gap={'8px'}>
          <TitleText><T ucFirst>family.confirm-phone.title</T></TitleText>
          <TitleText color={'black50'}>
            <T ucFirst>family.confirm-phone.sms</T>
          </TitleText>
          <TitleText color={'black50'}>
            {phone}
          </TitleText>
        </Gap>

        <ChangePhoneInfoContainer>
          <ActiveText onClick={onChangePhoneClicked}><T ucFirst>family.confirm-phone.change</T></ActiveText>
          <Text width={'auto'} padding={'0 8px'} color={'black50'}>⋅</Text>
          {showResendCode ?
            <ActiveText onClick={onResendPhoneClicked}><T ucFirst>family.confirm-phone.resent-code</T></ActiveText>
            :
            <Timer
              componentBefore={
                <TimerText width={'auto'} color={'black50'}><T ucFirst>family.confirm-phone.resent-sms</T></TimerText>
              }
              componentAfter={
                <TimerText>...</TimerText>
              }
              color={'black50'}
              seconds={RESEND_CODE_TIMEOUT}
              endTimer={() => setShowResendCode(true)}/>
          }
        </ChangePhoneInfoContainer>

        <CodeContainer>
          <CodeInput
            value={code}
            isError={isError}
            borderWidth={'1px'}
            count={4}
            onChange={onCodeChanged}
            onSubmit={submitCode}
          />
        </CodeContainer>

        <Button
          fontSize={'20px'}
          lineHeight={'30px'}
          padding={'9px 16px'}
          disabled={saveButtonDisable}
          color={'green'}
          onClick={() => {
          }}>
          <T ucFirst>family.confirm-phone.next</T>
        </Button>
      </Container>
    </ModalTemplate>
  )
}