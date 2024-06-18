import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {Input} from '../../../ui/form/input'
import {Wrapper} from '../../../ui/wrapper'
import {Button} from '../../../ui/button'
import {getTranslator} from '../../../utils/translation'
import {T} from '../../../utils/translation'
import {Switcher} from '../../../ui/form/switcher'
import {asyncModal} from '../../../helpers/hocs/asyncModal'
import {CallbackRepository} from '../repository/callback'
import {MedconsultantTooltip} from '../../../features/search/medconsultant-tooltip'
import {TitleText} from '../../../ui/title-text'
import {media} from '../../../helpers/media'

const StyledInput = styled(Input)`
  line-height: 64px;
  
  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
    padding: 15px 0 15px 32px;
  `}
`

const StyledContainer = styled(Container)`
  display: flex;
  min-height: 488px;
  justify-content: space-between;
  flex-direction: column;
  
  ${media.mobile`
    min-height: 522px;
  `}
`

const HeaderWrapper = styled(Wrapper)`
    ${media.mobile`
      display: inline;
  `}
`

const StyledTitleText = styled(TitleText)`
    ${media.mobile`
      vertical-align: middle;
  `}
`

export const CallbackModalComp = ({data}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    phone: '',
    time: '',
    timeSlot: '',
  })

  const callTime = [
    {
      title: translator('about.callback.next-five-minutes', true),
      value: 'five-minutes'
    },
    {
      title: translator('about.callback.to-time', true),
      value: 'to-time'
    },
  ]

  const isFormValid = () => {
    if (!form.phone || form.phone.length !== 16) {
      return false
    }
    if (!form.time || (form.time === 'to-time' && !form.timeSlot)) {
      return false
    }
    return true
  }

  const onSubmit = async () => {
    const finalTimeSlot = form.time === 'five-minutes' ? form.time : form.timeSlot
    await dispatch.about.requestCallback({phone: form.phone, timeSlot: finalTimeSlot})
    setSubmitted(true)
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  const onClose = () => {
    dispatch.modal.deleteAllModals()
  }

  return (
    !submitted ? <ModalTemplate mobilePadding={'16px 0 20px'}>
      <Container>
        <TitleText><T usFirst>about.callback.title</T></TitleText>
        <HeaderWrapper align={'center'}>
          <MedconsultantTooltip modal /><StyledTitleText width={'auto'} color={'black50'} as={'span'} padding={'0 0 0 8px'}>
            <T usFirst>about.callback.consultant-callback</T>
          </StyledTitleText>
        </HeaderWrapper>
        <TitleText width={'auto'} color={'black50'} padding={'0 0 32px'}>
          <T>about.callback.from-to</T>
        </TitleText>
        <StyledInput
          size={'48px'}
          inputMode={'numeric'}
          type='tel'
          maskChar={null}
          bgColor={'transparent'}
          borderColor={'black20'}
          mask={'+7 999 999-99-99'}
          autoFocus={true}
          padding={'17px 0 17px 32px'}
          borderRadius={'100px'}
          value={form.phone}
          onChange={(e) => {handleChange('phone', e.currentTarget.value)}}
        />
        <Wrapper margin={form.time === 'to-time' ? '32px 0 0 0' : '32px 0 22px 0'}>
          <Switcher
            isCallBackForm
            borderRadius={'100px'}
            borderSize={'1px'}
            borderColor={'black20'}
            padding={'6px 12px'}
            list={callTime}
            selected={form.time}
            onChange={(value) => handleChange('time', value)}
          />
        </Wrapper>
        {form.time === 'to-time' &&
            <Wrapper padding={'10px 0 22px 0'}>
              <Switcher
                isCallBackForm
                borderRadius={'100px'}
                borderSize={'1px'}
                borderColor={'black20'}
                padding={'6px 12px'}
                list={data}
                selected={form.timeSlot}
                onChange={(value) => handleChange('timeSlot', value)}
              />
            </Wrapper>
        }
        <Button
          color={'primary'}
          padding={'8px 15px'}
          fontSize={'20px'}
          lineHeight={'30px'}
          onClick={onSubmit}
          disabled={!isFormValid()}
        >
          <T usFirst>about.callback.order-call</T>
        </Button>
      </Container>
    </ModalTemplate> :
      <ModalTemplate backColor={'gradPrimary'} mobilePadding={'16px 0 20px'}>
        <StyledContainer>
          <TitleText color={'white'}><T usFirst>about.callback.thanks</T></TitleText>
          <Wrapper flow={'column'}>
            <TitleText color={'white'}><T usFirst>about.callback.submitted-text</T></TitleText>
            <TitleText color={'white'} padding={'0 0 24px 0'}>
              <T usFirst>
                {form.time === 'five-minutes' ? translator('about.callback.next-five-minutes', true) : data.find(time => time.value === form.timeSlot).title}
              </T>
            </TitleText>
            <Button
              color={'white'}
              padding={'8px 15px'}
              fontSize={'20px'}
              lineHeight={'30px'}
              onClick={onClose}
              background={'primary'}
              flat
            >
              <T usFirst>about.callback.wait</T>
            </Button>
          </Wrapper>
        </StyledContainer>
      </ModalTemplate>
  )
}

export const CallbackModal = asyncModal(
  CallbackModalComp,
  () => {
    return CallbackRepository.getTimeSlots()
  }
)
