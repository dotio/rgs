import React, {Component} from 'react'
import styled from 'styled-components'
import {Element, scroller} from 'react-scroll'
import {ClinicOneHeader} from '../../features/clinics/clinic-one/clinic-header'
// import {ClinicOrderBlock} from '../../features/clinics/clinic-one/order-block'
import {ClinicOneInfo} from '../../features/clinics/clinic-one/clinic-info'
import {ClinicDiagnostics} from '../../features/clinics/clinic-one/diagnostics'
import {ClinicsGallery} from '../../features/clinics/clinic-one/clinics-gallery'
import {createQueryParser} from '../../helpers/query'
import {withRouter} from 'next/router'
import {ClinicsListFilter} from '../../features/clinics/clinic-list-filters'
import {DoctorsListComponent} from '../../features/doctors/doctors-list'
import {ClinicRatingBlock} from '../../features/clinics/clinic-one/rating-block'
import {Wrapper} from '../../ui/wrapper'
import {AddressesRepository} from '../../features/profile/repository/addresses'
import {VerifyBlock} from '../../features/clinics/clinic-one/verify-block'

const parseQuery = createQueryParser({
  serviceType: 'array',
  experience: 'array',
  qualification: 'array',
  gender: 'array',
  clinics: 'array',
  metro: 'array',
  onlyChild: 'bool',
  onlyRated: 'bool',
  onlyFavorite: 'bool',
})

const StyledWrapper = styled(Wrapper)`
  position: relative;
`

class ClinicsOne extends Component {
  state = {
    showMore: false,
    showMap: false
  }

  setShowMore = () => {
    this.setState({
      showMore: !this.state.showMore
    })
  }
  static async getInitialProps({reduxStore, query}) {
    const parsedQuery = parseQuery(query)
    const {clinicId, ...restQuery} = parsedQuery

    let mapCenter = null

    if(restQuery.cityIdCF) {
      mapCenter = await AddressesRepository.search({searchText: reduxStore.getState().dictionary.cities.find(city => city.id.toString() === restQuery.cityIdCF).name})
    }

    const doctorFilters = {
      ...restQuery,
      clinicsIdsDF: clinicId
    }

    const promises = [
      reduxStore.dispatch.clinics.getClinic(clinicId),
      reduxStore.dispatch.clinics.getClinicDiagnostics(clinicId),
      reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
      reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'cities'}),
      reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
      reduxStore.dispatch.doctors.fetchDoctors({filters: doctorFilters, limit: 50}),
      reduxStore.dispatch.clinics.fetchClinics({filters: restQuery, limit: 10}),
    ]
    if (parsedQuery.cityIdCF) {
      promises.push(reduxStore.dispatch.dictionary.fetchMetroStations(parsedQuery.cityIdCF))
    }
    await Promise.all(promises)

    await reduxStore.dispatch.router.setPageTitle(`${reduxStore.getState().clinics.currentClinic.name} – Клиники`)

    return {
      clinicDiagnostics: reduxStore.getState().clinics.clinicDiagnostics,
      images: reduxStore.getState().clinics.currentClinic.images,
      coords: mapCenter ? [+mapCenter[0].point.latitude, +mapCenter[0].point.longitude] : mapCenter
    }
  }

  render() {
    const {clinicDiagnostics, images, coords} = this.props
    const {showMore} = this.state
    const goToOther = async () => {
      await this.setState({showMap: true})
      scroller.scrollTo('other-clinics', {
        smooth: true
      })

      this.setState({showMap: false})
    }

    return (
      <StyledWrapper flow={'column'} gap={'6px'}>
        <ClinicOneHeader />
        {/*<Element name={'clinic-order'}>*/}
        {/*<ClinicOrderBlock/>*/}
        {/*</Element>*/}
        <Element name={'clinic-about'}>
          <ClinicOneInfo goToOther={goToOther}/>
        </Element>
        <Element name={'clinic-rating'}>
          <ClinicRatingBlock/>
        </Element>
        {(clinicDiagnostics && clinicDiagnostics.length > 0) &&
        <Element name={'clinic-diagnostics'}>
          <ClinicDiagnostics/>
        </Element>}
        <Element name={'clinic-verify'}>
          <VerifyBlock/>
        </Element>
        <Element name={'clinic-doctors'}>
          <DoctorsListComponent
            title={'Врачи клиники'}
            offLoadScroll
            hideMap={true}
            setShowMore={this.setShowMore}
            limit={showMore ? 0 : 8}
          />
        </Element>
        {images && images.length > 0 && <Element name={'clinic-gallery'}>
          <ClinicsGallery images={images}/>
        </Element>}
        <Element name={'other-clinics'}>
          <ClinicsListFilter
            title={'Другие клиники'}
            offLoadScroll={false}
            showMap={this.state.showMap}
            coords={coords}
          />
        </Element>
      </StyledWrapper>
    )
  }
}

export default withRouter(ClinicsOne)
