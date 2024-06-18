import React from 'react'
import {ClinicsListComponent} from '../../features/clinics/list'
import {createQueryParser} from '../../helpers/query'
import {omit} from 'ramda'
import {LOADER_TYPES} from '../../models/loaders'
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

const ClinicsList = ({coords}) => {
  return <ClinicsListComponent resizeMap={true} coords={coords} />
}

ClinicsList.getInitialProps = async ({reduxStore, query}) => {
  const parsedQuery = parseQuery(query)

  const filters = omit(['sortBy', 'sortDir'], parsedQuery)

  const sorts = {
    sortBy: parsedQuery.sortBy,
    sortDir: parsedQuery.sortDir
  }

  let mapCenter = null

  if(filters.cityIdCF) {
    mapCenter = await AddressesRepository.search({searchText: reduxStore.getState().dictionary.cities.find(city => city.id.toString() === filters.cityIdCF).name})
  }

  const promises = [
    reduxStore.dispatch.clinics.fetchClinics({filters, sorts}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'cities'}),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    reduxStore.dispatch.router.setPageTitle('Клиники'),
  ]

  if (parsedQuery.cityIdCF) {
    promises.push(reduxStore.dispatch.dictionary.fetchMetroStations(parsedQuery.cityIdCF))
  } else {
    reduxStore.dispatch.dictionary.setDictionary('metroStations', [])
  }

  await Promise.all(promises)

  reduxStore.dispatch.loaders.hideLoader(LOADER_TYPES.CENTER)

  return {
    coords: mapCenter ? [+mapCenter[0].point.latitude, +mapCenter[0].point.longitude] : null
  }
}


export default ClinicsList