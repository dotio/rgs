class TitleBlinker {
  titles = []
  activeTitleIndex = 0
  blinkTimeout = null
  onWindowFocus = () => {
    if (this.blinkTimeout) {
      clearTimeout(this.blinkTimeout)
      this.blinkTimeout = null
    }
    window.removeEventListener('focus', this.onWindowFocus)
    document.title = this.titles[0]
    this.activeTitleIndex = 0
    this.titles = []
  }

  add = (title) => {
    if (!document.hasFocus()) {
      if (this.titles.length === 0) {
        this.titles.push(document.title)
        this.titles.push(title)
        window.addEventListener('focus', this.onWindowFocus)
        this.blink()
      } else {
        this.titles.push(title)
      }
    }
  }

  blink = () => {
    this.activeTitleIndex++
    if (this.activeTitleIndex === this.titles.length) {
      this.activeTitleIndex = 0
    }
    document.title = this.titles[this.activeTitleIndex]
    this.blinkTimeout = setTimeout(this.blink, 1000)
  }
}

let instance = null

export const getTitleBlinker = () => {
  if (!instance) {
    instance = new TitleBlinker()
  }
  return instance
}