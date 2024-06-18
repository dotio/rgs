import React, {useState}  from 'react'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {ModalTemplate} from '../../../../templates/modal'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {Wrapper} from '../../../../ui/wrapper'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {LabeledBox} from '../../../../ui/form/labeled-box'
import {Input} from '../../../../ui/form/input'
import {CalendarInput} from '../../../../ui/form/calendar-input'
import {Switcher} from '../../../../ui/form/switcher'
import {Divider} from '../../../../ui/divider'
import {getTranslator} from '../../../../utils/translation'
import {ImageUpload} from '../../../../ui/image-upload'
import moment from 'moment'
import {ModalSaveButton} from '../../components/modal-save-button'
import {isMobile} from 'react-device-detect'

const StyledWrapper = styled(Wrapper)`
  height: 100%;
  padding-left: 6px;
`

export const EditPersonalDataModal = (props) => {
  const {
    mainMedcardId,
    birthDate,
    name,
    surname,
    middlename,
    gender,
    passport = {},
    photo,
    phone,
    email,
  } = props.current.data
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    name,
    surname,
    middlename,
    gender,
    birthDate: isMobile ? moment(birthDate, 'YYYY-MM-DD').format('YYYY-MM-DD') : moment(birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    phone,
    email,
    passport: {...passport},
  })
  const [imagePreview, setImagePreview] = useState(photo)
  const onSubmit = () => {
    const format =  isMobile || form.birthDate.split('-').length > 1 ? 'YYYY-MM-DD' : 'DD.MM.YYYY'

    dispatch.modal.deleteModal()
    dispatch.profileMedcard.updateMedcard({
      medcardId: mainMedcardId,
      data: {...form, birthDate: moment(form.birthDate, format).format('YYYY-MM-DD[T]HH:mm:ssZ')}
    })
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  const handleFileUpload = (file) => {
    let reader = new FileReader()

    reader.onloadend = () => {
      handleChange('file', file)
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const genders = [
    {
      title: translator('profile.medcard.personal-edit.male', true),
      value: 'male'
    },
    {
      title: translator('profile.medcard.personal-edit.female', true),
      value: 'female'
    },
  ]

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px 0'}>{translator('profile.medcard.personal-edit.title', true)}</TitleText>
        <Row>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            <ImageUpload
              image={imagePreview}
              name={name}
              text={photo ? translator('profile.medcard.personal-edit.change-foto', true) : translator('profile.medcard.personal-edit.upload-foto', true)}
              onAddFile={handleFileUpload}
              changeExistedPhoto={!!photo}
            />
          </Col>
        </Row>
      </Container>
      <Divider margin={'24px 0'}/>
      <Container>
        <Text size={'20px'} lineHeight={'30px'} padding={'0 0 12px'}>{translator('profile.medcard.personal-edit.subtitle', true)}</Text>
        <Row>
          <Col lg={{cols: 6}} sm={{cols: 12}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.surname', true)} margin={'0 0 20px'}>
              <Input
                value={form.surname}
                wide
                size={'16px'}
                padding={'5px 11px'}
                placeholder={translator('profile.medcard.personal-edit.surname-placeholder', true)}
                readOnly={!!surname}
                disabled={!!surname}
                onChange={(e) => handleChange('surname', e.target.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 8}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.name', true)} margin={'0 0 20px'}>
              <Input
                value={form.name}
                wide
                size={'16px'}
                padding={'5px 11px'}
                placeholder={translator('profile.medcard.personal-edit.name-placeholder', true)}
                readOnly={!!name}
                disabled={!!name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 6}} sm={{cols: 12}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.middlename', true)} margin={'0 0 20px'}>
              <Input
                value={form.middlename}
                wide
                size={'16px'}
                padding={'5px 11px'}
                placeholder={translator('profile.medcard.personal-edit.middlename-placeholder', true)}
                readOnly={!!middlename}
                disabled
                onChange={(e) => handleChange('middlename', e.target.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 6}} sm={{cols: 12}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.birthDate', true)} margin={'0 0 20px'}>
              <CalendarInput
                format={'DD.MM.YYYY'}
                mask={'99.99.9999'}
                onChange={(value) => !birthDate && handleChange('birthDate', value)}
                value={form.birthDate}
                readOnly={!!birthDate}
                disabled={!!birthDate}
                padding={'5px 11px'}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 6}} sm={{cols: 12}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.gender', true)} margin={'0'}>
              <Switcher
                borderRadius={'100px'}
                borderSize={'1px'}
                borderColor={'black20'}
                padding={'5px 11px'}
                list={genders}
                selected={form.gender}
                onChange={(value) => !gender && handleChange('gender', value)}
                readOnly={!!gender}
              />
            </LabeledBox>
          </Col>
        </Row>
      </Container>
      <Divider margin={'12px 0 24px 0'}/>
      {passport && <>
        <Container>
          <Text size={'20px'} lineHeight={'30px'} padding={'0 0 12px'}>Документ</Text>
          <Row>
            <Col lg={{cols: 2}} sm={{cols: 4}}>
              <LabeledBox text={translator('profile.medcard.personal-edit.passport-title', true)}>
                <Input
                  value={form.passport.series}
                  wide
                  size={'16px'}
                  mask={'9999'}
                  borderRadius={'100px'}
                  borderSize={'1px'}
                  borderColor={'black20'}
                  padding={'5px 11px'}
                  placeholder={translator('profile.medcard.personal-edit.passport-series', true)}
                  readOnly={!!passport.series}
                  disabled={!!passport.series}
                  onChange={(e) => handleChange('passport', {...form.passport, series: e.target.value})}
                />
              </LabeledBox>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 8}}>
              <StyledWrapper flow={'column'} justify={'flex-end'}>
                <Input
                  value={form.passport.number}
                  wide
                  size={'16px'}
                  mask={'999999'}
                  borderRadius={'100px'}
                  borderSize={'1px'}
                  borderColor={'black20'}
                  padding={'5px 11px'}
                  placeholder={translator('profile.medcard.personal-edit.number', true)}
                  margin={'0 0 0 12px'}
                  readOnly={!!passport.number}
                  disabled={!!passport.number}
                  onChange={(e) => handleChange('passport', {...form.passport, number: e.target.value})}
                />
              </StyledWrapper>
            </Col>
          </Row>
        </Container>
        <Divider margin={'24px 0'}/>
      </>}
      <Container>
        <Text size={'20px'} padding={'0 0 12px'} lineHeight={'30px'}>Контакты</Text>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.phone', true)} margin={'0 0 20px'}>
              <Input
                value={form.phone}
                mask={'+7 999 999-99-99'}
                size={'16px'}
                padding={'5px 11px'}
                readOnly={!!phone}
                disabled={!!phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 6}} sm={{cols: 12}}>
            <LabeledBox text={translator('profile.medcard.personal-edit.email', true)} >
              <Input
                value={form.email}
                wide
                size={'16px'}
                padding={'5px 11px'}
                placeholder={translator('profile.medcard.personal-edit.email-placehilder', true)}
                onChange={(e) => handleChange('email', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
      </Container>
      <Divider margin={'24px 0 16px 0'}/>
      <Container>
        <Wrapper mobilePadding={'0 0 48px'}>
          <ModalSaveButton mobileFixed color={'primary'} onClick={onSubmit}>{translator('profile.medcard.personal-edit.button', true)}</ModalSaveButton>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}

EditPersonalDataModal.propTypes = {
  mainMedcardId: PropTypes.string,
  birthDate: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  middlename: PropTypes.string,
  gender: PropTypes.string,
  passport: PropTypes.shape({
    series: PropTypes.string,
    number: PropTypes.string
  }),
  photo: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
}
