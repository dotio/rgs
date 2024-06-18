import React, {memo} from 'react'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import moment from 'moment'
import {Avatar} from '../../../ui/avatar'
import {Img} from '../../../ui/img'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'

const DoctorWrapper = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;

  border: 1px solid ${p => getColor('black15', p.theme)};
  box-sizing: border-box;
  border-radius: 20px;
`

const CardWrapper = styled(Wrapper)`
  ${p => !p.isConsultationRoute && `
    flex-direction: column;
    align-items: flex-start;
  `}
  
  ${media.mobile `
    flex-direction: column;
    align-items: flex-start;
  `}
`

const ProduceWrapper = styled(Wrapper)`
  ${p => !p.isConsultationRoute && `
    flex-direction: column;
    align-items: flex-start;
  `}
  
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`

export const MessageAppointment = memo(({ isConsultationRoute, message, isWidget}) => {
  const { doctor, clinic, specialization, date} = message
  const monthDate = moment(date).format('D MMMM')
  const time = moment(date).format('HH:mm')

  return (
    <DoctorWrapper>
      <Wrapper flow={'column'} justify={'space-between'}>
        <Wrapper>
          <Text color={isWidget ? 'white' : 'black'} lineHeight={'30px'} size={'20px'} width={'100%'}>
            {monthDate}
          </Text>
          <Text pointer shrink={'0'} color={'secondary'} size={'20px'} lineHeight={'30px'} align={'right'} width={'auto'}>
            <T ucFirst>chat.appointment.new</T>
          </Text>
        </Wrapper>
        <Text color={'black50'} size={'20px'} lineHeight={'30px'}>
          {`${specialization.title} в ${time}`}
        </Text>
      </Wrapper>
      <CardWrapper isConsultationRoute={isConsultationRoute} align={'center'}width={'100%'} margin={{top: '20px'}}>
        <Text color={'black50'} width={'155px'} align={'left'} size={'16px'} lineHeight={'24px'}>
          <T ucFirst>chat.appointment.doctor</T>
        </Text>
        <Wrapper>
          <Avatar size={'25px'} src={doctor.img} borderRadius={'6px'} text={doctor && `${doctor.name[0]}${doctor.surname[0]}`}/>
          <Text color={isWidget ? 'white' : 'black'} padding={'0 0 0 8px'} align={'left'} size={'16px'} lineHeight={'24px'}>{`${doctor.surname} ${doctor.name} ${doctor.middlename}`}</Text>
        </Wrapper>
      </CardWrapper>
      <CardWrapper isConsultationRoute={isConsultationRoute} align={'center'} width={'100%'} margin={{top: '20px'}}>
        <Text color={'black50'} width={'155px'} align={'left'} size={'16px'} lineHeight={'24px'}>
          <T ucFirst>chat.appointment.clinic</T>
        </Text>
        <Wrapper>
          <Avatar size={'25px'} src={clinic.img} borderRadius={'6px'}/>
          <Text color={isWidget ? 'white' : 'black'} padding={'0 0 0 8px'} align={'left'} size={'16px'} lineHeight={'24px'}>{`${clinic.name}`}</Text>
        </Wrapper>
      </CardWrapper>
      <CardWrapper isConsultationRoute={isConsultationRoute} align={'center'} margin={{top: '20px'}}>
        <Text shrink={'0'} color={'black50'} width={'155px'} align={'left'} size={'16px'} lineHeight={'24px'}>
          <T ucFirst>chat.appointment.price</T>
        </Text>
        <ProduceWrapper isConsultationRoute={isConsultationRoute}>
          <Text color={isWidget ? 'white' : 'black'} width={'auto'} shrink={'0'} padding={'0 0 0 8px'} align={'left'} size={'16px'} lineHeight={'24px'}><T ucFirst>chat.appointment.service</T></Text>
          <Wrapper margin={{left: '8px'}} align={'center'}>
            <Img width={'24px'} height={'24px'} shrink={'0'} src={'/static/logo.svg'}/>
            <Text color={isWidget ? 'white' : 'black'} width={'auto'} shrink={'0'} padding={'0 0 0 8px'}><T ucFirst>chat.appointment.medconsultant</T></Text>
          </Wrapper>
        </ProduceWrapper>
      </CardWrapper>
    </DoctorWrapper>
  )
})