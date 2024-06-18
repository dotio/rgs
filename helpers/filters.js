export const reinitFiltersByKey = (key, filters) => {
  return filters ? Object.keys(filters).reduce((total, current) => {
    const value = ['metroStationsIdsCF', 'metroStationsIdsDF', 'serviceIdCF', 'servicesTypesIdsDF'].includes(current) ? filters[current].split('/') : filters[current]
    return current.includes(key)
      ? {...total, [current.split(key)[0]]: value }
      : {...total, [current] : value}
  }, {}) : {}
}