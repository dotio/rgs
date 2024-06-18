import {assocPath, omit} from 'ramda'
import {LOADER_TYPES} from '../../models/loaders'
import {Router} from '../../routes'
import {ConsultationRepository} from './repository'
import {compose, filter, isEmpty, not} from 'ramda'
import {GTM} from '../../general/gtm'

export const initialState = {
  current: {},
  searchBlock: false,
  searchFilter: {
    search: '',
    date: '',
  },
  settingsBlock: false,
  mobile: false,
  isLoadingConsultation: false
}

export const consultation = {
  state: initialState,
  reducers: {
    set(state, current) {
      return {
        ...state,
        current
      }
    },
    change(state, path, value) {
      return {
        ...state,
        current: assocPath(path.split('.'), value, state.current)
      }
    },
    setSearchBlock(state, value) {
      return {
        ...state,
        searchBlock: value,
      }
    },
    reset() {
      return initialState
    },
    setSearchFilters(state, searchFilter) {
      return {
        ...state,
        searchFilter
      }
    },
    setSettingsBlock(state, value) {
      return {
        ...state,
        settingsBlock: value,
      }
    },
    setMobile(state, value) {
      return {
        ...state,
        mobile: value,
      }
    },
    setLoading(state, value) {
      return {
        ...state,
        isLoadingConsultation: value,
      }
    },
  },
  effects: (dispatch) => ({
    async createOrGoToActive({type = 'video', redirect = false}, state) {
      const consultation = state.consultation
      if (consultation.isSaving || consultation.isLoading) {
        return false
      }

      const currentConsultation = await this.create({connectionType: type})

      if (currentConsultation && redirect) {
        Router.pushRoute(`/consultation/${currentConsultation.id}`)
      }

      return currentConsultation
    },
    async createDutyConsultation(params) {
      const currentConsultation = await ConsultationRepository.createDuty(params)
      this.set(currentConsultation)

      if (currentConsultation) {
        Router.pushRoute(`/consultation/${currentConsultation.id}`)
      }

      return true
    },
    async create(data, state) {
      try {

        const requestParams = {
          ...data,
          timezone: state.user.timezone
        }

        const result = await ConsultationRepository.create(requestParams)
        this.set(result)
        return result
      } catch (e) {

      }
    },
    async getActiveConsultation(force = false, state) {
      if (!force && state.consultation.current.id) {
        return state.consultation.current
      }

      try {
        const result = await ConsultationRepository.getActive()
        this.set(result)
        return result
      } catch (e) {
        throw e
      }
    },
    async getConsultation({id, force = false}, state) {
      const consultation = state.consultation.current
      const mobile = state.consultation.mobile

      //Если в сторе уже лежит этот клиент, то нам не нужно его грузить
      if (Object.keys(consultation).length > 0 && consultation.id === parseInt(id) && !force) {
        return consultation
      }
      if(state.consultation.isLoadingConsultation) {
        return
      }
      this.setLoading(true)
      this.setMobile(mobile)
      dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)

      try {
        const result = await ConsultationRepository.get(id)
        if(consultation.status.code === 'doctor_active' && (result.status.code === 'operator_accept' || result.status.code === 'operator_active')) {
          GTM.pushEvent({
            event: 'transferToOperator'
          })
        }
        this.reset()
        this.set(result)
        this.setLoading(false)
        return result
      } catch (e) {
        throw e
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.GLOBAL)
      }
    },
    async saveConsultation(data, state) {
      const consultation = state.consultation.current
      dispatch.loaders.showLoader(LOADER_TYPES.RIGHT)
      try {
        const result = await ConsultationRepository.update(consultation.id, omit(['id', 'fieldsBlocks'], consultation))
        dispatch.medcard.getMedcardForClient({clientId: result.clientId, medcardId: result.medcardId, force: true}, state)
        await this.set(result)
        return true
      } catch (e) {
        throw e
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.RIGHT)
      }
    },
    async initChats(data, state) {
      const consultation = state.consultation.current

      if (consultation.active) {
        await dispatch.mediachat.initMediaChat({webrtcRoom: consultation.webrtcRoom, connectionType: consultation.type}, state)
        await dispatch.chat.setId(consultation.chatId)

        return true
      }

      return false
    },
    async cancelConsultation(id) {
      try {
        dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)
        await ConsultationRepository.remove(id)
        return true
      } catch (e) {
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.GLOBAL)
      }
    },
    async changeConsultationStatus({id, status}) {
      try {
        dispatch.loaders.showLoader(LOADER_TYPES.RIGHT)
        await ConsultationRepository.changeStatus(id, status)
        await this.saveConsultation()
        return true
      } catch (e) {
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.RIGHT)
      }
    },
    async updateSearchFilter(newFilter, state) {

      const params = filter(compose(not, isEmpty), {
        ...state.consultation.searchFilter,
        ...newFilter
      })

      if (!params.date && !params.search) {
        dispatch.chat.clearSearchMessages()
        await dispatch.chat.getPrevMessages()
      } else {
        await dispatch.chat.getSearchMessages(params)
      }

      this.setSearchFilters(params)

      return params
    },
    resetSearchFilter() {
      this.updateSearchFilter({
        search: '',
        date: '',
      })
    },
    showSettingsBlock(value) {
      this.setSettingsBlock(value)
    },
    showSearchBlock(value) {
      this.setSearchBlock(value)
    },
    toggleMobile(value) {
      this.setMobile(value)
    }
  })
}