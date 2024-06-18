import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
  rate = (id, data) => requestApi('post', `${this.path}/${id}/rate`, data)
  extendedRate = (id, data) => requestApi('post', `${this.path}/${id}/send-rate`, data)
  getActive = () => requestApi('get', `${this.path}/active`, {})
  createDuty = (params) => requestApi('post', `${this.path}/doctor`, params)
  // not in swagger
  changeStatus = (id, status) => requestApi('post', `${this.path}/${id}/status`, {status})
  selectMedcard = (consultationId, medcardId) => requestApi('post', `${this.path}/${consultationId}/select-medcard`, {medcardId})
}

export const ConsultationRepository = new Repository('/consultation')