import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
	getClinicDoctors = params => requestApi('get', `${this.path}`, params)
	getSlots = id => requestApi('get', `${this.path}/${id}/slots`)
	postOrder = (id, data) => requestApi('post', `${this.path}/${id}/order`, data)
	// not in swagger
	getClinic = id => requestApi('get', `${this.path}/${id}/full`)
	addClinicCartOrder = id => requestApi('post', `${this.path}/${id}/add-order`)
	getImage = id => requestApi('get', `${this.path}/${id}/images`)
}

export const DoctorsRepository = new Repository('/doctor')
