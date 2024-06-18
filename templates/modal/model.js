export const initialState = {
  queue: [],
  current: {},
  waitStart: false,
  isLoading: false,
  hasErrored: false,
  switcherValue: false,
}

const modal = {
  state: initialState,
  reducers: {
    addModal(state, data) {
      return {
        ...state,
        queue: [data, ...state.queue],
      }
    },
    showModal(state) {
      return {
        ...state,
        current: state.queue[0] ? state.queue[0] : {},
      }
    },
    deleteModal(state) {
      return {
        ...state,
        queue: state.queue.slice(1),
        waitStart: false,
        current: state.queue[1] ? state.queue[1] : {},
      }
    },
    deleteAllModals(state) {
      return {
        ...state,
        queue: [],
        waitStart: false,
        current: {}
      }
    },
    addModals(state, modals) {
      return {
        ...state,
        queue: [...modals, ...state.queue]
      }
    },
    deleteModalByType(state, modalType) {
      return {
        ...state,
        queue: state.queue.filter(({type}) => type !== modalType)
      }
    },
    changeSwitcherValue(state, value) {
      return {
        ...state,
        switcherValue: value,
      }
    },
  },
  effects: {
    async addAndShowModal(data, state) {
      if(state.modal.queue.filter(item => item.type === data.type).length > 0) {
        return
      }

      this.addModal(data)
      this.showModal()
      return true
    },
    async addAndShowModals(modals) {
      this.addModals(modals)
      this.showModal()
    },
    async deleteTargetModal(modalType, state) {
      if (state.modal.queue.find(({type}) => type === modalType)) {
        this.deleteModalByType(modalType)
      }
      return true
    }
  }
}

export default modal