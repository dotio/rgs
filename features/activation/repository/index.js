/* istanbul ignore file */
import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  searchPolicy = (params) => requestApi('post', '/policies/activation/search', params)
  activatePolicy = (params) => requestApi('post', '/policies/activation/activate', params)
  getPolicySuccess = (id) => requestApi('get', `/policies/activation/${id}`, {})
  activatePromocode = (params) => requestApi('post', '/promo-code/activate', params)
  getPromocodeSuccess = (id) => requestApi('get', `/promo-code/${id}`, {})
}

export const ActivationRepository = new Repository()