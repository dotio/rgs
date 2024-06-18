import {requestApi} from '../../../../lib/api'

export const initialState = {
  order: [],
}

export const profileOrder = {
  state: initialState,
  reducers: {
    setOrder(state, order) {
      return {
        ...state,
        order
      }
    },
    reset() {
      return initialState
    }
  },
  effects: () => ({
    async getOrder(orderId) {
      try {
        const result = await requestApi('get', `/order/${orderId}`)
        this.setOrder(result)
        return true
      } catch (e) {
        return false
      }
    },
  })
}