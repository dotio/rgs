import {requestApi} from '../../lib/api'
import {compose, filter, isEmpty, not} from 'ramda'
import {Router} from '../../routes'
import {reinitFiltersByKey} from '../../helpers/filters'
import Qs from 'qs'
import {CartRepository} from './repository/cart'
import {ClinicsRepository} from './repository'

const LIMIT = 20

const initialState = {
  list: [],
  mapList: [],
  isLoaded: false, //Все загружено
  isLoading: false,
  currentClinic: {},
  clinicDiagnostics: [],
  filters: {
    searchCF: '', //Текстовый поиск
    cityIdCF: '', //Специальность
    metroStationsIdsCF: '', //Метро,
    serviceIdCF: '', // Тип приема
    onlyRatedCF: '', //Только с рейтингом
    specializationIdCF: '',
    onlyFavoriteCF: '',
    clinicsIdsCF: '',
  },
  sorting: {
    sortBy: null, //Параметр сортировки
    sortDir: null //Порядок сортировки
  },
  cart: null,
  cartSum: 0,
  forMap: false
}

export const clinics = {
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
    setClinics(state, list) {
      return {
        ...state,
        list,
      }
    },
    pushClinics(state, list) {
      return {
        ...state,
        list: [
          ...state.list,
          ...list,
        ],
      }
    },
    setLoading(state, isLoading) {
      return {
        ...state,
        isLoading,
      }
    },
    setClinic(state, currentClinic) {
      return {
        ...state,
        currentClinic: {
          images: state.currentClinic.images,
          ...currentClinic
        },
      }
    },
    setCurrentClinicsImages(state, images) {
      return {
        ...state,
        currentClinic: {
          ...state.currentClinic,
          images
        }
      }
    },
    setClinicDiagnostics(state, clinicDiagnostics){
      return {
        ...state,
        clinicDiagnostics,
      }
    },
    changeFavoriteStatus(state, status){
      return {
        ...state,
        currentClinic: {
          ...state.currentClinic,
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
    setCart(state, cart) {
      return {
        ...state,
        cart,
      }
    },
    setCartSum(state, cartSum) {
      return {
        ...state,
        cartSum,
      }
    },
    resetCart(state) {
      return {
        ...state,
        cart: null,
      }
    },
    setMapClinics(state, data) {
      return {
        ...state,
        isLoaded: false,
        mapList: data,
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
    updateSort(newSort, state) {
      this.changeSort(newSort)

      const params = filter(compose(not, isEmpty), {
        ...state.doctors.filters,
        ...newSort,
      })

      Router.pushRoute('clinics/list', params)
    },

    updateFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.clinics.filters,
        ...newFilters,
        metroStationsIdsCF: newFilters.cityIdCF === '' ? '' : newFilters.metroStationsIdsCF || state.clinics.filters.metroStationsIdsCF
      })

      const query = Qs.stringify(filters)
      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },

    clearFiltersRequest() {
      this.clearFilters()
      Router.pushRoute('/clinics')
    },

    async fetchClinics({filters, limit}, state) {
      this.setFilters(filters)
      this.setLoading(true)

      try {
        const parsedParams = {
          filters: filter(compose(not, isEmpty), {...reinitFiltersByKey('CF', filters)}),
          offset: 0,
        }

        if(state.clinics.forMap) {
          dispatch.loaders.showLoader()
          const result = await requestApi('get', '/clinic/map', {...parsedParams})
          this.setMapClinics(result)
          dispatch.loaders.hideLoader()
        } else {
          const result = await requestApi('get', '/clinic', {...parsedParams, limit: limit || LIMIT})
          this.setClinics(result)
        }
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoading(false)
      }
    },
    async loadMore(rest, state) {
      if (state.clinics.isLoaded) {
        return true
      }

      try {
        const parsedFilters = reinitFiltersByKey('CF', state.clinics.filters)
        const params = {
          filters: {...filter(compose(not, isEmpty), parsedFilters)},
          limit: LIMIT,
          offset: state.clinics.list.length,
        }

        const result = await requestApi('get', '/clinic', params)
        if (result.length === 0) {
          this.setLoaded()
        } else {
          this.pushClinics(result)
        }
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoading(false)
      }
    },
    async getClinic(id) {
      try {
        const result = await ClinicsRepository.getClinic(id)
        const images = await this.getCurrentClinicImages(id)
        this.setClinic(result)
        this.setCurrentClinicsImages(images)
        return true
      } catch (e) {
        return false
      }
    },
    async getCurrentClinicImages(id) {
      try {
        return await requestApi('get', `/clinic/${id}/images`)
      } catch (e) {

      }
    },
    async getClinicDiagnostics(id) {
      try {
        const result = await ClinicsRepository.getClinicDiagnostics(id)
        this.setClinicDiagnostics(result)
        return true
      } catch (e) {
        return false
      }
    },
    async addClinicOrder({id, medcardId}, state) {
      try {
        await requestApi('post', `/clinic/${id}/researches`, {medcardId, timezone: state.user.timezone})
        return true
      } catch (e) {
        return false
      }
    },
    async fetchCart(force, state) {
      if (!force && state.clinics.cart) {
        return state.clinics.cart
      }

      try {
        const result = await CartRepository.getCart()
        this.setCart(result)

        //TO-DO проверить
        const cartSum = result.reduce((prev, {price, qty}) => prev + price * qty, 0)
        this.setCartSum(cartSum)

        return true
      } catch (e) {
        return false
      }
    },
    async addProductCart(data) {
      try {
        await CartRepository.create(data)
        this.fetchCart(true)
        return true
      } catch (e) {
        return false
      }
    },
    async updateProductCart(data) {
      try {
        await CartRepository.updateCart(data)
        this.fetchCart(true)
        return true
      } catch (e) {
        return false
      }
    },
    async deleteProductCart(id) {
      try {
        await CartRepository.remove(id)
        this.fetchCart(true)
        return true
      } catch (e) {
        return false
      }
    },
  }),
}
