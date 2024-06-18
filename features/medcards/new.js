import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import styled  from 'styled-components'
import {TitleText} from '../../ui/title-text'
import {Button} from '../../ui/button'
import {Wrapper} from '../../ui/wrapper'
import {LabeledBox} from '../../ui/form/labeled-box'
import {media} from '../../helpers/media'
import {getColor} from '../../ui/helpers/getColor'
import {Input} from '../../ui/form/input'
import {CalendarInput} from '../../ui/form/calendar-input'
import {Switcher} from '../../ui/form/switcher'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {ImageUpload} from '../../ui/image-upload'
import {Router} from '../../routes'
import {getTranslator, T} from '../../utils/translation'
import {BackButton} from '../../ui/buttons/back-button'
import {ModalSaveButton} from '../profile/components/modal-save-button'
import {nonEmptyOrDateFormat} from '../../helpers/validator'

const PageWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  min-height: calc(100vh - 14px);
  padding: ${p => p.isModal ? '0' : '24px'};
  border: ${p => p.isModal ? 'none' : `1px solid ${getColor('black20', p.theme)}`};
  
  ${p => !p.isModal && media.mobile`
    min-height: auto;
    border-radius: 0;
    padding: 16px 0;
    border: none;
  `}
`

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  
  ${media.mobile`
    text-align: left;
  `}
`
const BottomContainer = styled.div`
  text-align: center;
  width: auto;
  
  ${media.mobile`
    text-align: center;
    padding: 20px 0 0;
  `}
`

const ImagePreviewBox = styled.div`
  margin-bottom: 24px;
  align-items: flex-start;
  display: flex;
`

const ShortInput = styled(Input)`
  width: 232px;
`

const TitleOwnText = styled(TitleText)`
  margin: -10px 0 6px 0;
`

const newMedcardValidator = (values, mainMedcardId, isInitialRelationship, translator) => {
  const fullNameMinLength = 2
  const fullNameMaxLength = 25

  const errors = {}
  const surname = values.surname ? values.surname.trim() : null
  const name = values.name ? values.name.trim() : null
  const middlename = values.middlename ? values.middlename.trim() : null

  if (!surname) {
    errors.surname = translator('validation.medcard.surname.title', true)
  } else if (surname.length < fullNameMinLength) {
    errors.surname = `${translator('validation.medcard.surname.length', true)} ${fullNameMinLength} ${translator('validation.medcard.surname.symbols', true)}`
  } else if (surname.length > fullNameMaxLength) {
    errors.surname = `${translator('validation.medcard.surname.length', true)} ${fullNameMaxLength} ${translator('validation.medcard.surname.symbols', true)}`
  }

  if (!name) {
    errors.name = translator('validation.medcard.name.title', true)
  } else if (name.length < fullNameMinLength) {
    errors.name = `${translator('validation.medcard.name.length', true)} ${fullNameMinLength} ${translator('validation.medcard.name.symbols', true)}`
  } else if (name.length > fullNameMaxLength) {
    errors.name = `${translator('validation.medcard.name.length', true)} ${fullNameMaxLength} ${translator('validation.medcard.name.symbols', true)}`
  }

  //отчества может не быть
  if (middlename && middlename.length > 0) {
    if (middlename.length < fullNameMinLength) {
      errors.middlename = `${translator('validation.medcard.middlename.length', true)} ${fullNameMinLength} ${translator('validation.medcard.middlename.symbols', true)}`
    } else if (middlename.length > fullNameMaxLength) {
      errors.middlename = `${translator('validation.medcard.middlename.length', true)} ${fullNameMaxLength} ${translator('validation.medcard.middlename.symbols', true)}`
    }
  }

  if (!values.birthDate) {
    errors.birthDate = translator('validation.medcard.birthDate.error', true)
  }
  if (!values.relationship || (mainMedcardId && isInitialRelationship)) {
    errors.relationship = translator('validation.medcard.relationship.error', true)
  }
  if (!values.gender) {
    errors.gender = translator('validation.medcard.gender.error', true)
  }

  return errors
}

const genders = [
  {
    title: <T ucFirst>medcard.new.form.gender-male</T>,
    value: 'male'
  },
  {
    title: <T ucFirst>medcard.new.form.gender-female</T>,
    value: 'female'
  }
]

export const MedcardNewComponent = ({backUrl, isChild, title, isModal}) => {
  const dispatch = useDispatch()

  const translator = useSelector(state => getTranslator(state.localization))
  const isNotMainMedcard = !!useSelector(state => state.user.mainMedcardId) && backUrl !== '/'
  const authParams = useSelector(state => state.medcards.authParams)
  const relationships = useSelector(state => state.dictionary.relationships.map(({title, isChild}) => ({value: title, title, isChild})))

  const [own, setOwn] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [form, setForm] = useState({
    file: '',
    name: '',
    surname: '',
    middlename: '',
    birthDate: '',
    gender: 'male',
    relationship: translator('medcard.new.relationship.me', true),
    isChild,
  })
  const [formStatus, setFormStatus] = useState('onEdit')

  const ageProps = isChild ? {ageEnd: 18, ageStart: -1} : {ageStart: 18}
  const isInitialRelationship = (form) => (form.relationship === translator('medcard.new.relationship.me', true))
  const [errors, setErrors] = useState(newMedcardValidator(form, isNotMainMedcard,  isInitialRelationship(form), translator))
  const isError = Object.keys(errors).length > 0

  const handleChange = (field, value) => {
    const updatedForm = {...form, [field]: value}
    setForm(updatedForm)
    setErrors(newMedcardValidator(updatedForm, isNotMainMedcard, isInitialRelationship(updatedForm), translator))
    setFormStatus('onEdit')
  }

  const handleFileUpload = (file) => {
    let reader = new FileReader()

    reader.onloadend = () => {
      handleChange('file', file)
      setImagePreview(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const getRelationships = () => {
    return isChild
      ? relationships.filter(item => item.isChild === !!isChild)
      : [...relationships, {title: translator('medcard.new.relationship.other', true), value: translator('medcard.new.relationship.other', true)}]
  }

  const onSubmit = async () => {
    setFormStatus('onSubmit')

    if(Object.keys(errors).length !== 0 || !nonEmptyOrDateFormat(form.birthDate)) {
      return
    }

    const currentRelationship = form.relationship === translator('medcard.new.relationship.other', true) ? own : form.relationship

    const result = await dispatch.medcards.addMedcard({fields: {...form, relationship: currentRelationship, ...authParams}, isMain: !isNotMainMedcard})
    result && (isModal ? dispatch.modal.deleteAllModals() : Router.pushRoute(backUrl ? backUrl : '/'))
  }

  return (
    <PageWrapper isModal>
      <Container>
        <Wrapper flow={'column'} align={'center'} padding={'24px 0'}>
          {isNotMainMedcard && !isModal && <BackButton onClick={() => Router.pushRoute(backUrl)}/>}
          <TitleText align={isModal ? 'flex-start' : 'center'} smAlign={'left'}>
            {title}
          </TitleText>
          {isChild &&
            <TitleText color={'black50'} align={isModal ? 'flex-start' :'center'} smAlign={'left'} size={'28px'} lineHeight={'32px'}>
              {translator('medcard.new.title.child-notification', true)}
            </TitleText>
          }
        </Wrapper>
      </Container>
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: isModal ? 0 : 3}} sm={{cols: 12, offset: 0}}>
            <FormContainer>
              <ImagePreviewBox>
                <ImageUpload image={imagePreview} text={translator('medcard.new.form.load-img', true)} onAddFile={handleFileUpload} aboutBlock />
              </ImagePreviewBox>
              <LabeledBox text={translator('medcard.new.form.surname', true)} margin={'0 0 20px'}>
                <Input
                  value={form.surname}
                  wide
                  size={'16px'}
                  padding={'6px 12px'}
                  placeholder={translator('medcard.new.form.surname-placeholder', true)}
                  onChange={(e) => handleChange('surname', e.currentTarget.value)}
                  error={!!(formStatus === 'onSubmit' && errors.surname)}
                />
              </LabeledBox>
              <LabeledBox text={translator('medcard.new.form.name', true)} margin={'0 0 20px'}>
                <ShortInput
                  value={form.name}
                  size={'16px'}
                  padding={'6px 12px'}
                  placeholder={translator('medcard.new.form.name-placeholder', true)}
                  onChange={(e) => handleChange('name', e.currentTarget.value)}
                  error={formStatus === 'onSubmit' && errors.name}
                />
              </LabeledBox>
              <LabeledBox text={translator('medcard.new.form.middlename', true)} margin={'0 0 20px'}>
                <Input
                  value={form.middlename}
                  wide
                  size={'16px'}
                  padding={'6px 12px'}
                  placeholder={translator('medcard.new.form.middlename-placeholder', true)}
                  onChange={(e) => handleChange('middlename', e.currentTarget.value)}
                  error={!!(formStatus === 'onSubmit' && errors.middlename)}
                />
              </LabeledBox>
              <LabeledBox text={translator('medcard.new.form.birthDate', true)} margin={'0 0 20px'}>
                <CalendarInput
                  placeholder={'дд.мм.гггг'}
                  format={'DD.MM.YYYY'}
                  mask={'99.99.9999'}
                  onChange={(value) => handleChange('birthDate', value)}
                  value={form.birthDate}
                  error={!!(formStatus === 'onSubmit' && errors.birthDate)}
                  {...ageProps}
                />
              </LabeledBox>
              <LabeledBox text={translator('medcard.new.form.gender', true)} margin={'0 0 8px'}>
                <Switcher
                  list={genders}
                  selected={form.gender}
                  onChange={(value) => handleChange('gender', value)}
                  error={!!(formStatus === 'onSubmit' && errors.gender)}
                />
              </LabeledBox>
              {isNotMainMedcard && (
                <LabeledBox text={translator('medcard.new.form.relationship', true)} margin={'0 0 8px'}>
                  <Switcher
                    list={getRelationships()}
                    selected={form.relationship}
                    onChange={(value) => handleChange('relationship', value)}
                    error={!!(formStatus === 'onSubmit' && errors.relationship)}
                  />
                </LabeledBox>
              )}
              {form.relationship === 'Свой вариант' && <LabeledBox text={translator('medcard.new.form.relationship-other', true)} margin={'0 0 20px'}>
                <TitleOwnText align={'left'} size={'16px'} lineHeight={'24px'} color={'black50'}>
                  {translator('medcard.new.form.relationship-title', true)}
                </TitleOwnText>
                <Input
                  wide
                  value={form.own}
                  size={'16px'}
                  borderRadius={'16px'}
                  padding={'5px 12px'}
                  onChange={(e) => setOwn(e.currentTarget.value)}
                />
              </LabeledBox>}
              {isModal ? <Wrapper padding={'0 0 48px'}><ModalSaveButton
                color={'primary'}
                width={'auto'}
                onClick={onSubmit}
                cursor={'pointer'}
                disabled={isError}
                mobileFixed
                isModal
              >
                {translator('medcard.new.form.button', true)}</ModalSaveButton></Wrapper>
                : <BottomContainer>
                  <Button
                    color={'primary'}
                    width={'auto'}
                    onClick={onSubmit}
                    cursor={'pointer'}
                    disabled={isError || !nonEmptyOrDateFormat(form.birthDate)}
                  >
                    {translator('medcard.new.form.button', true)}
                  </Button>
                </BottomContainer>}
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  )
}

MedcardNewComponent.propTypes = {
  backUrl: PropTypes.string,
  isChild: PropTypes.bool
}