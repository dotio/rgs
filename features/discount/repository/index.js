import {requestApi} from '../../../lib/api'
export const MAIN_PAGE = 'main'
export const PROMOTIONS_PAGE = 'promotions'
export const PROFILE_PAGE = 'profile'

export class Repository {
  getDiscounts = (type = PROMOTIONS_PAGE) => requestApi('get', '/product/discounts', {type})
}

export const DiscountRepository = new Repository