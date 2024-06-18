import {requestApi} from '../../../lib/api'
import {ProductRepository} from '../repository/product'

export const initialState = {
  myServices: [],
  myProducts: [],
  currentProduct: {},
  products: [],
  productSuccess: {},
}

export const profileProducts = {
  state: initialState,
  reducers: {
    setAvailableServices(state, services) {
      return {
        ...state,
        myServices: services
      }
    },
    setCurrentProducts(state, products) {
      return {
        ...state,
        myProducts: products
      }
    },
    setCurrentProduct(state, currentProduct) {
      return {
        ...state,
        currentProduct,
      }
    },
    setProducts(state, products) {
      return {
        ...state,
        products
      }
    },
    setProductSuccess(state, productSuccess) {
      return {
        ...state,
        productSuccess
      }
    }
  },
  effects: (dispatch) => ({
    async getMyProducts() {
      try {
        const result = await requestApi('get', '/profile/current-products')
        this.setCurrentProducts(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getAvailableServices(){
      try {
        const result = await requestApi('get', '/profile/available-services')
        this.setAvailableServices(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getCurrentProduct({productId, boxId}){
      try {
        const result = await requestApi('get', `/product/${productId}`, {boxId})
        this.setCurrentProduct(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getProducts({medcardId, type = 'products'}) {
      try {
        const result = await ProductRepository.getList({medcardId, type})
        this.setProducts(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getProductSuccess(productId) {
      try {
        const result = await ProductRepository.getProductSuccess(productId)
        this.setProductSuccess(result)
        return true
      } catch (e) {
        return false
      }
    },
    async buyService(productId) {
      try {
        await ProductRepository.buyProduct(productId)
        this.getAvailableServices()
        return true
      } catch (e) {
        return false
      }
    },
    async create({productId}, state) {
      dispatch.loaders.showLoader()

      const requestParams = {
        medcardId: state.user.mainMedcardId,
        timezone: state.user.timezone
      }

      try {
        await requestApi('post', `/product/${productId}/operator`, requestParams)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
  })
}