import {requestApi} from '../../../lib/api'
import {BaseRepository} from '../../../templates/repository/base'

export class Repository extends BaseRepository {
	addFavorite = (entity, id) => requestApi('post', `${this.path}/${entity}/${id}`)
	removeFavorite = (entity, id) => requestApi('delete', `${this.path}/${entity}/${id}`)
}

export const FavoriteRepository = new Repository('/favorite')