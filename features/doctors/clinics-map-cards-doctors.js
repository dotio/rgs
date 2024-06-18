import React from 'react'
import {Wrapper} from '../../ui/wrapper'
import {ClinicsMap} from '../clinics/clinics-map'
import {ClinicCardDoctor} from '../doctors/clinic-card-doctor'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {media} from '../../helpers/media'
import {MediumText} from '../../ui/medium-text'

const ClinicsWrapper = styled.div`
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  
  ${media.mobile`
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  `}
`

const ListContainer = styled(Container)`
  ${media.mobile`
    padding: 0;
  `}
`

const ClinicsCards = ({clinics, specializations}) => {
  const specilization = specializations.map(item => item.title)

  return(
    <ListContainer>
      <ClinicsWrapper>
        {clinics && clinics.map(item => {
          return <Wrapper key={item.id} flow={'column'}>
            {specializations.length > 0 && <MediumText padding={'16px 16px 0'} color={'black50'}>Принимает как {specilization.join(', ').toLowerCase()}</MediumText>}
            <ClinicCardDoctor
              key={item.id}
              withBottomPadding={true}
              withoutLastBorder={true}
              withHover={false}
              withBorder={false}
              withRating={false}
              {...item}
            />
          </Wrapper>
        })}
      </ClinicsWrapper>
    </ListContainer>
  )}

export const ClinicsMapCardsDoctors = ({isMap, clinics, resizeMap, specializations,isClinicMapDoctors, ...rest}) => {

  const CurrentTab = isMap ? ClinicsMap : ClinicsCards

  const coords = clinics && clinics.length > 0 && clinics[0].latitude && clinics[0].longitude ? [+clinics[0].latitude, +clinics[0].longitude] : null

  return (
    <Wrapper {...rest} height={'100%'} flow={'column'} gap={'8px'}>
      <CurrentTab
        clinics={clinics}
        specializations={specializations}
        height={resizeMap ? 'calc(100vh - 144px)' : '540px'}
        mobileheight={resizeMap ? '100vh' : '540px'}
        coords={coords}
        isClinicMapDoctors={isClinicMapDoctors}
      />
    </Wrapper>
  )
}