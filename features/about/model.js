import {FeedbackRepository} from './repository/feedback'
import {FilesRepository} from '../medcards/repository/file'
import {CallbackRepository} from './repository/callback'

export const initialState = {
  feedback: {
    list: [],
    filters:  {
      feedbackId: '',
    },
  },
}

export const about = {
  state: initialState,
  reducers: {
    setFilters(state, filters) {
      return {
        ...state,
        filters: {
          ...initialState.filters,
          ...filters
        },
      }
    },
    setFiles(state, files) {
      return {
        ...state,
        files,
      }
    },
  },
  effects: (dispatch) => ({
    async addFeedback(feedback) {
      dispatch.loaders.showLoader()
      const {files, ...restFields} = feedback
      let feedbackToSave =  {...restFields}

      if (files && files.length > 0) {
        try {
          const savedFiles = await Promise.all(
            files.map(({file, title}) => FilesRepository.create({file, title, medcardId: restFields.medcardId}))
          )
          feedbackToSave['filesIds'] = savedFiles.map((file) => file.id)
        } catch (e) {
          return false
        }
      }
      try {
        await FeedbackRepository.create(feedbackToSave)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
    async requestCallback(callback) {
      dispatch.loaders.showLoader()
      try {
        await CallbackRepository.create(callback)
        return true
      } catch (e) {
        return false
      } finally {
        dispatch.loaders.hideLoader()
      }
    },
  })
}
