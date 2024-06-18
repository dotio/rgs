import React, {memo, useMemo} from 'react'
import styled, {css} from 'styled-components'
import moment from 'moment'
import {getColor} from '../../../ui/helpers/getColor'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Avatar} from '../../../ui/avatar'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'
import {Button} from '../../../ui/button'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {getTheme} from './chat-bubble'
import {useDispatch} from 'react-redux'
import {MediumText} from '../../../ui/medium-text'

const BillWrapper = styled(Wrapper)`
  padding: 20px;
  border: 1px solid ${p => getColor('black15', p.theme)};
  width: ${p => p.isConsultationRoute ? '598px' : 'calc(100% - 4px)'};
  border-radius: 20px;
  ${p => !p.isConsultationRoute && `
      padding: 15px;
   `}

  ${media.mobile `
    padding: 15px;
    width: calc(100% - 4px);
  `}
`

const HeaderWrapper = styled(Wrapper)`
  ${p => !p.isConsultationRoute && `
      flex-direction: column;
      align-items: flex-start;
      flex-direction: column-reverse;
   `}
  }

  ${media.mobile`
    flex-direction: column-reverse;
  `}
`

const Title = styled(Text)`
  width: 155px;
  min-width: 155px;
    
    ${media.mobile`
      width: 100%;
      min-width: 100%;
    `}
`

const CardWrapper = styled.div`
  display: flex;
  padding-bottom: 20px;
  ${p => !p.isConsultationRoute && `
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 16px;
  `}
  
  ${media.mobile`
    flex-direction: column;
    padding-bottom: 16px;
  `}
  
  &:last-child {
    padding-bottom: 0;
  }
`

const DoctorContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  ${p => p.pointer && css`
    cursor: pointer;
  `}
  ${p => !p.isConsultationRoute && `
      align-items: flex-start;
   `}
`

const DoctorPhoto = styled(Avatar)`
  ${media.mobile`
    width: 24px;
    height: 24px;
    min-height: 24px;
  `}
`

const ClinicContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`

const ClinicHeader = styled.div`
  display: flex;
  ${p => p.pointer && css`
    cursor: pointer;
  `}
`

const ClinicIcon = styled(Avatar)`
  ${media.mobile`
    width: 24px;
    height: 24px;
    min-height: 24px;
  `}
`

const ProductIcon = styled(Avatar)`
  ${media.mobile`
    width: 24px;
    height: 24px;
    min-height: 24px;
  `}
`

const StyledAvatar = styled(Avatar)`
  font-size: 16px;
  line-height: 24px;
`

export const MessagePayDetail = memo(({message, isConsultationRoute, isWidget}) => { //<--добавить
  // {message} при подключении бэка
  const {
    firstName,
    lastName,
    middleName,
    serviceTitle,
    billStatus,
    photo,
    price,
    clinicAddress,
    clinicName,
    clinicLogo,
    clinicMetro,
    date,
    client,
    billTitle,
    specialization,
    productTitle,
    productImage,
    productName,
    billId,
    clinicId,
    doctorId,
  } = message.params

  // TODO Верстку иконки продукта, когда бэк начнет присылать
  const monthInsertDate = moment(date).format('D MMMM')
  const insertTime = moment(date).format('HH:mm')
  //const monthDate = moment(date).format('D MMMM')
  // const time = moment(date).format('HH:mm')
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [message.id || message.clientMessageId])
  const dispatch = useDispatch()

  const theme = isWidget ?  'widget' : 'blue'
  const {textColor} = getTheme(theme)

  const onDoctorClick = () => {
    dispatch.modal.addAndShowModal({type: 'doctor-info-short', data: {id: doctorId}})
  }

  const onClinicClick = () => {
    dispatch.modal.addAndShowModal({type: 'clinic-info-modal', data: {id: clinicId}})
  }

  return (
    <BillWrapper isConsultationRoute={isConsultationRoute} flow={'column'}>
      <HeaderWrapper align={'center'} isConsultationRoute={isConsultationRoute}>
        {monthInsertDate && insertTime && <MediumText color={textColor}> {monthInsertDate}{` в ${insertTime}`}</MediumText>}
        {billStatus && billTitle && <MediumText
          color={billStatus === 'not_paid' ? 'dangerousRed' : 'positiveGreen'}
          align={!isConsultationRoute ? 'left' : 'right'}
          smAlign={'left'}
        >
          {billTitle}
        </MediumText>}
      </HeaderWrapper>
      {specialization && <Wrapper padding={!isConsultationRoute ? '0 0 16px' : '0 0 20px'} mobileGap={'0 0 16px'}>
        <MediumText color={'black50'}>{specialization}</MediumText>
      </Wrapper>}

      {(firstName || lastName || middleName) && <CardWrapper isConsultationRoute={isConsultationRoute} align={'center'}>
        <Title color={'black50'} ><T ucFirst>chat.appointment.doctor</T></Title>
        <DoctorContainer onClick={() => doctorId ? onDoctorClick() : {}} pointer={!!doctorId}>
          <DoctorPhoto src={photo ? photo : '/static/doctor/male_doctor.svg'} width={'24px'} height={'24px'} minHeight={'24px'}/>
          <Text color={textColor} padding={'0 0 0 8px'}>{[lastName, firstName, middleName].join(' ')}</Text>
        </DoctorContainer>
      </CardWrapper>}

      {clinicName && <CardWrapper isConsultationRoute={isConsultationRoute}>
        <Title color={'black50'}><T ucFirst>chat.appointment.clinic</T></Title>
        <ClinicContainer>
          <ClinicHeader onClick={() => clinicId ? onClinicClick() : {}} pointer={!!clinicId}>
            <ClinicIcon src={clinicLogo ? clinicLogo : `/static/mocks/clinic${memoizedRandom}.svg`} width={'24px'} height={'24px'} minHeight={'24px'} borderRadius={'4px'}/>
            <Text color={textColor} padding={'0 0 0 8px'}>{clinicName}</Text>
          </ClinicHeader>
          <Text color={'black50'} >{clinicAddress}</Text>
          {clinicMetro && <Text color={'black50'} >{`м. ${clinicMetro}`}</Text>}
        </ClinicContainer>
      </CardWrapper>}

      {serviceTitle && <CardWrapper isConsultationRoute={isConsultationRoute}>
        <Title color={'black50'}><T ucFirst>chat.bill.service</T></Title>
        <Text color={textColor}>{serviceTitle}</Text>
      </CardWrapper>}

      {/*<CardWrapper isConsultationRoute={isConsultationRoute}>*/}
      {/*  <Text color={'black50'}><T ucFirst>chat.bill.date-and-time</T></Text>*/}
      {/*  <Text color={textColor}>{`${monthDate} в ${time}`}</Text>*/}
      {/*</CardWrapper>*/}

      {client && <CardWrapper isConsultationRoute={isConsultationRoute}>
        <Title color={'black50'}><T ucFirst>chat.bill.client</T></Title>
        <Wrapper flow={'row'}>
          <StyledAvatar size={'24px'} height={'24px'} minHeight={'24px'} color={'white'} bgColor={'secondary'} src={client.photo} text={client.firstName[0]}/>
          <Wrapper justify={'flex-start'}>
            <Text width={'auto'} color={textColor}>{client.firstName} {client.lastName}</Text>
            <Text width={'auto'} color={textColor || 'black50'} >{client.relation}</Text>
          </Wrapper>
        </Wrapper>
      </CardWrapper>}

      {price && price !== '0' ?
        <CardWrapper isConsultationRoute={isConsultationRoute}>
          <Title color={'black50'}><T ucFirst>chat.appointment.price</T></Title>
          <Text shrink={'0'} color={textColor}>{`${price} ₽`}</Text>
        </CardWrapper>
        :
        <CardWrapper isConsultationRoute={isConsultationRoute}>
          <Title color={'black50'}><T ucFirst>chat.appointment.price</T></Title>
          <Wrapper flow={'column'}>
            <Text shrink={'0'} color={textColor}>{productTitle}</Text>
            <Wrapper>
              {productName && <>
              <ProductIcon width={'24px'} height={'24px'} minHeight={'24px'} borderRadius={'4px'} src={productImage !== '' ? productImage : '/static/mocks/m_plus.svg'}/>
              <Text as={'span'} padding={'0 0 0 8px'}>{productName}</Text>
              </>}
            </Wrapper>
          </Wrapper>
        </CardWrapper>}


      {billStatus === 'not_paid' && <CardWrapper isConsultationRoute={isConsultationRoute}>
        <Button color={'primary'} onClick={() => dispatch.modal.addAndShowModal({type: 'bill-info-modal', billId})}><T ucFirst>chat.bill.pay</T></Button>
      </CardWrapper>}
    </BillWrapper>
  )
})
