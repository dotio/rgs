import {requestApi} from '../../../lib/api'

export class Bills  {
	billPay = params => requestApi('post', '/bill/pay', params)
	billPromocode = params => requestApi('post', '/bill/promocode', params)
	getBills = () => requestApi('get', '/bills')
	getBill = id => requestApi('get', `/bills/${id}`)
	buyPay = (id, email, params) => requestApi('post', `/bills/${id}/pay`, {id, email}, params)
}
export const BillsRepository = new Bills()