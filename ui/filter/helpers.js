export const getPlaceholder = (value, options, title) => {
  if (value.length > 0) {
    const selected = options.reduce((result, option) => {
      if (value.split('/').filter(item => item === option.value).length > 0) {
        return [
          ...result,
          option.title
        ]
      }
      return result
    }, [])
    if (selected.length === 1) {
      return selected[0]
    } else if (selected.length > 1) {
      return `${title} ⋅ ${selected.length}`
    }
  }
  return title
}