import {requestApi} from '../../lib/api'
import {CityRepository} from './repository/city'

const initialState = {
  isLoading:            false,
  isSaving:             false,
  id:                   null,
  mainMedcardId:        null,
  phone:                null,
  registered:           null,
  hasNotifications:     false,
  shortNotification:    null,
  subscriptions:        [],
  currency:             '',
  utcOffset:            0,
  timezone:             'Europe/Moscow',
  city: {
    id: 1,
    name: 'Москва и область'
  },
  dutyAvailable: [],
}

export const user = {
  state: initialState,
  reducers: {
    setUser(state, user) {
      return {
        ...state,
        ...user,
        isLoading: false,
      }
    },
    setLoading(state, isLoading) {
      return {
        ...state,
        isLoading
      }
    },
    setMainMedcardId(state, mainMedcardId) {
      return {
        ...state,
        mainMedcardId
      }
    },
    setUtcOffset(state, utcOffset) {
      return {
        ...state,
        utcOffset
      }
    },
    setTimezone(state, timezone) {
      return {
        ...state,
        timezone
      }
    },
    setDutyAvailable(state, data) {
      return {
        ...state,
        dutyAvailable: data.dutyAvailable
      }
    },
    reset() {
      return initialState
    },
  },
  effects: (dispatch) => ({
    async fetchUserData(force = false, state) {
      if (!force && (state.user.isLoading || state.user.mainMedcardId)) {
        return
      }

      this.setLoading(true)
      try {
        const result = await requestApi('get', '/profile')
        this.setUser(result)
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoading(false)
      }
    },
    async getDutyAvailable() {
      this.setLoading(true)

      try {
        const result = await requestApi('get', '/profile/services')
        this.setDutyAvailable(result)
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoading(false)
      }
    },
    async updateCity(id) {
      try {
        await CityRepository.addCity(id)
        this.fetchUserData(true)
        const route = location.href
        route.includes('clinics') && dispatch.clinics.updateFilters({cityIdCF: id})
        route.includes('clinic') && dispatch.clinics.updateFilters({cityIdCF: id})
        route.includes('doctors') && dispatch.doctors.updateFilters({cityIdDF: id})
        route.includes('doctor') && dispatch.doctors.updateFilters({cityIdDF: id})
        return true
      } catch (e) {
        return false
      }
    },
  })
}