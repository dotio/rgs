import React, {Component} from 'react'
import {Element} from 'react-scroll'
import {DoctorHeader} from '../../features/doctors/doctor-one/header'
import {AboutDoctorFeature} from '../../features/doctors/doctor-one/about-doctor'
import {DoctorOrderBlock} from '../../features/doctors/doctor-one/order-block'
import {DoctorsListComponent} from '../../features/doctors/doctors-list'
import {createQueryParser} from '../../helpers/query'
import {DoctorClinics} from '../../features/doctors/doctor-clinics'
import {DoctorRatingBlock} from '../../features/doctors/doctor-one/rating-block'
import {Wrapper} from '../../ui/wrapper'
import styled from 'styled-components'
import {AddressesRepository} from '../../features/profile/repository/addresses'
import {withRouter} from 'next/router'

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

class DoctorsOne extends Component {
  static async getInitialProps({reduxStore, query}) {
    const parsedQuery = parseQuery(query)
    const {doctorId, ...restQuery} = parsedQuery

    await reduxStore.dispatch.doctors.getDoctor(doctorId)
    if (restQuery.cityId) {
      await reduxStore.dispatch.dictionary.fetchMetroStations(restQuery.cityId)
    }

    let mapCenter = null

    if(restQuery.cityIdDF) {
      mapCenter = await AddressesRepository.search({searchText: reduxStore.getState().dictionary.cities.find(city => city.id.toString() === restQuery.cityIdDF).name})
    }

    const doctor = reduxStore.getState().doctors.currentDoctor

    await reduxStore.dispatch.router.setPageTitle(doctor.middlename ? `${doctor.surname} ${doctor.name} ${doctor.middlename} – Врачи` : `${doctor.surname} ${doctor.name} – Врачи`)
    await reduxStore.dispatch.doctors.fetchDoctors({filters: restQuery})

    return {
      doctor,
      coords: mapCenter ? [+mapCenter[0].point.latitude, +mapCenter[0].point.longitude] : null,
    }
  }

  render () {
    const {doctor, coords} = this.props

    return (
      <StyledWrapper flow={'column'} gap={'6px'}>
        <DoctorHeader />
        {doctor.orderTypes && doctor.orderTypes.length > 0  &&
          <Element name={'doctor-appointment'}>
            <DoctorOrderBlock />
          </Element>
        }
        <Element name={'doctor-about'}>
          <AboutDoctorFeature />
        </Element>
        <Element name={'doctor-rating'}>
          <DoctorRatingBlock />
        </Element>
        <Element name={'doctor-clinics'}>
          <DoctorClinics
            title={'Клиники'}
            clinics={doctor.clinics}
            specializations={doctor.specializations}
          />
        </Element>
        <Element name={'other-doctors'}>
          <DoctorsListComponent
            title={'Другие врачи'}
            offLoadScroll={false}
            coords={coords}
            othersDoctors={true}
          />
        </Element>
      </StyledWrapper>
    )
  }
}

export default withRouter(DoctorsOne)