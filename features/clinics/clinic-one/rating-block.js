import React from 'react'
import {getTranslator} from '../../../utils/translation'
import {useSelector} from 'react-redux'
import {PageRatingBlock} from '../../../templates/rating/page-rating-block'


export const ClinicRatingBlock = () => {
  const {rating, additionalRating} = useSelector((state) => state.clinics.currentClinic)
  const translator = useSelector(state => getTranslator(state.localization))
  return <PageRatingBlock
    additionalRating={additionalRating}
    rating={rating}
    ratingInfo={translator('clinic.rating.subtitle', true)}
    ratingTitle={translator('clinic.rating.title', true)}
  />
}