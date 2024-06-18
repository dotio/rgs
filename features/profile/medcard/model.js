import {compose, filter, isEmpty, not} from 'ramda'
import Qs from 'qs'
import {requestApi} from '../../../lib/api'
import {MedcardsRepository} from './repository'
import {FilesRepository} from '../../medcards/repository/file'
import {ResearchRepository} from '../repository/research'
import {Router} from '../../../routes'
import {RecommendationRepository} from '../repository/recommendation'
import {MedCardsRepository} from '../../medcards/repository'
import {OrderRepository} from '../../order/repository'

export const initialState = {
  orders: {
    items: [],
    total: 0
  },
  recommendations: {
    items: [],
    total: 0,
    filters:  {
      search: '',
      specializationId: '',
      date: '',
    },
  },
  researches: {
    items: [],
    total: 0,
    filters:  {
      search: '',
      date: '',
    },
  },
  ordersFilters: {
    search: '',
    specializationId: '',
    type: '',
    date: ''
  },
  recommendationsFilters:  {
    search: '',
    specializationId: '',
    date: '',
  },
  researchesFilters:  {
    search: '',
    date: '',
  },
  currentOrder: {},
  currentRecommendation: {},
  currentResearch: {},
  files: {
    items: [],
    total: 0,
    filters:  {
      search: '',
      date: '',
    },
  },
  anamnesis: [],
  status: {
    filledPercent: 0,
    fields: [],
  },
  currentMedcard: {
    id: null,
    name: '',
    surname: '',
    lastName: '',
    relationship: '',
    photo: '',
    gender: '',
    birthDate: '',
    phone: '',
    email: '',
    subscribeNews: false,
    oms: '',
    snils: '',
    passport: {
      isResident: true,
      series: '',
      number: '',
      issuedBy: '',
      issueDate: '',
      unitCode: ''
    },
    otherMedcard: {},
    measurement: {
      height: '',
      weight: '',
      bloodType: '',
      weightIndex: ''
    },
    boxes: [
      {
        title: '',
        number: null,
        expirationDate: ''
      }
    ]
  },
}

export const profileMedcard = {
  state: initialState,
  reducers: {
    setOrders(state, orders) {
      return {
        ...state,
        orders
      }
    },
    setOrdersFilters(state, ordersFilters) {
      return {
        ...state,
        ordersFilters: {
          ...initialState.ordersFilters,
          ...ordersFilters
        },
      }
    },
    addNewOrder(state, order) {
      return {
        ...state,
        orders: {
          ...state.orders,
          items: [order, ...state.orders.items],
          total: state.orders.total + 1
        },
      }
    },
    setCurrentOrder(state, currentOrder) {
      return {
        ...state,
        currentOrder
      }
    },
    removeOrder(state, orderId) {
      return {
        ...state,
        orders: {
          ...state.orders,
          items: [...state.orders.items].filter(({id}) => id !== orderId),
        }
      }
    },

    setRecommendations(state, recommendations) {
      return {
        ...state,
        recommendations,
      }
    },
    setRecommendationsFilters(state, filters) {
      return {
        ...state,
        recommendationsFilters: {
          ...initialState.recommendationsFilters,
          ...filters
        },
      }
    },
    setRecommendation(state, currentRecommendation) {
      return {
        ...state,
        currentRecommendation
      }
    },

    removeRecommendation(state, recommendationId) {
      return {
        ...state,
        recommendations: {
          ...state.recommendations,
          items: [...state.recommendations.items].filter(({id}) => id !== recommendationId),
        }
      }
    },

    setResearches(state, researches) {
      return {
        ...state,
        researches,
      }
    },
    setResearchesFilters(state, filters) {
      return {
        ...state,
        researchesFilters: {
          ...initialState.researchesFilters,
          ...filters
        },
      }
    },
    setResearch(state, currentResearch) {
      return {
        ...state,
        currentResearch
      }
    },

    removeResearch(state, researchId) {
      return {
        ...state,
        researches: {
          ...state.researches,
          items: [...state.researches.items].filter(({id}) => id !== researchId),
        }
      }
    },

    setFiles(state, files) {
      return {
        ...state,
        files: {
          ...state.files,
          ...files,
        }
      }
    },
    setFilesFilters(state, filters) {
      return {
        ...state,
        files: {
          ...state.files,
          filters: {
            ...state.files.filters,
            ...filters
          }
        },
      }
    },
    removeFile(state, fileId) {
      return {
        ...state,
        files: {
          ...state.files,
          items: [...state.files.items].filter(({id}) => id !== fileId),
        }
      }
    },

    setMedcard(state, currentMedcard) {
      return {
        ...state,
        currentMedcard
      }
    },
    setOtherMedcard(state, otherMedcard) {
      return {
        ...state,
        otherMedcard
      }
    },
    setStatus(state, status) {
      return {
        ...state,
        status,
      }
    },
    setAnamnesis(state, anamnesis) {
      return {
        ...state,
        anamnesis
      }
    },
    updateAnamnesis(state, anamnesis) {
      return {
        ...state,
        anamnesis: state.anamnesis.map(item => item.code === anamnesis.code ? anamnesis : item)
      }
    },
    reset() {
      return initialState
    },
  },
  effects: (dispatch) => ({
    // Обращения
    async getOrders({medcardId, filters, limit, offset = 0}, state) {

      const params = filters ? filter(compose(not, isEmpty),{
        ...state.profileMedcard.ordersFilters,
        ...filters,
        type: filters.type ? filters.type.split('/') : ''
      }) : {}

      try {
        const result = await MedcardsRepository.getOrders(medcardId, {...params, limit, offset})
        this.setOrders(result)
        return true
      } catch (e) {
        return false
      } finally {
      }
    },
    updateOrdersFilters(newFilter, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.profileMedcard.ordersFilters,
        ...newFilter
      })

      const query = Qs.stringify(filters)

      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },
    async getOrder(orderId) {
      try {
        const result = await requestApi('get', `/order/${orderId}`)
        this.setCurrentOrder(result)
        return true
      } catch (e) {
        return false
      }
    },
    async addOrder(order) {
      const {researchFiles, addedFilesIds, recommendationFiles, ...restFields} = order
      let orderToSave =  {...restFields}

      if (recommendationFiles && recommendationFiles.length > 0) {
        try {
          const savedRecommendationFiles = await Promise.all(
            recommendationFiles.map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          orderToSave['recommendationFilesIds'] = savedRecommendationFiles.map((file) => file.id)
        } catch (e) {
          return false
        }
      }

      if(addedFilesIds.length > 0) {
        orderToSave['recommendationFilesIds'] = orderToSave['recommendationFilesIds'].concat(addedFilesIds)
      }

      if (researchFiles && researchFiles.length > 0) {
        try {
          const savedResearchFiles = await Promise.all(
            researchFiles.map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          orderToSave['researchFilesIds'] = savedResearchFiles.map((file) => file.id)
        } catch (e) {
          return false
        }
      }

      try {
        const savedOrder = await MedCardsRepository.addMedcardSelfOrder(orderToSave)
        if (recommendationFiles.length > 0) {
          this.getRecommendations({medcardId: restFields.medcardId, limit: 3})
        }
        if (researchFiles && researchFiles.length > 0) {
          this.getResearches({medcardId: restFields.medcardId, limit: 3})
        }
        this.addNewOrder(savedOrder)
      } catch (e) {
        return false
      } finally {
      }
    },
    async updateOrder(order) {
      const {id, ...restFields} = order
      let orderToSave = {...restFields}

      try {
        await OrderRepository.update(id, orderToSave)
      } catch (e) {
        return false
      }
    },
    async deleteOrder(id) {
      try {
        await OrderRepository.remove(id)
        this.removeOrder(id)
        return true
      } catch (e) {
        return false
      }
    },
    // Рекомендации
    async getRecommendations({medcardId, filters, limit, offset = 0}, state) {
      const params = filters ? filter(compose(not, isEmpty),{
        ...state.profileMedcard.recommendationsFilters,
        ...filters,
      }) : {}

      try {
        const result = await requestApi('get', `/medcards/${medcardId}/recommendations`, {...params, limit, offset})
        this.setRecommendations(result)
        return true
      } catch (e) {
        return false
      }
    },
    updateRecommendationsFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.profileMedcard.recommendationsFilters,
        ...newFilters,
      })

      const query = Qs.stringify(filters)

      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },
    async addRecommendation(recommendation, state) {
      const {files, addedFilesIds, ...restFields} = recommendation
      let recommendationToSave =  {...restFields}

      recommendationToSave['filesIds'] = []

      if (files && files.length > 0) {
        try {
          const savedFiles = await Promise.all(
            files.map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          recommendationToSave['filesIds'] = savedFiles.map((file) => file.id)
        } catch (e) {
          return false
        }
      }

      if(addedFilesIds.length > 0) {
        recommendationToSave['filesIds'] = recommendationToSave['filesIds'].concat(addedFilesIds)
      }

      try {
        await RecommendationRepository.create(recommendationToSave)
        await this.getRecommendations({medcardId: restFields.medcardId, limit: 3, offset: 0}, state)
        await this.getFiles({medcardId: restFields.medcardId, limit: 3, offset: 0}, state)
      } catch (e) {
        return false
      } finally {
      }
    },
    async updateRecommendation(recommendation) {
      const {id, files, addedFilesIds, removedFilesIds, ...restFields} = recommendation
      let recommendationToSave = {...restFields}

      if (files && files.length > 0) {
        try {
          const savedFiles = await Promise.all(
            files.filter(({id}) => !id).map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          recommendationToSave['filesIds'] = [...savedFiles.map((file) => file.id), ...files.filter(({id}) => id).map(({id}) => id)]
        } catch (e) {
          return false
        }
      } else {
        recommendationToSave['filesIds'] = []
      }

      if(removedFilesIds.length > 0) {
        try {
          await Promise.all(removedFilesIds.map(id => FilesRepository.remove(id)))
        } catch (e) {
          return false
        }
      }

      if(addedFilesIds.length > 0) {
        recommendationToSave['filesIds'] = recommendationToSave['filesIds'].concat(addedFilesIds)
      }

      try {
        await RecommendationRepository.update(id, recommendationToSave)
      } catch (e) {
        return false
      }
    },
    async getRecommendation(recommendationId) {
      try {
        const result = await RecommendationRepository.get(recommendationId)
        this.setRecommendation(result)
        return true
      } catch (e) {
        return false
      }
    },
    async deleteRecommendation(id) {
      try {
        await RecommendationRepository.remove(id)
        this.removeRecommendation(id)
        return true
      } catch (e) {
        return false
      }
    },
    // Исследования
    async getResearches({medcardId, filters, limit, offset = 0}, state) {
      const params = filters ? filter(compose(not, isEmpty),{
        ...state.profileMedcard.researchesFilters,
        ...filters,
      }) : {}

      try {
        const result = await requestApi('get', `/medcards/${medcardId}/researches`, {...params, limit, offset})
        this.setResearches(result)
        return true
      } catch (e) {
        return false
      }
    },
    updateResearchesFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.profileMedcard.researchesFilters,
        ...newFilters,
      })

      const query = Qs.stringify(filters)

      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },
    async addResearch(research, state) {
      const {files, addedFilesIds, ...restFields} = research
      let researchToSave = {...restFields}

      researchToSave['filesIds'] = []

      if (files && files.length > 0) {
        try {
          const savedFiles = await Promise.all(
            files.map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          researchToSave['filesIds'] = savedFiles.map((file) => file.id)

        } catch (e) {
          return false
        }
      }

      if(addedFilesIds.length > 0) {
        researchToSave['filesIds'] = researchToSave['filesIds'].concat(addedFilesIds)
      }

      try {
        await ResearchRepository.create(researchToSave)
        await this.getResearches({medcardId: researchToSave.medcardId, limit: 3, offset: 0}, state)
        await this.getFiles({medcardId: researchToSave.medcardId, limit: 3, offset: 0}, state)
        return true
      } catch (e) {
        return false
      } finally {
      }
    },
    async getResearch(researchId) {
      try {
        const result = await ResearchRepository.get(researchId)
        this.setResearch(result)
        return true
      } catch (e) {
        return false
      }
    },
    async updateResearch(research) {
      const {id, files, addedFilesIds, removedFilesIds, ...restFields} = research
      let researchToSave = {...restFields}

      if (files && files.length > 0) {
        try {
          const savedFiles = await Promise.all(
            files.filter(({id}) => !id).map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          researchToSave['filesIds'] = [...savedFiles.map((file) => file.id), ...files.filter(({id}) => id).map(({id}) => id)]
        } catch (e) {
          return false
        }
      } else {
        researchToSave['filesIds'] = []
      }

      if(removedFilesIds.length > 0) {
        try {
          await Promise.all(removedFilesIds.map(id => FilesRepository.remove(id)))
          return true
        } catch (e) {
          return false
        }
      }

      if(addedFilesIds.length > 0) {
        researchToSave['filesIds'] = researchToSave['filesIds'].concat(addedFilesIds)
      }

      try {
        await ResearchRepository.update(id, researchToSave)
      } catch (e) {
        return false
      }
    },
    async deleteResearch(id) {
      try {
        await ResearchRepository.remove(id)
        this.removeResearch(id)
        return true
      } catch (e) {
        return false
      }
    },
    // Файлы
    async getFiles({medcardId, filters, limit, offset = 0}, state) {
      const params = filters ? filter(compose(not, isEmpty),{
        ...state.profileMedcard.setFilesFilters,
        ...filters,
      }) : {}

      try {
        const result = await requestApi('get', `/medcards/${medcardId}/files`, {...params, limit, offset})
        this.setFiles(result)
        return true
      } catch (e) {
        return false
      }
    },
    updateFilesFilters(newFilters, state) {
      const filters = filter(compose(not, isEmpty), {
        ...state.profileMedcard.files.filters,
        ...newFilters,
      })

      const query = Qs.stringify(filters)

      Router.pushRoute(Router.asPath.split('?')[0] + `${query ? `?${query}`: ''}`)
    },
    async deleteFile(id) {
      try {
        await FilesRepository.remove(id)
        this.removeFile(id)
        return true
      } catch (e) {
        return false
      }
    },
    // Медкарта
    async getMedcard(medcardId) {
      try {
        const result = await requestApi('get', `/medcards/${medcardId}`)
        this.setMedcard(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getOtherCard(medcardId) {
      try {
        const result = await requestApi('get', `/medcards/${medcardId}`)
        this.setOtherMedcard(result)
        return true
      } catch (e) {
        return false
      }
    },
    async updateMedcard({medcardId, data}) {
      const {file, ...otherFields} = data
      let photoId
      if (file) {
        try {
          const savedFile = await FilesRepository.create({file, title: file.name, typeId: 6, medcardId})
          photoId = savedFile.id
        } catch (e) {

        }
      }
      try {
        const result = await requestApi('put', `/medcards/${medcardId}`, {...otherFields, fileId: photoId})
        this.setMedcard(result)
        await dispatch.medcards.fetchMedcards(true)
        return true
      } catch (e) {
        return false
      }
    },
    // Анамнез
    async fetchAnamnesis(id) {
      try {
        const result = await requestApi('get', `/medcards/${id}/anamnesis`)
        this.setAnamnesis(result)
        return true
      } catch (e) {
        return false
      }
    },
    async getStatus(id) {
      if(!id) {
        return
      }
      try {
        const result = await requestApi('get', `/medcards/${id}/status`)
        this.setStatus(result)
        return true
      } catch (e) {
        return false
      }
    },
    async changeAnamnesis({code, value, medcardId}) {
      let requestData = {
        code
      }

      if(code === 'other') {
        requestData.value = value
      } else {
        requestData.selectedItemsIds = Array.isArray(value) ? value.map((item) => item.id) : [value]
      }

      try {
        const result = await requestApi('put', `/medcards/${medcardId}/anamnesis`, requestData)
        this.updateAnamnesis(result)
        dispatch.profileMedcard.getStatus(medcardId)
        return true
      } catch (e) {
        return false
      }
    },
  }),
}