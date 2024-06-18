import {AuthRepository} from './repository'
import {checkAuth} from '../../lib/api'
import {removeCookie} from '../../helpers/cookie'
import {LOADER_TYPES} from '../../models/loaders'

export const initialState = {
  loggedIn: false,
  isError: false,
  isLoading: false,
  wrongCode: false,
  codeParams: {},
  authParams: {},
  wrongCodeMessage: '',
  loginType: '',
}

const login = {
  state: initialState,
  reducers: {
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
    requestTokenSuccess(state) {
      return {
        ...state,
        loggedIn: true
      }
    },
    requestTokenFail(state) {
      return {
        ...state,
        // тут что-то делать с ошибкой
      }
    },
    setWrongCode(state, data) {
      return {
        ...state,
        ...data
      }
    },
    requestLogout(state) {
      return {
        ...state,
        loggedIn: false
      }
    },
    changeLoginType(state, value) {
      return {
        ...state,
        loginType: value
      }
    }
  },
  effects: (dispatch) => ({
    async sendCode(login) {
      dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)
      try {
        const result = await AuthRepository.sendCode(login)
        this.addCodeParams(result)
        return true
      } catch (e) {
        throw e
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.GLOBAL)
      }
    },
    async authorize(form) {
      dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)

      try {
        const result = await AuthRepository.authorize(form)
        this.addAuthParams(result)
        if(result.personalAgreementStatus) {
          this.requestTokenSuccess(result)
          await dispatch.medcards.fetchMedcards(true)
          const newConsultation = await dispatch.consultation.getActiveConsultation(true)
          if(newConsultation.chat) {
            await dispatch.chat.endChat()
            dispatch.chat.initChat({chatId : newConsultation.chat.id, force: true})
          }
          this.changeLoginType('login')
        }
        return result
      } catch (e) {
        this.requestTokenFail()

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
    async authorizeWithAgreement(form) {
      dispatch.loaders.showLoader(LOADER_TYPES.GLOBAL)

      try {
        const result = await AuthRepository.authorizeWithAgreement(form)
        this.addAuthParams({})
        this.requestTokenSuccess(result)
        await dispatch.medcards.fetchMedcards(true)
        const newConsultation = await dispatch.consultation.getActiveConsultation(true)
        if(newConsultation.chat) {
          await dispatch.chat.endChat()
          dispatch.chat.initChat({chatId : newConsultation.chat.id, force: true})
        }
        this.changeLoginType('sign_up')
        return true
      } catch (e) {
        this.requestTokenFail()
        throw e
      } finally {
        dispatch.loaders.hideLoader(LOADER_TYPES.GLOBAL)
      }
    },
    async checkLoggedIn() {
      if (checkAuth()) {
        await this.requestTokenSuccess()
      }
      return true
    },
    async logout() {
      await AuthRepository.logout()
      removeCookie('isAuth')
      removeCookie('token')
      removeCookie('refresh_token')
      dispatch.chat.reset()
      dispatch.consultation.reset()
      dispatch.clinics.resetCart()
      this.requestLogout()
      dispatch.user.reset()
      return true
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
  })
}

export default login