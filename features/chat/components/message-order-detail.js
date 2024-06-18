import React, {memo, useMemo} from 'react'
import styled, {css} from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'
import {Text} from '../../../ui/text'
import moment from 'moment'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {T} from '../../../utils/translation'
import {getTheme} from './chat-bubble'
import {MediumText} from '../../../ui/medium-text'
import {Avatar} from '../../../ui/avatar'
import {useDispatch} from 'react-redux'
import {Button} from '../../../ui/button'
import {Router} from '../../../routes'

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${p => getColor('black15', p.theme)};
  border-radius: 20px;
  width: ${p => p.isConsultationRoute ? '598px' : 'calc(100% - 4px)'};
  padding: 20px;
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

const ListItemContainer = styled.div`
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

export const MessageOrderDetail = memo(({message, isConsultationRoute, isWidget}) => {
  const dispatch = useDispatch()
  const {
    date, specialization,
    firstName, lastName, middleName, photo,
    clinicName, clinicLogo, clinicAddress, price,
    productName, productImage, productTitle, clinicMetro,
    services, clinicId, doctorId, orderId
  } = message.params
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [message.id || message.clientMessageId])
  const theme = isWidget ?  'widget' : 'blue'
  const {textColor} = getTheme(theme)

  const onDoctorClick = () => {
    dispatch.modal.addAndShowModal({type: 'doctor-info-short', data: {id: doctorId}})
  }

  const onClinicClick = () => {
    dispatch.modal.addAndShowModal({type: 'clinic-info-modal', data: {id: clinicId}})
  }

  return (
    <MessageContainer isConsultationRoute={isConsultationRoute}>
      <HeaderWrapper align={'center'} isConsultationRoute={isConsultationRoute}>
        <MediumText color={textColor}>
          {`${moment(date).format('DD MMMM')} в ${moment(date).format('HH:mm')}`}
        </MediumText>
        <Text
          color={'secondary'}
          size={'20px'}
          lineHeight={'30px'}
          align={!isConsultationRoute ? 'left' : 'right'}
          smAlign={'left'}
        >
          {orderId && orderId ? '' : <T ucFirst>chat.message-order-detail.new</T>}
        </Text>
      </HeaderWrapper>
      <Wrapper padding={!isConsultationRoute ? '0 0 16px' : '0 0 20px'} mobileGap={'0 0 16px'}>
        <MediumText color={'black50'}>{specialization}</MediumText>
      </Wrapper>

      {(firstName || lastName || middleName) &&
      <ListItemContainer isConsultationRoute={isConsultationRoute}>
        <Title color={'black50'}><T ucFirst>chat.message-order-detail.doctor</T></Title>
        <DoctorContainer onClick={() => doctorId ? onDoctorClick() : {}} pointer={!!doctorId}>
          <DoctorPhoto src={photo ? photo : '/static/doctor/male_doctor.svg'} width={'24px'} height={'24px'} minHeight={'24px'}/>
          <Text color={textColor} padding={'0 0 0 8px'}>{[lastName, firstName, middleName].join(' ')}</Text>
        </DoctorContainer>
      </ListItemContainer>
      }

      {clinicName &&
      <ListItemContainer isConsultationRoute={isConsultationRoute}>
        <Title color={'black50'}><T ucFirst>chat.message-order-detail.clinic</T></Title>
        <ClinicContainer>
          <ClinicHeader onClick={() => clinicId ? onClinicClick() : {}} pointer={!!clinicId}>
            <ClinicIcon src={clinicLogo ? clinicLogo : `/static/mocks/clinic${memoizedRandom}.svg`} width={'24px'} height={'24px'} minHeight={'24px'} borderRadius={'4px'}/>
            <Text color={textColor} padding={'0 0 0 8px'}>{clinicName}</Text>
          </ClinicHeader>
          <Text color={'black50'} >{clinicAddress}</Text>
          {clinicMetro && <Text color={'black50'} >{`м. ${clinicMetro}`}</Text>}
        </ClinicContainer>
      </ListItemContainer>
      }

      {services &&
      <ListItemContainer isConsultationRoute={isConsultationRoute}>
        <Title color={'black50'}><T ucFirst>chat.message-order-detail.service</T></Title>
        <Text color={textColor}>{services}</Text>
      </ListItemContainer>
      }

      {price && price !== '0' ?
        <ListItemContainer isConsultationRoute={isConsultationRoute}>
          <Title color={'black50'}><T ucFirst>chat.message-order-detail.price</T></Title>
          <Text color={textColor}>{price} <T ucFirst>chat.message-order-detail.rubl</T></Text>
        </ListItemContainer>
        :
        <ListItemContainer isConsultationRoute={isConsultationRoute}>
          <Title color={'black50'}><T ucFirst>chat.message-order-detail.price</T></Title>
          <Wrapper flow={'column'}>
            <Text shrink={'0'} color={textColor}>{productTitle}</Text>
            <Wrapper>
              {productName && <>
              <ProductIcon width={'24px'} height={'24px'} minHeight={'24px'} borderRadius={'4px'} src={productImage !== '' ? productImage : '/static/mocks/m_plus.svg'}/>
              <Text as={'span'} padding={'0 0 0 8px'}>{productName}</Text>
              </>}
            </Wrapper>
          </Wrapper>
        </ListItemContainer>
      }

      {orderId &&
      <ListItemContainer isConsultationRoute={isConsultationRoute}>
        <Button color={'black05'} onClick={() => Router.pushRoute(`/profile/medcard/order/${orderId}`)}>Итоги консультации</Button>
      </ListItemContainer>}

    </MessageContainer>
  )
})