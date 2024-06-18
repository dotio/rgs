/* jshint ignore:start*/
export const throttle = (fn, ms) => {
  let isThrottled = false,
    savedArgs,
    savedThis

  function wrapper() {
    if (isThrottled) { // (2)
      savedArgs = arguments
      savedThis = this
      return
    }

    fn.apply(this, arguments) // (1)

    isThrottled = true

    setTimeout(function () {
      isThrottled = false// (3)
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, ms)
  }

  return wrapper
}
/* jshint ignore:end */