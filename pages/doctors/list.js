import React, {useRef, useState, useEffect}  from 'react'
import {useDispatch} from 'react-redux'
import {SpecializationsBlock} from '../../features/doctors/specializations-block'
import {DoctorsListComponent} from '../../features/doctors/doctors-list'
import {createQueryParser} from '../../helpers/query'
import {omit} from 'ramda'
import {LOADER_TYPES} from '../../models/loaders'
import { animateScroll as scroll } from 'react-scroll'
import {Gap} from '../../ui/gap'
import {AddressesRepository} from '../../features/profile/repository/addresses'

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

const DoctorsList = ({coords, isShowSpecialization}) => {
  const dispatch = useDispatch()
  const doctorsBlockRef = useRef(null)
  const [switcherOn, setSwitcher] = useState(isShowSpecialization)

  dispatch.doctors.clearCurrentDoctor()

  const hideSpecializationsBlock = (switcherOn) => {
    setSwitcher(switcherOn)
  }

  useEffect(() => {
    setSwitcher(isShowSpecialization)
  }, [isShowSpecialization])

  return (
    <Gap gap={'18px'} mobileGap={'24px'}>
      {switcherOn && <SpecializationsBlock handleHideBlock={hideSpecializationsBlock} onShowAllClick={() => scroll.scrollTo(doctorsBlockRef.current.offsetTop)} doctorsBlockRef={doctorsBlockRef}/>}
      <DoctorsListComponent
        ref={doctorsBlockRef}
        title={'Врачи'}
        handleMapMode={hideSpecializationsBlock}
        handleHideBlock={hideSpecializationsBlock}
        resizeMap={true}
        coords={coords}
      />
    </Gap>
  )
}

DoctorsList.getInitialProps = async (ctx) => {
  const {reduxStore} = ctx

  reduxStore.dispatch.router.setPageTitle('Врачи')

  const parsedQuery = parseQuery(ctx.query)

  const filters = omit(['sortBy', 'sortDir', 'bbox'], parsedQuery)

  const sorts = {
    sortBy: parsedQuery.sortBy,
    sortDir: parsedQuery.sortDir
  }

  let mapCenter = null

  if(filters.cityIdDF) {
    mapCenter = await AddressesRepository.search({searchText: reduxStore.getState().dictionary.cities.find(city => city.id.toString() === filters.cityIdDF).name})
  }

  await reduxStore.dispatch.doctors.fetchDoctors({filters, sorts, bbox: parsedQuery.bbox})
  if (filters.cityIdDF) {
    await reduxStore.dispatch.dictionary.fetchMetroStations(filters.cityIdDF)
  } else {
    reduxStore.dispatch.dictionary.setDictionary('metroStations', [])
  }

  reduxStore.dispatch.loaders.hideLoader(LOADER_TYPES.CENTER)

  const isShowSpecialization = !parsedQuery.specializationIdDF || parsedQuery.specializationIdDF.length === 0

  return {
    coords: mapCenter && mapCenter.length > 0 && mapCenter[0].point ? [+mapCenter[0].point.latitude, +mapCenter[0].point.longitude] : null,
    isShowSpecialization: isShowSpecialization
  }
}

export default DoctorsList