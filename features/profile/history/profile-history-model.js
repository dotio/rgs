import {requestApi} from '../../../lib/api'
import {compose, filter, isEmpty, not} from 'ramda'
import {Router} from '../../../routes'

export const initialState = {
  list: [],
  filters: {
    search: '',
    serviceType: [],
    specializationId: null,
    date: null,
  }
}

export const profileHistory = {
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
    setList(state, list) {
      return {
        ...state,
        list: [...list]
      }
    },
    reset() {
      return initialState
    }
  },
  effects: () => ({
    updateFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.profileHistory.filters,
        ...newFilters,
      })

      Router.pushRoute('profile/history/list', filters)
    },
    async getHistory(filters) {
      this.setFilters(filters)
      try {
        const list = await requestApi('get', '/profile/history', filters)

        this.setList(list)
      } catch (e) {

      }
    },
  })
}