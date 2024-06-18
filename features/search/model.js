import {requestApi} from '../../lib/api'
import {compose, filter, isEmpty, not} from 'ramda'
import {Router} from '../../routes'
import Qs from 'qs'

const initialState = {
  clinics: [],
  doctors: {
    items: [],
  },
  filters: {}
}

export const filtersSearch = {
  state: initialState,
  reducers: {
    setClinics(state, clinics) {
      return {
        ...state,
        clinics,
      }
    },
    setDoctors(state, doctors) {
      return {
        ...state,
        doctors,
      }
    },
    reset() {
      return initialState
    }
  },
  effects: (dispatch) => ({
    async fetchSearchClinics(params) {
      dispatch.loaders.showLoader()
      try {
        const result = await requestApi('get', '/clinic', params)
        this.setClinics(result)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async fetchSearchDoctors(params) {
      dispatch.loaders.showLoader()
      try {
        const result = await requestApi('get', '/doctor', params)
        this.setDoctors(result)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    updateFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.filtersSearch.filters,
        ...newFilters,
      })

      const query = Qs.stringify(filters)
      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },
  }),
}
