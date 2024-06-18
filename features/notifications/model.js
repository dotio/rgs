import {toast} from 'react-toastify'
import {NotificationBody} from './components/notification-body'
import React from 'react'

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const initialState = {
  queue: []
}

export const notifications = {
  state: initialState,
  reducers: {
    setNotify(state, data) {
      return {
        ...state,
        queue: data
      }
    },
    removeNotify(state, id) {
      return {
        ...state,
        queue: state.queue.filter(item => item.uuid !== id)
      }
    }
  },
  effects: {
    addNotify(query, state) {
      const {title, ttl = 3000, type = 'error'} = query
      const currentQuery = {uuid: uuidv4(), type, title, ttl}

      this.setNotify([...state.notifications.queue, currentQuery])
      this.removeNotifyQuery(currentQuery)
    },
    removeNotifyQuery(query) {
      setTimeout(() => {
        this.removeNotify(query.uuid)
      }, query.ttl)
    },
    hideNotify() {
      this.setNotify([])
    },
    showNotification(options = {}) {
      const component = options.component || <NotificationBody type={options.type} text={options.text} />
      return toast(component, {position: options.position ||  toast.POSITION.TOP_RIGHT, ...options})
    },
    hideNotification(id) {
      toast.dismiss(id)
    },
    hideAllNotifications() {
      toast.dismiss()
    },
  }
}