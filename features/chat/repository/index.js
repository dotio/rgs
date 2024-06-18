import {BaseRepository} from '../../../templates/repository/base'
import {requestApi} from '../../../lib/api'

export class Repository extends BaseRepository {
	history = id => requestApi('get', `${this.path}/${id}/history`)
	messages = id => requestApi('get', `${this.path}/${id}/update`)
	sendFile = (id, data) => requestApi('post', `${this.path}/${id}/file`, data)
	search = (id, params) => requestApi('get', `${this.path}/${id}/search`, params)
}

export const ChatRepository = new Repository('/chat')