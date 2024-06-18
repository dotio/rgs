export const loadImage = (src) => {
  const image = new Image()
  return new Promise((resolve) => {
    if (process.browser) {
      image.onload = resolve
      image.src=src
    } else {
      resolve()
    }
  })
}