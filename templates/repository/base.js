import {requestApi} from '../../lib/api'

export class BaseRepository {
  constructor(path) {
    this.path = path
  }
  getList = (params) => {
    return requestApi('get', this.path, params)
  }
  create = (data) => {
    return requestApi('post', this.path, data)
  }
  get = (id) => {
    return requestApi('get', `${this.path}/${id}`)
  }
  update = (id, data) => {
    return requestApi('put', `${this.path}/${id}`, data)
  }
  remove = (id) => {
    return requestApi('delete', `${this.path}/${id}`)
  }
}
