export const scrollTo = (element, to, duration = 200, prop = 'scrollLeft') => {
  const start = element[prop]
  const change = to - start
  let currentTime = 0
  const increment = 20

  const animateScroll = function(){
    currentTime += increment
    element[prop] =  Math.easeInOutQuad(currentTime, start, change, duration)
    if(currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2
  if (t < 1) return c/2*t*t + b
  t--
  return -c/2 * (t*(t-2) - 1) + b
}