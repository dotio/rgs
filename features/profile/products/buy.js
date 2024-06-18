import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {Router} from '../../../routes'
import {Text} from '../../../ui/text'
import {Button} from '../../../ui/button'
import {Wrapper} from '../../../ui/wrapper'
import {Gap} from '../../../ui/gap'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'
import {Input} from '../../../ui/form/input'
import moment from 'moment'
import {MedcardDropdown} from '../../activation/components/medcard-dropdown'
import {Img} from '../../../ui/img'
import {CalendarInput} from '../../../ui/form/calendar-input'
import {Switcher} from '../../../ui/form/switcher'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Container} from '../../../ui/grid/container'
import {Divider} from '../../../ui/divider'
import {getTranslator} from '../../../utils/translation'
import {AgreementBlock} from '../../../ui/form/agreement'
import {BackButton} from '../../../ui/buttons/back-button'
import {TitleText} from '../../../ui/title-text'
import {Well} from '../../../ui/well'
import {ProductRepository} from '../repository/product'

const ProductWrapper = styled(Well)`
  position: relative;
  border-radius: 20px;
  min-height: calc(100vh - 14px);
  overflow-y: auto;
  border: 1px solid ${(p) => getColor('black20', p.theme)};
  
  ${media.mobile` 
    min-height: auto;
    border-radius: 0;
    padding: 16px 0;
    border: none;
  `}
`

const StyledCalendar = styled(CalendarInput)`
  ${p => p.left && css`
      left: 76% !important;
      border: 1px solid ${getColor('black10', p.theme)};
  `}
`
const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    text-align: left;
  `}
`

const BottomContainer = styled.div`
  text-align: center;
  padding-top: 44px;
  width: auto;
  
  ${media.mobile`
    padding: 36px 0 0;
  `}
`

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
  
  ${media.mobile`
    justify-content: flex-start;
    padding: 0 0 16px;
  `}
`

const PolicyBox = styled.div`
  display: flex;
  padding: 16px;
  border: 1px solid ${p => getColor('black20', p.theme)};
  border-radius: 20px;
`

const PolicyInfo = styled.div`
  padding-left: 12px;
`

const ShortInput = styled(Input)`
  width: 232px;
  flex-shrink: 0;
`

const PassportBox = styled(Gap)`
  display: flex;
`

export const ProductBuyComponent = () => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const product = useSelector(state => state.profileProducts.currentProduct)
  const [fields, setFields] = useState({
    name: '',
    middlename: '',
    surname: '',
    birthDate: '',
    email: '',
    gender: null,
    phone: '',
    passport: {
      series: '',
      number: ''
    },
    insurant: {
      medcardId: '',
      email: '',
      phone: '',
      passport: {
        series: '',
        number: ''
      },
    },
    personalAgreement: false,
  })
  const medcard = useSelector(state => state.medcards.list.find(medcard => medcard.id === fields.insurant.medcardId))

  const genders = [
    {
      title: translator('activation.insurer.gender.male', true),
      value: 'male'
    },
    {
      title: translator('activation.insurer.gender.female', true),
      value: 'female'
    },
  ]

  const goBack = () => {
    Router.pushRoute(`/profile/products/${product.id}`)
  }

  const onChange = (field, value) => {
    setFields({...fields, [field]: value})
  }

  const handleChange = (field, value) => {
    onChange(field, value)
  }

  const handleChangePassport = (field, value) => {
    onChange('passport', {...fields.passport, [field]: value})
  }

  const changeInsurant = (field, value) => {
    onChange('insurant', {...fields.insurant, [field]: value})
  }

  const handleChangeInsurantPassport = (field, value) => {
    onChange('insurant', {...fields.insurant, passport: {...fields.insurant.passport, [field]: value}})
  }

  const onSubmit = async () => {
    dispatch.loaders.showLoader()
    const data = await ProductRepository.buyPayment({productId: product.id,...fields})
    dispatch.modal.addAndShowModal({type: 'product-payment-modal', data})
    dispatch.loaders.hideLoader()
  }

  return (
    <ProductWrapper color={'transparent'}>
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: 3}} sm={{cols: 12}}>
            <TitleBox>
              <BackButton onClick={goBack} />
              <StyledTitleText align={'center'}>Покупка</StyledTitleText>
            </TitleBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 6, offset: 3}}>
            <Wrapper justify={'space-between'} margin={'0 0 12px'}>
              <Text size={'16px'} color={'black50'} lineHeight={'24px'}>Вы покупаете продукт</Text>
            </Wrapper>
          </Col>

          <Col lg={{cols: 6, offset: 3}}>
            <PolicyBox>
              <Img src={product.image || '/static/banners/docOnline.svg'} width={'80px'} borderRadius={'16px'} alt={''} />
              <PolicyInfo>
                <Text size={'16px'} color={'black'} lineHeight={'24px'}>{product.name}</Text>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'}>
                  {translator('activation.policy.before', true)} {moment(product.dateEnd).format('DD.MM.YYYY')}
                </Text>
              </PolicyInfo>
            </PolicyBox>
          </Col>
        </Row>
      </Container>
      <Divider color={'black20'} margin={'24px 0'} />
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: 3}}>
            <Text size={'20px'} color={'black'} lineHeight={'30px'}>{translator('activation.policy.insurer.title', true)}</Text>
            <Text size={'20px'} color={'black50'} lineHeight={'30px'} padding={'0 0 16px'}>{translator('activation.policy.insurer.subtitle', true)}</Text>
            <LabeledBox text={translator('activation.insurer.surname', true)} margin={'0 0 20px'}>
              <Input
                value={fields.surname}
                wide
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                placeholder={translator('activation.insurer.surname.placeholder', true)}
                onChange={(e) => handleChange('surname', e.currentTarget.value)}
              />
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.name', true)} margin={'0 0 20px'}>
              <ShortInput
                value={fields.name}
                wide
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                placeholder={translator('activation.insurer.name.placeholder', true)}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
              />
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.middlename', true)} margin={'0 0 20px'}>
              <Input
                value={fields.middlename}
                wide
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                placeholder={translator('activation.insurer.middlename.placeholder', true)}
                onChange={(e) => handleChange('middlename', e.currentTarget.value)}
              />
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.birthDate', true)} margin={'0 0 20px'}>
              <StyledCalendar
                placeholder={'дд.мм.гггг'}
                format={'DD.MM.YYYY'}
                mask={'99.99.9999'}
                padding={'6px 12px'}
                color={'black'}
                onChange={(value) => handleChange('birthDate', value)}
                value={fields.birthDate}
                left={onChange}
                ageStart={18}
              />
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.gender', true)} margin={'0 0 20px'}>
              <Switcher
                borderRadius={'100px'}
                borderSize={'1px'}
                borderColor={'black20'}
                padding={'6px 12px'}
                list={genders}
                selected={fields.gender}
                onChange={(value) => handleChange('gender', value)}
              />
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.passport', true)} margin={'0 0 20px'}>
              <PassportBox direction={'left'} gap={'12px'}>
                <Input
                  value={fields.passport.series}
                  wide
                  size={'16px'}
                  mask={'99 99'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  placeholder={translator('activation.insurer.passport.series', true)}
                  onChange={(e) => handleChangePassport('series', e.currentTarget.value)}
                />
                <ShortInput
                  value={fields.passport.number}
                  size={'16px'}
                  mask={'999999'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  placeholder={translator('activation.insurer.passport.number', true)}
                  margin={'0 0 0 12px'}
                  onChange={(e) => handleChangePassport('number', e.currentTarget.value)}
                />
              </PassportBox>
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.phone', true)} margin={'0 0 20px'}>
              <Input
                value={fields.phone}
                wide
                mask={'+7 999 999-99-99'}
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                placeholder={translator('activation.insurer.phone.placeholder', true)}
                onChange={(e) => handleChange('phone', e.currentTarget.value)}
              />
            </LabeledBox>
            <LabeledBox text={translator('activation.insurer.email', true)} >
              <Input
                value={fields.email}
                wide
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                placeholder={translator('activation.insurer.email.placeholder', true)}
                onChange={(e) => handleChange('email', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
      </Container>
      <Divider color={'black20'} margin={'24px 0'}/>
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: 3}}>
            <Text size={'20px'} color={'black'} lineHeight={'30px'}>{translator('activation.policy.insurant', true)}</Text>
            <Text size={'20px'} color={'black50'} lineHeight={'30px'} padding={'0 0 16px'}>{translator('activation.policy.insurant.subtitle', true)}</Text>
            <MedcardDropdown
              medcardId={fields.insurant.medcardId}
              onChange={(value) => changeInsurant('medcardId', value)}
              backUrl={'/activation/policy'}
              mobileModal={'mobile-modal-drop-down'}
            />
            {medcard && <Wrapper flow={'column'} align={'flex-start'} padding={'0 0 16px'}>
              {medcard.name && <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.fullname', true)}</Text>
                <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>
                  {medcard.surname && medcard.surname} {medcard.name} {medcard.middlename && medcard.middlename}
                </Text>
              </Wrapper>}
              {medcard.birthDate && <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.birthday', true)}</Text>
                <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>{moment(medcard.birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}</Text>
              </Wrapper>}
              {medcard.phone ? <Wrapper justify={'flex-start'}>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.phone', true)}</Text>
                <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>{medcard.phone}</Text>
              </Wrapper> : <LabeledBox text={translator('activation.insurer.phone', true)} margin={'0 0 12px'}>
                <Input
                  value={fields.insurant.phone}
                  wide
                  mask={'+7 999 999-99-99'}
                  size={'16px'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  placeholder={translator('activation.insurer.phone.placeholder', true)}
                  onChange={(e) => changeInsurant('phone', e.currentTarget.value)}
                />
              </LabeledBox>}
              {medcard.passport && medcard.passport.series && medcard.passport.number
                ? <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                  <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.passport', true)}</Text>
                  <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>
                    {`${translator('activation.insurant.passport.series', true)} ${medcard.passport.series} ${translator('activation.insurant.passport.number', true)} ${medcard.passport.number}`}
                  </Text>
                </Wrapper>
                : <LabeledBox text={translator('activation.insurer.passport', true)}>
                  <PassportBox direction={'left'} gap={'12px'}>
                    <Input
                      value={fields.insurant.passport.series}
                      wide
                      size={'16px'}
                      mask={'99 99'}
                      lineHeight={'24px'}
                      padding={'5px 11px'}
                      placeholder={translator('activation.insurer.passport.series', true)}
                      onChange={(e) => handleChangeInsurantPassport('series', e.currentTarget.value)}
                    />
                    <ShortInput
                      value={fields.insurant.passport.number}
                      size={'16px'}
                      mask={'999999'}
                      lineHeight={'24px'}
                      padding={'5px 11px'}
                      placeholder={translator('activation.insurer.passport.number', true)}
                      margin={'0 0 0 12px'}
                      onChange={(e) => handleChangeInsurantPassport('number', e.currentTarget.value)}
                    />
                  </PassportBox>
                </LabeledBox>
              }
            </Wrapper>}
            <LabeledBox text={translator('activation.insurant.email', true)}>
              <Input
                value={fields.insurant.email}
                wide
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                onChange={(e) => changeInsurant('email', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
      </Container>
      <Divider color={'black20'} margin={'24px 0'} />
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: 3}}>
            <Text size={'20px'} color={'black'} lineHeight={'30px'} padding={'0 0 12px'}>{translator('activation.policy.agreement', true)}</Text>
            <AgreementBlock
              checked={fields.personalAgreement}
              onChange={() => handleChange('personalAgreement', !fields.personalAgreement)}
            />
            <BottomContainer>
              <Button color={'primary'} width={'auto'} cursor={'pointer'} disabled={!fields.personalAgreement} onClick={onSubmit}>
                {translator('activation.policy.activate.button', true)}
              </Button>
            </BottomContainer>
          </Col>
        </Row>
      </Container>
    </ProductWrapper>
  )
}

ProductBuyComponent.propTypes = {
  fields: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}