import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  getClinicDiagnostics = id => requestApi('get', `${this.path}/${id}/researches`)
  addClinicOrder = (id, data) => requestApi('post', `${this.path}/${id}/researches`, data)
  // not in swagger
  getClinic = id => requestApi('get', `${this.path}/${id}/full`)
  getClinicSmall = id => requestApi('get', `${this.path}/${id}`)
  addClinicCartOrder = id => requestApi('post', `${this.path}/${id}/add-order`)
  getImage = id => requestApi('get', `${this.path}/${id}/images`)
}

export const ClinicsRepository = new Repository('/clinic')
