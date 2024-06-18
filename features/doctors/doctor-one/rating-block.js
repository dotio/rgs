import React from 'react'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'
import {PageRatingBlock} from '../../../templates/rating/page-rating-block'

export const DoctorRatingBlock = () => {
  const {additionalRating, rating} = useSelector(state => state.doctors.currentDoctor)
  const translator = useSelector(state => getTranslator(state.localization))

  return <PageRatingBlock
    additionalRating={additionalRating}
    rating={rating}
    ratingInfo={translator('doctor.ratings.info', true)}
    ratingTitle={translator('doctor.ratings.title', true)}
  />
}