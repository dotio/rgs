import {Router} from '../../routes'
import {requestApi} from '../../lib/api'
import {filter, isEmpty, compose, not} from 'ramda'
import {reinitFiltersByKey} from '../../helpers/filters'
import Qs from 'qs'

const LIMIT = 20

const initialState = {
  list: [],
  mapList: [],
  total: null,
  isLoaded: false, //Все загружено
  isLoading: false,
  specializations: [],//Специальности для быстрых фильтров
  currentDoctor: {},//текущий доктор
  currentDoctorShort: {},// краткая информация о докторе
  filters: {
    searchDF: '', //Текстовый поиск
    specializationIdDF: '', //Специальность
    metroStationsIdsDF: '', //Метро,
    cityIdDF: '', //Город
    onlyRatedDF: '', //Только с рейтингом
    onlyChildDF: '', //детский или не детский
    clinicsIdsDF: '', //Клиники // TODO: надо сделать фильтр по клиникам если другие фильтры выбраны
    servicesTypesIdsDF: '', // типы приема TODO: нужно добавить
    experiencesIdsDF: '', // стаж работы TODO: нужно добавить
    qualificationsIdsDF: '', // Квалификация TODO: нужно добавить
    // gender: [], //Пол
    onlyFavoriteDF: '', //только избранные TODO: нужно добавить
    dateDF: '', //Время приема TODO: нужно добавить
    // paymentType: [], //Платный, ОМС
    // experience: [], //Опыт врача
  },
  sorting: {
    sortBy: null, //Параметр сортировки
    sortDir: null //Порядок сортировки
  },
  forMap: false
}

export const doctors = {
  state: initialState,
  reducers: {
    setFilters(state, filters) {
      return {
        ...state,
        filters: {
          ...initialState.filters,
          ...filters
        },
      }
    },
    setSpecializations(state, specializations) {
      return {
        ...state,
        specializations,
      }
    },
    setDoctors(state, data) {
      return {
        ...state,
        isLoaded: false,
        list: data.items,
        total: data.total,
      }
    },
    setMapDoctors(state, data) {
      return {
        ...state,
        isLoaded: false,
        mapList: data,
      }
    },
    pushDoctors(state, data) {
      return {
        ...state,
        list: [
          ...state.list,
          ...data.items,
        ],
      }
    },
    setLoading(state, isLoading) {
      return {
        ...state,
        isLoading
      }
    },
    setLoaded(state) {
      return {
        ...state,
        isLoaded: true
      }
    },
    setDoctor(state, currentDoctor) {
      return {
        ...state,
        currentDoctor,
      }
    },
    setDoctorShort(state, currentDoctorShort) {
      return {
        ...state,
        currentDoctorShort: currentDoctorShort,
      }
    },
    changeFavoriteStatus(state, status){
      return {
        ...state,
        currentDoctor: {
          ...state.currentDoctor,
          isFavorite: status,
        }
      }
    },
    reset() {
      return initialState
    },
    clearFilters(state) {
      return {
        ...state,
        filters: initialState.filters
      }
    },
    changeSort(state, newSort) {
      return {
        ...state,
        sorting: newSort
      }
    },
    setForMap(state, value) {
      return {
        ...state,
        forMap: value
      }
    },
  },
  effects: (dispatch) => ({
    clearCurrentDoctor() {
      this.setDoctor({})
    },
    updateFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.doctors.filters,
        ...newFilters,
        metroStationsIdsDF: newFilters.cityIdDF === '' ? '' : newFilters.metroStationsIdsDF || state.clinics.filters.metroStationsIdsDF
      })

      const query = Qs.stringify(filters)
      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },

    clearFiltersRequest() {
      this.clearFilters()
      Router.pushRoute(Router.asPath.split('?')[0])
    },
    async fetchDoctors({filters, limit}, state) {
      this.setFilters(filters)
      this.setLoading(true)

      try {
        const parsedParams = {
          filters: filter(compose(not, isEmpty), {...reinitFiltersByKey('DF', filters)}),
          offset: 0,
        }

        if(state.doctors.forMap) {
          dispatch.loaders.showLoader()
          const result = await requestApi('get', '/doctor/map', {...parsedParams})
          this.setMapDoctors(result)
          dispatch.loaders.hideLoader()
        } else {
          const result = await requestApi('get', '/doctor', {...parsedParams, limit: limit || LIMIT})
          this.setDoctors(result)
        }
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoading(false)
      }
    },
    async loadMoreDoctors(rest, state) {
      if (state.doctors.isLoaded) {
        return true
      }

      const parsedFilters = reinitFiltersByKey('DF', state.doctors.filters)
      const limit = rest && rest.limit ? rest.limit : LIMIT
      const params = {
        filters: {...filter(compose(not, isEmpty), parsedFilters)},
        limit: limit,
        offset: state.doctors.list.length,
      }

      try {
        const result = await requestApi('get', '/doctor', params)
        if (result.length === 0) {
          this.setLoaded()
        } else {
          this.pushDoctors(result)
        }
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoading(false)
      }
    },
    updateSort(newSort, state) {
      this.changeSort(newSort)

      const params = filter(compose(not, isEmpty), {
        ...state.doctors.filters,
        ...newSort,
      })

      Router.pushRoute('doctors/list', params)
    },
    async fetchSpecializations(force, state) {
      if (force || state.doctors.specializations.length === 0) {
        try {
          // check url /medcard/specializations
          const result = await requestApi('get', '/medcard/specializations')
          this.setSpecializations(result)
          return true
        } catch (e) {
          return false
        }
      }
    },
    async getDoctor(id) {
      try {
        const result = await requestApi('get', `/doctor/${id}/full`)
        this.setDoctor(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getDoctorShort(id) {
      try {
        const result = await requestApi('get', `/doctor/${id}`)
        this.setDoctorShort(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getDoctorSlots({doctorId, params}) {
      try {
        const result = await requestApi('get', `/doctor/${doctorId}/slots`, params)
        result.length > 0 ?  dispatch.order.setAvailableSlots(result) : dispatch.loaders.hideLoader()
        return result
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
  })
}