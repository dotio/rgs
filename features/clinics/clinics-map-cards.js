import React from 'react'
import {Wrapper} from '../../ui/wrapper'
import { ClinicsMap } from './clinics-map'
import {ClinicCard} from './clinic-card'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {useWindowScrollLoadEffect} from '../../helpers/hooks'
import {useDispatch} from 'react-redux'
import {media} from '../../helpers/media'


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

const ClinicsCards = ({clinics}) => (
  <ListContainer>
    <ClinicsWrapper>
      {clinics.map(item => <ClinicCard {...item} key={item.id} />)}
    </ClinicsWrapper>
  </ListContainer>
)

export const ClinicsMapCards = ({isMap, clinics, offLoadScroll, resizeMap, coords}) => {
  const dispatch = useDispatch()
  const CurrentTab = isMap ? ClinicsMap : ClinicsCards

  const loadMoreClinics = async (isMap, offLoadScroll) => {
    if (!isMap && !offLoadScroll) {
      await dispatch.clinics.loadMore()
    }
  }

  useWindowScrollLoadEffect(!offLoadScroll ? loadMoreClinics : () => null, [isMap, offLoadScroll], 200)

  return (
    <Wrapper height={'100%'} flow={'column'} gap={'8px'}>
      <CurrentTab clinics={clinics} height={resizeMap ? 'calc(100vh - 144px)' : '540px'} coords={coords} mobileheight={resizeMap ? '100vh' : '540px'}/>
    </Wrapper>
  )
}

ClinicsMapCards.defaultProps = {
  loadOnScroll: true,
}
