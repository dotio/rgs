import {requestApi} from '../../lib/api'

export class Cities  {
	getCities = () => requestApi('get', '/cities')
	postCity = (id, data) => requestApi('post', `/city/${id}`, data)
	getUserCity = () => requestApi('get', '/city')
}
export const CitiesRepository = new Cities()