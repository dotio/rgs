import {ActivationRepository} from './repository'

export const initialState = {
  currentPolicy: {
    number: 'S993638-59215941',
    code: 608901,
    name: 'Доктор Онлайн',
    dateEnd: '2020-05-22 00:00:00',
    photo: '/static/logo_green.svg',
  },
  successInfo: {},
  errorText: ''
}

const activation = {
  state: initialState,
  reducers: {
    addCurrentPolicy(state, data) {
      return {
        ...state,
        currentPolicy: data
      }
    },
    addSuccessInfo(state, data) {
      return {
        ...state,
        successInfo: data
      }
    },
    setError(state, value) {
      return {
        ...state,
        errorText: value
      }
    }
  },
  effects: (dispatch) =>({
    async searchPolicy(params) {
      dispatch.loaders.showLoader()
      try {
        const result = await ActivationRepository.searchPolicy(params)
        this.addCurrentPolicy(result)
        return true
      } catch (e) {
        throw e
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async activatePolicy(params) {
      dispatch.loaders.showLoader()
      try {
        return await ActivationRepository.activatePolicy(params)
      } catch (e) {
        throw e
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async getPolicySuccess(id) {
      try {
        const result = await ActivationRepository.getPolicySuccess(id)
        this.addSuccessInfo(result)
        return true
      } catch (e) {
        throw e
      }
    },
    async activatePromocode(params) {
      dispatch.loaders.showLoader()
      try {
        const result = await ActivationRepository.activatePromocode(params)
        this.addSuccessInfo(result)
        return result
      } catch (e) {
        this.setError('Введенный вами промо-код некорретный, или у него окончился срок действия. Проверьте корректность ввода промо-кода или обратитесь в техническую поддержку по номеру 8 800 500-02-61. Мы постараемся решить ваш вопрос как можно скорее.')
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async getPromocodeSuccess(id) {
      try {
        const result = await ActivationRepository.getPromocodeSuccess(id)
        this.addSuccessInfo(result)
        return true
      } catch (e) {
        throw e
      }
    },
  })
}

export default activation