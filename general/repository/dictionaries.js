import {BaseRepository} from '../../templates/repository/base'
import {requestApi} from '../../lib/api'

export class Repository extends BaseRepository {
	getDoctorSpecializations = params => requestApi('get', `${this.path}/doctor-specializations`, params)
	getOrderTypes = () => requestApi('get', `${this.path}/order-types`)
	getThemeTypes = () => requestApi('get', `${this.path}/theme-types`)
	getFileTypes = () => requestApi('get', `${this.path}/file-types`)
	getAnamnesis = code => requestApi('get', `${this.path}/anamnesis/${code}`)
	postAnamnesis = (code, params) => requestApi('post', `${this.path}/anamnesis/${code}`, params)
	getRates = () => requestApi('get', `${this.path}/rates-consultation`)
}
export const DictionaresRepository = new Repository('/dictionaries')