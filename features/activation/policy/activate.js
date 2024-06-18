import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {Text} from '../../../ui/text'
import {Button} from '../../../ui/button'
import {Wrapper} from '../../../ui/wrapper'
import {Gap} from '../../../ui/gap'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'
import {Input} from '../../../ui/form/input'
import moment from 'moment'
import {MedcardDropdown} from '../components/medcard-dropdown'
import {Img} from '../../../ui/img'
import {CalendarInput} from '../../../ui/form/calendar-input'
import {Switcher} from '../../../ui/form/switcher'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Container} from '../../../ui/grid/container'
import {Divider} from '../../../ui/divider'
import {getTranslator} from '../../../utils/translation'
import {AgreementBlock} from '../../../ui/form/agreement'
import {isMobile} from 'react-device-detect'

const StyledCalendar = styled(CalendarInput)`
  ${p => p.left && css`
      left: 76% !important;
      border: 1px solid ${getColor('black10', p.theme)};
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

const StyledImg = styled(Img)`
  background-image: ${p => `url(${p.src})`};
  width: 80px;
  min-height: 80px;
  height: 80px;
  flex-grow: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  
  ${media.mobile`
    width: 60px;
    min-height: 60px;
    height: 60px;
  `}
`

export const ActivateForm = ({fields, onChange, onSubmit, goBack}) => {
  const policy = useSelector(state => state.activation.currentPolicy)
  const translator = useSelector(state => getTranslator(state.localization))

  const otherMedcard = useSelector(state => state.profileMedcard.otherMedcard)
  const isTeenager =  otherMedcard && moment().diff(moment(otherMedcard.birthDate, 'YYYY-MM-DD'), 'years') <= 14
  const notLaterThenDate = moment().subtract(18, 'years').format('YYYY-MM-DD')

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

  useEffect(() => {
    changeInsurant('phone', otherMedcard && otherMedcard.phone ? otherMedcard.phone : (isTeenager ? fields.phone : ''))
  }, [otherMedcard])
  return (
    <>
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: 3}}>
            <Wrapper justify={'space-between'} margin={'0 0 12px'}>
              <Text size={'16px'} color={'black50'} lineHeight={'24px'}>{translator('activation.policy.activate.title', true)}</Text>
              <Text size={'16px'} width={'auto'} color={'primary'} lineHeight={'24px'} onClick={goBack} pointer>{translator('activation.policy.change.button', true)}</Text>
            </Wrapper>
          </Col>

          <Col lg={{cols: 6, offset: 3}}>
            <PolicyBox>
              <StyledImg src={policy.image} borderRadius={'16px'} alt={''} shrink={'0'} />
              <PolicyInfo>
                <Text size={'16px'} color={'black'} lineHeight={'24px'}>{policy.name}</Text>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'}>
                  {translator('activation.policy.before', true)} {moment(policy.dateEnd).format('DD.MM.YYYY')}
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
                onChange={(value) => handleChange('birthDate', isMobile ? moment(value).format('DD.MM.YYYY') : value)}
                value={isMobile ? moment(fields.birthDate, 'DD.MM.YYYY').format('YYYY-MM-DD') : fields.birthDate}
                left={onChange}
                ageStart={18}
                max={notLaterThenDate}
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
                  value={fields.passport && fields.passport.series}
                  wide
                  size={'16px'}
                  mask={'99 99'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  placeholder={translator('activation.insurer.passport.series', true)}
                  onChange={(e) => handleChangePassport('series', e.currentTarget.value)}
                />
                <ShortInput
                  value={fields.passport && fields.passport.number}
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
              isActivation
            />
            {otherMedcard && <Wrapper flow={'column'} align={'flex-start'}>
              {otherMedcard.name && <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.fullname', true)}</Text>
                <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>
                  {otherMedcard.surname && otherMedcard.surname} {otherMedcard.name} {otherMedcard.middlename && otherMedcard.middlename}
                </Text>
              </Wrapper>}
              {otherMedcard.birthDate && <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.birthday', true)}</Text>
                <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>{moment(otherMedcard.birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY')}</Text>
              </Wrapper>}
              {!isTeenager && <>
                {otherMedcard.passport && otherMedcard.passport.series && otherMedcard.passport.number
                  ? <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                    <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.passport', true)}</Text>
                    <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>
                      {`${translator('activation.insurant.passport.series', false)} ${otherMedcard.passport.series} ${translator('activation.insurant.passport.number', false)} ${otherMedcard.passport.number}`}
                    </Text>
                  </Wrapper>
                  : <LabeledBox text={translator('activation.insurer.passport', true)} margin={'0 0 12px'}>
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
              </>}
              {otherMedcard.phone && !isTeenager ? <Wrapper justify={'flex-start'} padding={'0 0 5px'}>
                <Text size={'16px'} color={'black50'} lineHeight={'24px'} width={'auto'}>{translator('activation.insurant.phone', true)}</Text>
                <Text size={'16px'} color={'black'} lineHeight={'24px'} width={'auto'} padding={'0 0 0 6px'}>{otherMedcard.phone}</Text>
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
              {!isTeenager && <LabeledBox text={translator('activation.insurant.email', true)}>
                <Input
                  value={otherMedcard.email ? otherMedcard.email : fields.insurant.email}
                  wide
                  size={'16px'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  onChange={(e) => changeInsurant('email', e.currentTarget.value)}
                />
              </LabeledBox>}
            </Wrapper>}
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
    </>
  )
}

ActivateForm.propTypes = {
  fields: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}