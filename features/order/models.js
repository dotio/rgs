import {requestApi} from '../../lib/api'

export const initialState = {
  doctor: null,
  type: null,
  medcardId: '',
  clinic: null,
  specialization: null,
  selectedSlotId: null,
  date: null,
  dateFromCalendar: null,
  wantTime: '',
  price: {}
}

export const order = {
  state: initialState,
  reducers: {
    setDoctor(state, orderDoctor) {
      return {
        ...state,
        doctor: orderDoctor
      }
    },
    setOrderType(state, orderType) {
      return {
        ...state,
        type: orderType
      }
    },
    setMedcardId(state, medcardId) {
      return {
        ...state,
        medcardId: medcardId
      }
    },
    setClinic(state, clinic) {
      return {
        ...state,
        clinic: clinic,
      }
    },
    setSpecialization(state, specialization) {
      return {
        ...state,
        specialization: specialization,
      }
    },
    setAvailableSlots(state, slots) {
      return {
        ...state,
        slots: slots,
      }
    },
    setSelectedSlotId(state, slotId) {
      return {
        ...state,
        selectedSlotId: slotId,
      }
    },
    setPrice(state, price) {
      return {
        ...state,
        price,
      }
    },
  },
  effects: (dispatch) => ({
    async getPrice(params) {
      dispatch.loaders.showLoader()
      try {
        const result = await requestApi('get', '/order/payment', params)
        dispatch.order.setPrice(result)
      } catch (e) {
        //.
      } finally {
        dispatch.loaders.hideLoader()
      }
    },

    async create({doctorId, data}, state) {
      dispatch.loaders.showLoader()

      const requestParams = {
        ...data,
        timezone: state.user.timezone
      }

      try {
        await requestApi('post', `/doctor/${doctorId}/order`, requestParams)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
  })
}