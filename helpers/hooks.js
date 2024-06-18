import {useEffect, useRef, useState, useCallback} from 'react'
import {subscriptionCreator} from './pubsub'

export const useUpdateEffect = (fn, params) => {
  const didMountRef = useRef(false)
  useEffect(() => {
    if (didMountRef.current) {
      fn()
    } else {
      didMountRef.current = true
    }
  }, params)
}

export const useParentOffsetRef = (recalcEvt = null) => {
  const ref = useRef(null)
  const [offset, setOffset] = useState(null)

  useEffect(() => {
    const calc = () => {
      const left = ref.current.offsetLeft
      const right = ref.current.parentNode.parentNode.offsetWidth - left

      setOffset({
        left,
        right
      })
    }
    const unsub = recalcEvt ? subscriptionCreator({
      [recalcEvt]: calc
    }) : null
    window.addEventListener('resize', calc)
    calc()
    return () => {
      if (unsub) {
        unsub()
      }
      window.removeEventListener('resize', calc)
    }
  }, [ref, recalcEvt])

  return [
    ref,
    offset,
  ]
}

export const useSub = (evt, fn) => {
  useEffect(() => {
    return subscriptionCreator({
      [evt]: fn
    })
  }, [evt, fn])
}

export const useAsyncEffect = (fn, params, initResult) => {
  const [result, setResult] = useState(initResult)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const memoizedFn = useCallback(
    () => {
      return fn(...params)
    },
    [...params],
  )

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const data = await memoizedFn()
        setResult(data)
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [memoizedFn])

  return [loading, result, error]
}


export const useWindowScrollLoadEffect = (fn, params, triggerOffset) => {
  const memoizedFn = useCallback(
    () => {
      return fn(...params)
    },
    [...params],
  )
  useEffect(() => {
    let loading = false
    const onScroll = async () => {
      if (!loading) {
        const scrollBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight)
        if (scrollBottom <= triggerOffset) {
          loading = true
          try {
            await memoizedFn()
          } finally {
            loading = false
          }
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [memoizedFn, triggerOffset])
}