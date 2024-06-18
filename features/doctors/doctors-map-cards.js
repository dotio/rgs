import React from 'react'
import {Container} from '../../ui/grid/container'
import {Wrapper} from '../../ui/wrapper'
import {DoctorsMap} from './doctors-map'
import {DoctorCard} from './doctor-card'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {useWindowScrollLoadEffect} from '../../helpers/hooks'
import {useDispatch} from 'react-redux'

const DoctorsWrapper = styled.div`
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

const DoctorsCards = ({doctors}) => (
  <ListContainer>
    <DoctorsWrapper>
      {doctors.map((doctor, index) =>
        <DoctorCard key={'doctor-' + doctor.id + index} {...doctor}/>
      )}
    </DoctorsWrapper>
  </ListContainer>
)

export const DoctorsMapCards = ({isMap, doctors, offLoadScroll, resizeMap, coords, getDoctors, ...rest}) => {
  const dispatch = useDispatch()

  const CurrentTab = isMap ? DoctorsMap : DoctorsCards

  const loadMoreDoctors = async (isMap, offLoadScroll) => {
    if (!isMap && !offLoadScroll) {
      await dispatch.doctors.loadMoreDoctors()
    }
  }

  useWindowScrollLoadEffect(!offLoadScroll ? loadMoreDoctors : () => null, [isMap, offLoadScroll], 200)

  return (
    <Wrapper {...rest} height={'100%'} flow={'column'} gap={'8px'}>
      {doctors && <CurrentTab
        doctors={doctors}
        height={resizeMap ? 'calc(100vh - 188px)' : '540px'}
        mobileheight={resizeMap ? '100vh' : '540px'}
        coords={coords}
        getDoctors={getDoctors}
      />}
    </Wrapper>
  )
}
