import {AboutRating} from '../../../features/about/components/about-rating'

const RatingPage = () => {
  return (
    <AboutRating />
  )
}

RatingPage.getInitialProps = async (ctx) => {
  ctx.reduxStore.dispatch.router.setPageTitle('Рейтинг')
}

export default RatingPage