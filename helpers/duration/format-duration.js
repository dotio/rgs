const parseMs = (ms) => {
  if (typeof ms !== 'number') {
    throw new TypeError('Expected a number')
  }

  let roundTowardZero = ms > 0 ? Math.floor : Math.ceil

  return {
    days: roundTowardZero(ms / 86400000),
    hours: roundTowardZero(ms / 3600000) % 24,
    minutes: roundTowardZero(ms / 60000) % 60,
    seconds: roundTowardZero(ms / 1000) % 60,
    milliseconds: roundTowardZero(ms) % 1000
  }
}

const addZero = (value, digits) => {
  digits = digits || 2

  let isNegative = Number(value) < 0
  let buffer = value.toString()
  let size = 0

  if (isNegative) {
    buffer = buffer.slice(1)
  }

  size = digits - buffer.length + 1
  buffer = new Array(size).join('0').concat(buffer)

  return (isNegative ? '-' : '') + buffer
}

export const formatDuration = function (ms, options) {
  let leading = options && options.leading
  let unsignedMs = ms < 0 ? -ms : ms
  let sign = ms <= -1000 ? '-' : ''
  let t = parseMs(unsignedMs)
  let seconds = addZero(t.seconds)
  if (t.days) return sign + t.days + ':' + addZero(t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  if (t.hours) return sign + (leading ? addZero(t.hours) : t.hours) + ':' + addZero(t.minutes) + ':' + seconds
  return sign + (leading ? addZero(t.minutes) : t.minutes) + ':' + seconds
}