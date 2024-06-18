import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {Text} from '../../ui/text'
import {Wrapper} from '../../ui/wrapper'
import {CircleButton} from '../../ui/circle-button'
import {Router} from '../../routes'
import {useSelector} from 'react-redux'
import {Well} from '../../ui/well'
import {Container} from '../../ui/grid/container'
import {OrderFields} from './components/fields'
import {LabeledBox} from '../../ui/form/labeled-box'
import {getTranslator} from '../../utils/translation'
import {DoctorOrderBookingTypes} from './components/doctor-order-booking-types'
import {Avatar} from '../../ui/avatar'
import {Icon} from '../../ui/icon'
import {Circle} from '../../ui/circle'

const StyledWell = styled(Well)`
  position: relative;
`

const TitleText = styled(Text)`
  font-size: 28px;
  line-height: 32px;
  color: black;
  padding: 0 40px 20px 0;
  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
  `} 
`

const TitleDoctorText = styled(Text)`
  font-size: 16px;
  line-height: 24px;
  padding-bottom: 6px;
  
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `} 
`

const HintText = styled(Text)`
  width: 537px;
  
  ${media.mobile`
    width: auto;
  `}
`

const StyledCircle = styled(Circle)`
  position: absolute;
  right: 0;
  top: 0;
`

export const OrderDoctorComponent = ({type}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const doctor = useSelector((state) => state.doctors.currentDoctor)
  const cityIdDF = useSelector((state) => state.doctors.filters.cityIdDF)
  const params = cityIdDF ? {cityIdDF: cityIdDF} : {}
  const [orderType, setOrderType] = useState(type || doctor.orderTypes[0].code)

  const handleAvatarClick = async () => {
    if (doctor.photo) {
      const fullName = `${doctor.surname} ${doctor.name} ${doctor.middlename}`
      await dispatch.modal.addAndShowModal({type: 'image', data: { url: doctor.photo, title: fullName, withoutControlsButton: true}})
    }
  }

  const favoriteIcon = doctor.isFavorite ? (
    <StyledCircle color={'starred'} size={24}>
      <Icon type={'star'} color={'white'} width={16} height={16}/>
    </StyledCircle>
  ) : null

  return (
    <StyledWell color={'black06'}>
      <Container>
        <Wrapper flow={'column'}>
          <TitleText>{translator('order.doctor.title', true)}</TitleText>
          <CircleButton icon={'long_arrow_left'} onClick={() => Router.pushRoute('doctors/one', {doctorId: doctor.id, ...params})}/>
        </Wrapper>
        <TitleDoctorText color={'black50'}>{translator('order.doctor.title.doctor', true)}</TitleDoctorText>
        <Wrapper gap={'16px'} padding={'0 0 20px'}>
          <Avatar
            fromList
            src={doctor.photo ? doctor.photo : `/static/doctor/${doctor.gender}_doctor.svg`}
            height={'80px'}
            minHeight={'80px'}
            width={'80px'}
            onClick={handleAvatarClick}
            clickable={!!doctor.photo}
          >
            {favoriteIcon}
          </Avatar>
          <Wrapper flow={'column'}>
            <Text color={'black'} size={'16px'} lineHeight={'24px'}>
              {doctor.surname} {doctor.name} {doctor.middlename}
            </Text>
            {doctor.specializations && <Text color={'black50'} size={'16px'} lineHeight={'24px'}>
              {doctor.specializations.map(value => value.title).join(', ')}
            </Text>}
          </Wrapper>
        </Wrapper>
        <LabeledBox text={translator('order.doctor.title.method', true)} margin={'0 0 10px'} color={'black50'}>
          <DoctorOrderBookingTypes orderType={orderType} onClickType={(code) => setOrderType(code)}/>
        </LabeledBox>
        <OrderFields type={orderType}/>
        <HintText size={'20px'} lineHeight={'30px'} color={'black50'} padding={'16px 0'}>
          {translator('order.doctor.title.confirm', true)}
        </HintText>
      </Container>
    </StyledWell>
  )
}