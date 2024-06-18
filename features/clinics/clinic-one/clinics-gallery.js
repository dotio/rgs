import React from 'react'
import {Gallery} from '../../../ui/gallery'
import {useSelector} from 'react-redux'
import { Container } from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {getTranslator} from '../../../utils/translation'

export const ClinicsGallery = ({images}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <Well color={'transparent'}>
      <Container>
        <Gallery images={images} title={translator('clinic.gallery.title', true)}/>
      </Container>
    </Well>
  )
}