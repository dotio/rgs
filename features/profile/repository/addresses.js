import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
	search = searchText => requestApi('get', `${this.path}/search`, searchText)
	getTypes = () => requestApi('get', `${this.path}/types`)
	check = (id, data) => requestApi('get',`${this.path}/${id}/check`, data)
}
export const AddressesRepository = new Repository('/addresses')