import {BaseRepository} from '../../../templates/repository/base'
import {requestApi} from '../../../lib/api'

export class Repository extends BaseRepository{
	getMedcardOrders = medcardId => requestApi('get', `${this.path}/${medcardId}/orders`)
	getMedcardRecommendations = medcardId => requestApi('get', `${this.path}/${medcardId}/recommendations`)
	getMedcardResearches = medcardId => requestApi('get', `${this.path}/${medcardId}/researches`)
	getMedcardFiles = medcardId => requestApi('get', `${this.path}/${medcardId}/files`)
	getMedcardAnamnesis = medcardId => requestApi('get', `${this.path}/${medcardId}/anamnesis`)
	updateMedcardAnamnesis = (params, medcardId) => requestApi('put', `${this.path}/${medcardId}/anamnesis`, params)
	getMedcardStatus = medcardId => requestApi('get', `${this.path}/${medcardId}/status`)
	addMedcardSelfOrder = params => requestApi('post', `${this.path}/order`, params)
	deleteMedcardPhoto = medcardId => requestApi('delete', `${this.path}/${medcardId}/photo`)
	// no swagger
	getMedcardSettings = medcardId => requestApi('get', `${this.path}/${medcardId}/settings`)
	getMedcardSpecialisations = () => requestApi('get', `${this.path}/specializations`) // use in doc
}

export const MedCardsRepository = new Repository('/medcards')