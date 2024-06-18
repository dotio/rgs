import {requestApi} from '../../lib/api'
import {addNoSelectedItemsOption} from '../../features/profile/medcard/no-selected-items-option-map'
import {uniqBy, prop} from 'ramda'

const STATUS_NOT_LOADED = 0
const STATUS_LOADING = 1
const STATUS_LOADED = 2
const STATUS_LOADED_FULL = 3

const initialState = {
  status: {
    'order-types': STATUS_NOT_LOADED,
    'doctor-specializations': STATUS_NOT_LOADED,
    'experience': STATUS_NOT_LOADED,
    'qualifications': STATUS_NOT_LOADED,
    'genders': STATUS_NOT_LOADED,
    'clinics': STATUS_NOT_LOADED,
    'cities': STATUS_NOT_LOADED,
    'metroStations': STATUS_NOT_LOADED,
    'relationships': STATUS_NOT_LOADED,
    'injuries': STATUS_NOT_LOADED,
    'surgery': STATUS_NOT_LOADED,
    'diseases': STATUS_NOT_LOADED,
    'drugs': STATUS_NOT_LOADED,
    'prostheses': STATUS_NOT_LOADED,
    'allergies': STATUS_NOT_LOADED,
    'vaccinationPlanned': STATUS_NOT_LOADED,
    'bloodType': STATUS_NOT_LOADED,
    'feedback-types': STATUS_NOT_LOADED,
  },
  'order-types': [],
  'doctor-specializations': [],
  'experience': [],
  'qualifications': [],
  'genders': [],
  'clinics': [],
  'cities': [],
  'metroStations': [],//Хранятся для текущего выбранного города
  'relationships': [],//Хранятся для текущего выбранного города
  'injuries': [],
  'surgery': [],
  'diseases': [],
  'drugs': [],
  'prostheses': [],
  'allergies': [],
  'vaccinationPlanned': [],
  'bloodType': [],
  'feedback-types': [],
  anamnesisDictionarySearch: ''
}

const scrollLimit = 20

export const dictionary = {
  state: initialState,
  reducers: {
    setDictionary(state, dictionary, items) {
      return {
        ...state,
        [dictionary]: addNoSelectedItemsOption(dictionary, items),
      }
    },
    setLoading(state, dictionary, isLoading) {
      return {
        ...state,
        status: {
          ...state.status,
          [dictionary]: isLoading,
        }
      }
    },
    setDictionarySearch(state, value) {
      return {
        ...state,
        anamnesisDictionarySearch: value
      }
    },
    reset() {
      return initialState
    }
  },
  effects: (dispatch) => ({
    async fetchDictionary(payload, state) {
      const {force, dictionary, params} = payload
      if (force || state.dictionary.status[dictionary] === STATUS_NOT_LOADED) {
        this.setLoading(dictionary, STATUS_LOADING)
        try {
          const result = await requestApi('get', `/dictionaries/${dictionary}`, params)
          this.setDictionary(dictionary, result)
          this.setLoading(dictionary, STATUS_LOADED)
          return true
        } catch (e) {
          this.setLoading(dictionary, STATUS_NOT_LOADED)
          return false
        }
      }
    },
    async fetchDoctorsDictionary(payload, state) {
      const {force, dictionary, params} = payload
      if (force || state.dictionary.status[dictionary] === STATUS_NOT_LOADED) {
        this.setLoading(dictionary, STATUS_LOADING)
        try {
          const result = await requestApi('get', `/dictionaries/doctors/${dictionary}`, params)
          this.setDictionary(dictionary, result)
          this.setLoading(dictionary, STATUS_LOADED)
          return true
        } catch (e) {
          this.setLoading(dictionary, STATUS_NOT_LOADED)
          return false
        }
      }
    },
    async fetchAnamnesisDictionary(payload, state) {
      const {force, code, search, limit, offset} = payload

      this.setDictionarySearch(search && search.length > 0 ? search : '')

      if (force || state.dictionary.status[code] === STATUS_NOT_LOADED) {
        dispatch.loaders.showLoader()
        this.setLoading(code, STATUS_LOADING)
        try {
          const result = await requestApi('get', `/dictionaries/anamnesis/${code}`, {search, limit, offset})
          this.setDictionary(code, result)
          this.setLoading(code, STATUS_LOADED)
          return true
        } catch (e) {
          this.setLoading(code, STATUS_NOT_LOADED)
          return false
        } finally {
          dispatch.loaders.hideLoader()
        }
      }
    },
    async fetchAnamnesisScrollDictionary(payload, state) {
      const {force, code, params} = payload

      if (state.dictionary.status[code] === STATUS_LOADED_FULL || state.dictionary.status[code] === STATUS_LOADING) {
        return true
      }

      const currentDict = state.dictionary[code]
      const totalParams = {
        ...params,
        limit: scrollLimit,
        offset: currentDict && currentDict.length - 1,
        search: state.dictionary.anamnesisDictionarySearch,
      }

      dispatch.loaders.showLoader()

      if (force || state.dictionary.status[code] === STATUS_NOT_LOADED) {
        this.setLoading(code, STATUS_LOADING)
        try {
          const result = await requestApi('get', `/dictionaries/anamnesis/${code}`, totalParams)
          this.setDictionary(code, uniqBy(prop('id'),[...currentDict, ...result]))
          this.setLoading(code, result.length === 0 ? STATUS_LOADED_FULL : STATUS_LOADED)
          return true
        } catch (e) {
          this.setLoading(code, STATUS_NOT_LOADED)
          return false
        } finally {
          dispatch.loaders.hideLoader()
        }
      }
    },
    async fetchMetroStations(cityId) {
      try {
        const result = await requestApi('get', `/city/${cityId}/metro`)
        this.setDictionary('metroStations', result)
        this.setLoading('metroStations', STATUS_LOADED)
        return true
      } catch (e) {
        this.setLoading('metroStations', STATUS_NOT_LOADED)
        return false
      }
    },
  })
}