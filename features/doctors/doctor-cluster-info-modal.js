import React, {useMemo, useEffect, useState} from 'react'
import styled from 'styled-components'
import {ModalTemplate} from '../../templates/modal'
import {TitleText} from '../../ui/title-text'
import {Container} from '../../ui/grid/container'
import {Divider} from '../../ui/divider'
import {Wrapper} from '../../ui/wrapper'
import {DoctorCard} from './doctor-card'
import {Img} from '../../ui/img'
import {MediumText} from '../../ui/medium-text'
import {T} from '../../utils/translation'
import {media} from '../../helpers/media'
import {getRandomIntInclusive} from '../../ui/helpers/getRandomIntInclusive'
import {asyncModal} from '../../helpers/hocs/asyncModal'
import {DoctorsRepository} from './repository'
import {ClinicsRepository} from '../clinics/repository'
import {reinitFiltersByKey} from '../../helpers/filters'
import {compose, filter, isEmpty, not} from 'ramda'

const StyledImg = styled(Img)`
  ${media.mobile`
    margin-right: 6px;
  `}
`

const DoctorsWrapper = styled.div`
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  overflow-x: auto;
  
  ${media.mobile`
    width: auto;
    display: flex;
    overflow: hidden;
    overflow-x: auto;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    position: relative;
    padding-right: 30px;
  `}
`

const StickyHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1000;
  margin-bottom: 8px;
  ${media.mobile`
    margin-bottom: 18px;
  `}
`

const DoctorClusterInfoModalComp = ({data, current}) => {
  const {clinic} = data
  const [doctors, setDoctors] = useState(data.doctors)
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [clinic.id])

  const getOtherDoctors = async () => {
    let moreDoctors = []
    for(let i = 1; i <= Math.floor(current.limit/50); i++) {
      let moreDoctorsList = await DoctorsRepository.getClinicDoctors({
        filters: {
          ...filter(compose(not, isEmpty), {...reinitFiltersByKey('DF', current.filters)}),
          clinicsIds: current.clinicId
        }, limit: 50, offset: i*50
      })

      moreDoctors = moreDoctors.concat(moreDoctorsList.items)
    }

    setDoctors(doctors.concat(moreDoctors))
  }

  useEffect(() => {
    getOtherDoctors()
  }, [])

  return (
    <ModalTemplate>
      <StickyHeader>
        <Container>
          <TitleText>{current.limit} <T count={current.limit}>doctor.cluster-modal.doctors.plural</T> </TitleText>
          <Wrapper align={'center'} gap={'6px'} mobileGap={'0'} justify={'flex-start'} padding={'16px 0 0'} flexWrap>
            <StyledImg src={clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`} width={'24px'} height={'24px'} />
            <MediumText width={'auto'}>{clinic.name}</MediumText>
            <MediumText color={'black50'}>{clinic.address}</MediumText>
            {clinic.metro && clinic.metro.map(item => <MediumText key={item.id} color={item.color}>{`м. ${item.name}`}</MediumText>)}
          </Wrapper>
        </Container>
        <Divider margin={'24px 0 0'} smMargin={'20px 0 0'} />
      </StickyHeader>
      <Container>
        <DoctorsWrapper>
          {doctors.map((doctor, i) => (
            <DoctorCard key={i} infoContainerPadding={'0'} forMap {...doctor} clusterMobStyle isCluster={true}/>
          ))}
        </DoctorsWrapper>
      </Container>
    </ModalTemplate>
  )
}

export const DoctorClusterInfoModal = asyncModal(
  DoctorClusterInfoModalComp,
  async ({current}) => {
    const clinic = await ClinicsRepository.getClinic(current.clinicId)
    const doctors = await DoctorsRepository.getClinicDoctors({filters : {...filter(compose(not, isEmpty), {...reinitFiltersByKey('DF', current.filters)}), clinicsIds: current.clinicId}, limit: 50, offset: 0})
    return {
      clinic,
      doctors: doctors.items
    }
  }
)