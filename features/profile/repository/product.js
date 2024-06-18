import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
	createProductOrder = (id, params) => requestApi('post', `${this.path}/${id}/order`, params)
	getProductSuccess = (productId) => requestApi('get',`/policies/purchase/${productId}`)
	buyProduct = (productId, email) => requestApi('post',`${this.path}/${productId}/order`, {productId, email})
	checkPayment = (id) => requestApi('get', `/policies/purchase/${id}/check`, {})
	buyPayment = (params) => requestApi('post', '/policies/purchase', params)
}
export const ProductRepository = new Repository('/product')