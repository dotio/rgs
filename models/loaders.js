export const LOADER_TYPES = {
  GLOBAL: 'global',
  RIGHT: 'right',
  LEFT: 'left',
  CENTER: 'center',
}

export const initialState = {
  left: false,
  right: false,
  center: false,
  global: false,
}

const loaders = {
  state: initialState,
  reducers: {
    showLoader(state, type) {
      const loaderType = type ? type : 'global'

      return {
        ...state,
        [loaderType]: true,
      }
    },
    hideLoader(state, type) {
      const loaderType = type ? type : 'global'

      return {
        ...state,
        [loaderType]: false,
      }
    },
  }
}

export default loaders