export const container = {
  map: {},
  created: {},
  get(key) {
    if (!this.created[key]) {
      if (this.map[key]) {
        this.created[key] = this.map[key].creator()
      } else {
        throw `couldn't create ${key}`
      }
    }
    return this.created[key]
  },
  remove(key) {
    if (this.map[key]) {
      if (this.created[key] && this.map[key].beforeRemove) {
        this.map[key].beforeRemove(this.created[key])
      }
      delete this.created[key]
    }
  },
  register(key, creator, beforeRemove = null) {
    this.map[key] = {
      creator,
      beforeRemove
    }
  }
}