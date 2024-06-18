import React from 'react'
import {useState, useEffect} from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {useDropzone} from 'react-dropzone'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Avatar} from '../../../ui/avatar'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {EditableDataRow} from '../../../ui/editable-data-row'
import {Gap} from '../../../ui/gap'
import {EditableField} from '../../../ui/editable-field'
import {Wrapper} from '../../../ui/wrapper'
import {getTranslator} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'
import {MediumText} from '../../../ui/medium-text'
import {Button} from '../../../ui/button'

export const genderNames = {
  male: 'Мужской',
  female: 'Женский'
}

export const formatName = (firstname = '', surname = '', middlename = '') => {
  if (!firstname && !surname && !middlename) {
    return null
  }
  return `${firstname} ${surname} ${middlename}`
}

export const formatPhone = (phone) => {
  const formattedPhone = phone.split('')
  formattedPhone.splice(1, 0, ' ')
  formattedPhone.splice(5, 0, ' ')
  formattedPhone.splice(9, 0, '-')
  formattedPhone.splice(12, 0, '-')
  return formattedPhone.join('')
}

const ButtonWrapper = styled.div`
  margin: 0 auto;
`

const StyledWrapper = styled(Wrapper)`
  outline: none;
`

export const GeneralDataBlock = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const mainMedcardId = user.mainMedcardId
  const medcard = useSelector((state) => state.profileMedcard.currentMedcard)
  const {birthDate, name, surname, middlename, gender, passport, photo, email} = medcard
  const formattedPassport = passport && passport.series && passport.number ? `${passport.series} ${passport.number}` : ''

  const MAILING_ID = 2
  const subscriptions = useSelector(state => state.profileSettings.settings.subscriptions)
  const mailingSubscriptions = subscriptions.find(({id}) => id === MAILING_ID)
  const subscribeNews = mailingSubscriptions && mailingSubscriptions.emailFlag

  const [preview, setPreview] = useState(photo)
  useEffect(() => () => {URL.revokeObjectURL(preview)}, [])
  useEffect(() => {
    setPreview(photo)
  }, [photo])

  const onFileInputChange = (files) => {
    if(files && files[0]) {
      setPreview(URL.createObjectURL(files[0]))
      dispatch.profileMedcard.updateMedcard({medcardId: mainMedcardId, data: {file: files[0]}})
    }
  }

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({accept: ['.jpg', '.jpeg', '.png'], maxSize: 2 * 1024 * 1024, onDropAccepted: onFileInputChange, disabled: !!photo})

  const onEditPersonalData = () => {
    dispatch.modal.addAndShowModal({
      type: 'edit-personal-data',
      data: {mainMedcardId, ...medcard, phone: user.phone},
    })
  }
  const onEditPassport = () => {
    dispatch.modal.addAndShowModal({type: 'edit-passport', data: {...passport, medcardId: mainMedcardId}})
  }

  const onEmailChange = email => {
    dispatch.profileMedcard.updateMedcard({medcardId: mainMedcardId, data: {email}})

    if (mailingSubscriptions) {
      const {smsFlag, pushFlag} = mailingSubscriptions
      dispatch.profileSettings.updateSubscription({id: MAILING_ID, smsFlag, pushFlag, emailFlag: !mailingSubscriptions.emailFlag})
    }

  }

  const onEditEmail = () => {
    dispatch.modal.addAndShowModal({type: 'edit-email', data: {subscribeNews, email, onEmailChange}})
  }

  return (
    <Well>
      <Container>
        <Wrapper padding={'0 0 24px'} mobilePadding={'0 0 16px'}>
          <TitleText>{translator('profile.settings.data-and-contacts', true)}</TitleText>
        </Wrapper>
        <Gap gap={'24px'}>
          <Row>
            <Col lg={{cols: 4}}>
              <MediumText color={'black50'}>{translator('profile.medcard.anamnesis.foto', true)}</MediumText>
            </Col>
            <Col lg={{cols: 8}}>
              <StyledWrapper flow={'column'} {...getRootProps()} mobilePadding={'6px 0 0'}>
                <Avatar
                  width={'80px'}
                  height={'80px'}
                  size={'80px'}
                  borderRadius={'50%'}
                  src={preview}
                  text={`${name && name[0] ? name[0] : ''}`}
                  color={'white'}
                  bgColor={'secondary'}
                  fontSize={'28px'}
                />
                {!preview && <Wrapper padding={'12px 0 0'}><EditableField emptyText={translator('profile.medcard.anamnesis.add-foto', true)} onClick={() => {}} /></Wrapper>}
              </StyledWrapper>

              {!preview && <>
                <MediumText color={'black50'}>
                  {translator('profile.medcard.anamnesis.add-foto.subtitle', true)}
                </MediumText>
                <input {...getInputProps()} />
              </>}
            </Col>
          </Row>
          <EditableDataRow
            label={translator('profile.medcard.anamnesis.fullname', true)}
            value={formatName(surname, name, middlename)}
            onEdit={onEditPersonalData}
          />
          <EditableDataRow label={translator('profile.medcard.anamnesis.gender', true)} value={genderNames[gender]} onEdit={onEditPersonalData} />
          <EditableDataRow
            label={translator('profile.medcard.anamnesis.birthdate', true)}
            value={birthDate && moment(birthDate).format('DD.MM.YYYY')}
            onEdit={onEditPersonalData}
          />
          <EditableDataRow label={translator('profile.medcard.anamnesis.passport', true)} value={formattedPassport} onEdit={onEditPassport} />
          <EditableDataRow label={translator('profile.medcard.anamnesis.phone', true)} value={`+ ${formatPhone(user.phone)}`} />
          <EditableDataRow label={translator('profile.medcard.anamnesis.email', true)} value={email} onEdit={onEditEmail} editableWhenFilled={true} />
          <Row>
            <ButtonWrapper>
              <Button color={'black05'} onClick={onEditPersonalData}>
                {translator('profile.medcard.anamnesis.edit-button', true)}
              </Button>
            </ButtonWrapper>
          </Row>
        </Gap>
      </Container>
    </Well>
  )
}
