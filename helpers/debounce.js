import { useEffect, useRef } from 'react'
/**
 * Дебаунс функция для промисов
 * @param func
 * @returns {Function}
 */
/* jshint ignore:start*/
export const debouncePromise = (func) => {
  let promise = null
  return function () {
    if (promise === null) {
      promise = new Promise(async (resolve) => {
        let result = null
        try {
          result = await func.apply(null, arguments)
        } catch(e){}
        promise = null
        resolve(result)
      })
    }
    return promise
  }
}

export const debounce = (f, ms)=> {
  let timer = null

  return function (...args) {
    return new Promise((resolve) => {
      const onComplete = () => {
        timer = null
        resolve(f.apply(this, args))
      }

      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(onComplete, ms)
    })
  }
}
/* jshint ignore:end */


export const useDebouncedEffect = (callback, delay, deps = []) => {
  const firstUpdate = useRef(true)
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      return
    }
    const handler = setTimeout(() => {
      callback()
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, ...deps],)
}
