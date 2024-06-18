import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../templates/modal'
import {TitleText} from '../../ui/title-text'
import {Container} from '../../ui/grid/container'
import {Divider} from '../../ui/divider'
import {media} from '../../helpers/media'
import {asyncModal} from '../../helpers/hocs/asyncModal'
import {ClinicCard} from './clinic-card'
import {ClinicsRepository} from './repository'
import {T} from '../../utils/translation'

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

const ClinicClusterInfoModalComp = ({data}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch.loaders.hideLoader()
  }, [])
  return (
    <ModalTemplate>
      <StickyHeader>
        <Container>
          <TitleText>{data.clinics.length} <T count={data.clinics.length}>clinic.cluster-modal.clinics.plural</T> </TitleText>
        </Container>
        <Divider margin={'24px 0 0'} smMargin={'20px 0 0'} />
      </StickyHeader>
      <Container>
        <DoctorsWrapper>
          {data.clinics.map((clinic, i) => (
            <ClinicCard {...clinic} key={i} infoContainerPadding={'0'} forMap  clusterMobStyle isCluster={true}/>
          ))}
        </DoctorsWrapper>
      </Container>
    </ModalTemplate>
  )
}

export const ClinicClusterInfoModal = asyncModal(
  ClinicClusterInfoModalComp,
  async ({current}) => {
    let clinics = []
    for(let i = 0; i < current.data.length; i++) {
      const clinicInfo = await ClinicsRepository.getClinicSmall(current.data[i].id)
      clinics = clinics.concat(clinicInfo)
    }
    return {
      clinics,
    }
  }
)