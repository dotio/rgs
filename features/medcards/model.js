import {requestApi} from '../../lib/api'
import {LOADER_TYPES} from '../../models/loaders'
import {RelationshipRepository} from './repository/retationship'
import {MedCardsRepository} from './repository'
import {omit} from 'ramda'

const initialState = {
  isLoading: false,
  list: [],
  wrongCode: false,
  codeParams: {},
  authParams: {},
  wrongCodeMessage: '',
  relativeMedcardSettings: {},
  approved: false,
}

export const medcards = {
  state: initialState,
  reducers: {
    setMedcards(state, list) {
      return {
        ...state,
        list: [...list],
        isLoading: false,
      }
    },
    setLoadingMedcards(state, isLoading) {
      return {
        ...state,
        isLoading
      }
    },
    addCodeParams(state, params) {
      return {
        ...state,
        codeParams: params,
      }
    },
    addAuthParams(state, params) {
      return {
        ...state,
        authParams: params,
      }
    },
    setWrongCode(state, data) {
      return {
        ...state,
        ...data
      }
    },
    setRelativeMedcardSettings(state, relativeMedcardSettings) {
      return {
        ...state,
        relativeMedcardSettings,
      }
    },
    removeRelativeMedcardSettings(state, settingId) {
      return {
        ...state,
        list: [...state.list].filter(({id}) => id !== settingId),
      }
    },
    reset() {
      return initialState
    },
    setApproved(state, approved) {
      return {
        ...state,
        approved
      }
    }
  },
  effects: (dispatch) => ({
    async fetchMedcards(force = false, state) {
      if(!force && state.medcards.list.length > 0) {
        return
      }
      this.setLoadingMedcards(true)
      try {
        const result = await requestApi('get', '/medcards')
        this.setMedcards(result)
        return true
      } catch (e) {
        return false
      } finally {
        this.setLoadingMedcards(false)
      }
    },
    async addMedcard({fields, isMain}) {
      dispatch.loaders.showLoader()
      const {file, phone, userId, isChild, ...restFields} = fields
      let currentParams = {
        ...restFields
      }

      if (file) {
        try {
          const {id} = await requestApi('post', '/file', {file, title: file.name.split('.').shift(), typeId: 6}, true)

          currentParams = {...currentParams, fileId: id}
        } catch (e) {

        }
      }

      try {
        if(isMain || isChild) {
          const result = await requestApi('post', '/medcards', {...currentParams})
          isChild ? await this.fetchMedcards(true) : dispatch.user.setMainMedcardId(result.id)
        } else {
          await requestApi('post', '/relationship', {...omit(['medcard', 'isChild'], currentParams), userId, phone})
          await this.fetchMedcards(true)
        }
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async sendCode(phone) {
      dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)
      try {
        const result = await RelationshipRepository.sendCode(phone)
        this.addCodeParams(result)
        return true
      } catch (e) {
        throw e
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.GLOBAL)
      }
    },
    async confirm(params) {
      dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)
      try {
        const result = await RelationshipRepository.confirm(params)
        this.addAuthParams(result)
        return result
      } catch (e) {

        if (e.response && e.response.data) {
          this.setWrongCode(
            {
              wrongCode: true,
              wrongCodeMessage: e.response.data.message || 'Что-то пошло не так'
            }
          )
        }

        throw e
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.GLOBAL)
      }
    },
    resetWrongCodeError() {
      this.setWrongCode(
        {
          wrongCode: false,
          wrongCodeMessage: ''
        }
      )
      return true
    },
    async addRelationship(fields) {
      dispatch.loaders.showLoader()
      try {
        await requestApi('post', '/relationship', {...fields})
        await this.fetchMedcards(true)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async getRelativeMedcardSettings(id) {
      dispatch.loaders.showLoader()
      try {
        const result = await requestApi('get', `/medcards/${id}/settings`)
        this.setRelativeMedcardSettings(result)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async deleteMedcard(id) {
      try {
        return await MedCardsRepository.remove(id)
      } catch (e) {
        return false
      }
    },
  })
}