export const initialState = {
  isLoading: false,
  currentPath: undefined,
  pageTitle: 'Главная',
  bottomTemplate: true,
  showConsultationModal: false,
}

const router = {
  state: initialState,
  reducers: {
    routeChangeStart(state) {
      return {
        ...state,
        isLoading: true,
      }
    },
    routeChangeEnd(state, currentPath) {
      return {
        ...state,
        isLoading: false,
        currentPath,
      }
    },
    setPageTitle(state, title) {
      return {
        ...state,
        pageTitle: title
      }
    },
    toggleBottomTemplate(state, value) {
      return {
        ...state,
        bottomTemplate : value,
      }
    },
    toggleConsultationModal(state, value) {
      return {
        ...state,
        showConsultationModal: value,
      }
    },
  }
}

export default router