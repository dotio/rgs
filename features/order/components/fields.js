import React, {PureComponent, useState, useMemo} from 'react'
import {connect, useSelector} from 'react-redux'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {Switcher} from '../../../ui/form/switcher'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {nonEmptyOrTimeFormat} from '../../../helpers/validator'
import {DateTimeFilter} from '../../../templates/filters/components/date-time-filter'
import {MedcardDropdown} from '../../activation/components/medcard-dropdown'
import {Button} from '../../../ui/button'
import {Input} from '../../../ui/form/input'
import {FormButton} from '../../../ui/buttons/form-button'
import {DateSlotsFilter} from '../../../templates/filters/components/date-slots-filter'
import {AddressesDropdown} from './addresses-dropdown'
import {getTranslator} from '../../../utils/translation'
import moment from 'moment'
import {Checkbox} from '../../../ui/form/checkbox'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {AddressesRepository} from '../../profile/repository/addresses'
import {Icon} from '../../../ui/icon'
import {Circle} from '../../../ui/circle'
import {Router} from '../../../routes'
import {Avatar} from '../../../ui/avatar'

const StyledButton = styled(Button)`
  font-size: 20px !important;
  height: 48px;
  padding: 9px 16px;
`

const StyledInput = styled(Input)`
  width: 354px;
  height: 36px;
  ${media.mobile`
    width: 100%;
  `}
`

const TitleWrapper = styled(Wrapper)`
  ${media.mobile`
    align-items: flex-start;
    flex-direction: column;
     & > * + * {
      margin-top: 6px;
    };
  `}
`

const SelectClinicButton = styled(FormButton)`
  height: 36px;
`

const StyledCircle = styled(Circle)`
  position: absolute;
  right: 0;
  top: 0;
`

const Clinic = ({onClick, isSelected, clinic, showButton = true}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1, 5), [clinic.name])

  const favoriteIcon = clinic.isFavorite ? (
    <StyledCircle color={'starred'} size={24}>
      <Icon type={'star'} color={'white'} width={16} height={16}/>
    </StyledCircle>
  ) : null

  return (
    <Wrapper justify={'space-between'} onClick={onClick} gap={'24px'}>
      <Wrapper align={'flex-start'} gap={'16px'}>
        <Avatar
          borderRadius={'16px'}
          shrink={'0'}
          fromList
          src={clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`}
          height={'80px'}
          minHeight={'80px'}
          width={'80px'}
        >
          {favoriteIcon}
        </Avatar>
        <TitleWrapper justify={'space-between'}>
          <Wrapper margin={'0 0 6px 0'} flow={'column'}>
            <Text style={{marginTop: '5px'}} color={'black'} size={'16px'} lineHeight={'24px'}>{clinic.name}</Text>
            <Text breakWord color={'black50'} size={'16px'} lineHeight={'24px'}>{clinic.address}</Text>
            {clinic.metro && clinic.metro.map(item => <Text key={item.id} color={item.color}>{`м. ${item.name}`}</Text>)}
          </Wrapper>
          {showButton && <SelectClinicButton margin={'0'} selected={isSelected} onClick={onClick}>{translator('order.online.button.choose', true)}</SelectClinicButton>}
        </TitleWrapper>
      </Wrapper>
    </Wrapper>
  )
}

const ShowClinic = ({selected, onChange}) => {
  const doctor = useSelector(state => state.doctors.currentDoctor)
  const selectedClinic = selected ? doctor.clinics.find(clinic => clinic.id === selected) : {}
  const [showList, setShowList] = useState(!selected)
  const translator = useSelector(state => getTranslator(state.localization))

  const ButtonNeedSelect = () => {
    return (
      <Text size={'16px'} align={'right'} pointer color={'green'} onClick={() => setShowList(true)}>
        {translator('order.online.button.change', true)}
      </Text>
    )
  }

  return <Wrapper flow={'column'} align={'flex-start'} padding={'10px 0 20px'}>
    {!showList
      ? <>
        <Wrapper flow={'row'} align={'flex-start'} justify={'space-between'} gap={'24px'} padding={'0 0 6px'}>
          <Text color={'black50'}>{translator('order.online.title', true)}</Text>
          {doctor.clinics.length > 1 && <ButtonNeedSelect/>}
        </Wrapper>
        <Clinic clinic={selectedClinic} showButton={false}/>
      </>
      : <>
        <Text size={'16px'} lineHeight={'24px'} color={'black50'} padding={'0 0 6px'}>
          {translator('order.online.title.choose', true)}
        </Text>
        <Wrapper flow={'column'} gap={'16px'}>
          {doctor.clinics.map((clinic, index) => {
            return <Clinic
              isSelected={clinic.id === selected}
              clinic={clinic}
              key={'clinic-' + clinic.id + index}
              onClick={() => {
                onChange(clinic.id)
                setShowList(false)
              }}
            />
          })}
        </Wrapper>
      </>}
  </Wrapper>
}

export class OrderFieldsPure extends PureComponent {
  constructor(props) {
    super(props)

    const typeId = props.doctor.orderTypes.find(item => item.code === props.type)
      ? props.doctor.orderTypes.find(item => item.code === props.type).id
      : props.doctor.orderTypes[0].id

    this.state = {
      form: {
        typeId: typeId,
        specializationId: props.doctor.specializations && props.doctor.specializations[0] ? props.doctor.specializations[0].id : null,
        clinicId: props.type === 'booking' && props.doctor.clinics.length > 0 ? props.doctor.clinics[0].id : '',
        date: moment().format('YYYY-MM-DD'),
        medcardId: props.initMedcardId,
        addressId: null,
        slotId: null,
        time: '',
        sickList: false,
      },
      errors: {
        addressId: ''
      }
    }
  }

  componentDidMount() {
    this.getSlots()
  }

  async componentDidUpdate(prevProps, prevState) {
    const {type, doctor} = this.props
    const {form} = this.state

    if(prevProps.type !== type) {
      this.setState(state => ({form: {
        ...state.form,
        typeId: doctor.orderTypes.find(item => item.code === type).id,
        date: moment().format('YYYY-MM-DD'),
      }}))
      this.getSlots()
    }

    if(form.specializationId && form.date && ((prevState.form.specializationId !== form.specializationId) || (prevState.form.date !== form.date))) {
      await this.getSlots()
    }

    if(prevState.form.addressId !== form.addressId) {
      await this.getSlots()
    }
  }

  getSlots = async () => {
    const {form} = this.state
    const {getDoctorSlots, type, showLoader, doctor} = this.props

    showLoader()
    const slots = await getDoctorSlots({
      doctorId: doctor.id,
      params: {
        type,
        specializationId: form.specializationId,
        date: form.date,
      }
    })

    this.handleChange('slotId', form.date && slots && slots[0] ? slots[0].id : null)
  }

  handleChange = (field, value) => {
    if (field === 'date' && !value) {
      this.setState(state => ({form: {...state.form, 'slotId': null}}))
      return
    }

    this.setState(state => ({form: {...state.form, [field]: value}}))
  }

  handleAddressChange = async (value) => {
    const {translator, doctor} = this.props

    this.setState(state => ({form: {...state.form, addressId: value}}))
    this.setState(state => ({errors: {...state.errors, addressId: ''}}))

    try {
      const {isAvailable} = await AddressesRepository.check(value, {doctorId: doctor.id})
      if(!isAvailable) {
        this.setState(state => ({errors: {...state.errors, addressId: translator('order.doctor.alert-address', true)}}))
      }
    } catch (e) {
      this.setState(state => ({errors: {...state.errors, addressId: translator('order.doctor.alert-address', true)}}))
    }
  }

  formDisabled = () => {
    const {form, errors} = this.state
    const {loggedIn} = this.props

    return (form.typeId === 3 && !form.clinicId)
      || (form.typeId === 2 && !form.addressId)
      || !form.typeId
      || !form.specializationId
      || !form.slotId && !nonEmptyOrTimeFormat(form.time)
      || (!loggedIn && !form.medcardId)
      || (form.typeId === 2 && errors.addressId.length > 0)
  }

  onSubmit = async() => {
    const {loggedIn, createOrGoToActive, doctor, createOrder, showLoader, hideLoader, router} = this.props
    const {form} = this.state

    if(!loggedIn){
      Router.push('/login', {backUrl: router})
    }

    if(loggedIn){
      showLoader()

      await createOrGoToActive('chat', true)
      await createOrder({doctorId: doctor.id, data: form})

      hideLoader()
    }

  }

  render() {
    const {loggedIn, type, translator, doctor, slots} = this.props
    const {form, errors} = this.state

    return (
      <Wrapper flow={'column'}>
        {type === 'booking' && <ShowClinic selected={form.clinicId} onChange={(value) => this.handleChange('clinicId', value)}/>}
        {type === 'home' && (
          <LabeledBox text={translator('order.doctor.title.address', true)} margin={'0 0 20px'} color={'black50'}>
            <AddressesDropdown
              errorText={errors.addressId}
              addressId={form.addressId}
              margin={'0'}
              onChange={(value) => this.handleAddressChange(value)}
              mobileModal={'mobile-modal-drop-down'}
            />
          </LabeledBox>
        )}
        {doctor.specializations.length > 1 && (
          <LabeledBox text={translator('order.online.title.specialization', true)} margin={'0 0 10px'} color={'black50'}>
            <Switcher
              selected={form.specializationId}
              list={doctor.specializations.map(({id, title}) => ({value: id, title}))}
              onChange={(value) => this.handleChange('specializationId', value)}
              optionsMargin={'0 10px 10px 0'}
              optionsWrap={false}
            />
          </LabeledBox>
        )}
        <LabeledBox text={translator('order.online.title.date', true)} margin={'0 0 10px'} color={'black50'}>
          <DateTimeFilter date={form.date} setDate={(value) => this.handleChange('date', value)} format={'dddd, DD MM'} withoutCrossIcon optionsMargin={'0 10px 10px 0'} insetShift={'10px'}/>
        </LabeledBox>
        {form.date && (
          <LabeledBox text={translator('order.online.title.time', true)} margin={'0 0 20px'} color={'black50'}>
            {slots && slots.length ?
              <DateSlotsFilter slotId={form.slotId} setSlot={(id) => this.handleChange('slotId', id)} slots={slots} withoutCrossIcon/> :
              <StyledInput
                maskChar={false}
                value={form.time}
                onChange={(e) => this.handleChange('time', e.currentTarget.value)}
                bgColor={'white'}
                mask={'99:99'}
                borderRadius={'16px'}
                size={'16px'}
                borderSize={'1px'}
                borderColor={'black20'}
                padding={'6px 12px'}
                placeholder={translator('order.online.title.time-placeholder', true)}
              />}
          </LabeledBox>
        )}
        {type === 'home' && (
          <LabeledBox margin={'0 0 20px'} text={translator('order.doctor.title.sick.list', true)} color={'black50'}>
            <Checkbox
              key={'subscription'}
              onClick={() => this.handleChange('sickList', !form.sickList)}
              title={'Нужен больничный'}
              checked={form.sickList}
              alignItems={'top'}
            />
          </LabeledBox>
        )}
        {loggedIn && <LabeledBox text={translator('order.online.title.who', true)} color={'black50'}>
          <MedcardDropdown
            medcardId={form.medcardId}
            onChange={(value) => this.handleChange('medcardId', value)}
            backUrl={`/order/doctor/${doctor.id}`}
            margin={'0'}
            mobileModal={'mobile-modal-drop-down'}
          />
        </LabeledBox>}
        <Wrapper padding={{top: '32px'}}>
          <StyledButton
            color={'green'}
            onClick={this.onSubmit}
            cursor={'pointer'}
            disabled={loggedIn && this.formDisabled()}
          >
            {translator('order.online.button.recording', true)}
          </StyledButton>
        </Wrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    translator: getTranslator(state.localization),
    doctor: state.doctors.currentDoctor,
    slots: state.order.slots,
    loggedIn: state.login.loggedIn,
    initMedcardId: state.user.mainMedcardId,
    router: state.router.currentPath ? state.router.currentPath : ''
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDoctorSlots: (params) => dispatch.doctors.getDoctorSlots(params),
    createOrGoToActive: (type, redirect) => dispatch.consultation.createOrGoToActive({type, redirect}),
    createOrder: (params) =>  dispatch.order.create(params),
    showLoader: () =>  dispatch.loaders.showLoader(),
    hideLoader: () =>  dispatch.loaders.hideLoader(),
  }
}

export const OrderFields = connect(mapStateToProps, mapDispatchToProps)(OrderFieldsPure)