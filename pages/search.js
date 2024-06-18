import React from 'react'
import {SearchBlock} from '../features/search/search-block'

const Search = ({search}) => {
  return (
    <SearchBlock initSearch={search}/>
  )
}

Search.getInitialProps = async (ctx) => {
  const search = ctx.query.query
  ctx.reduxStore.dispatch.router.setPageTitle('Поиск')

  if(search && search.length > 1) {
    await ctx.reduxStore.dispatch.filtersSearch.fetchSearchClinics({
      filters: {search},
      limit: 5,
      offset: 0
    })
    await ctx.reduxStore.dispatch.filtersSearch.fetchSearchDoctors({
      filters: {search},
      limit: 5,
      offset: 0
    })
  } else {
    ctx.reduxStore.dispatch.filtersSearch.reset()
  }

  return {
    search: search
  }
}

export default Search