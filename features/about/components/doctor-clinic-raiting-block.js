import React from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Container} from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {TitleText} from '../../../ui/title-text'
import {Icon} from '../../../ui/icon'
import {T} from '../../../utils/translation'
import {Img} from '../../../ui/img'
import {MediumText} from '../../../ui/medium-text'

const doctorPoints = [
  'rating.doctor.clean',
  'rating.doctor.kindness',
  'rating.doctor.understandability',
  'rating.doctor.painfulness',
  'rating.doctor.fullness'
]

const clinicPoints = [
  'rating.clinic.availability',
  'rating.clinic.comfort',
  'rating.clinic.transport',
  'rating.clinic.process-organization',
  'rating.clinic.reception-quality',
  'rating.clinic.financial-availability'
]

const InlineText = styled(MediumText)`
  display: inline-block;
`

export const DoctorClinicRatingBlock = ({doctor}) => {
  const points = doctor ? doctorPoints : clinicPoints
  return (
    <Well>
      <Container>
        <TitleText>{doctor ? <T>rating.doctor</T> : <T>rating.clinic</T>}</TitleText>
        <TitleText color={'black50'}>{doctor ? <T>rating.doctor.text</T> : <T>rating.clinic.text</T>}</TitleText>
        <Wrapper padding={'24px 0'} mobilePadding={'32px 0'} gap={'12px'}>
          <Img src={doctor ? '/static/about_doctor.svg' : '/static/about_clinic.svg'} width={'110px'} height={'110px'} shrink={'0'}/>
          <Img src={doctor ? '/static/about_doctor_rating.svg' : '/static/about_clinic_rating.svg'} width={'110px'} height={'110px'} shrink={'0'}/>
        </Wrapper>
        <InlineText width={'auto'}>{doctor ? <T>rating.doctor.patients-rate</T> : <T>rating.clinic.patients-rate</T>} </InlineText>
        <InlineText width={'auto'} color={'black50'}>{doctor ? 5 : 6} <T>rating.parameters</T></InlineText>
        {
          points.map(point =>
            <Wrapper padding={'4px 0 0'} mobilePadding={'8px 0 0'} align={'center'}>
              <Icon type={'success'} width={24} height={24}/>
              <InlineText padding={'0 0 0 12px'}><T>{point}</T></InlineText>
            </Wrapper>
          )
        }
        {!doctor && <MediumText padding={'24px 0 0'}><T>rating.clinic.opinion</T></MediumText>}
      </Container>
    </Well>
  )
}
