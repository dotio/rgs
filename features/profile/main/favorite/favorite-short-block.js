import React, {useMemo} from 'react'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Well} from '../../../../ui/well'
import {FavoriteShortCard} from './favorite-short-card'
import {SectionTitle} from '../../components/section-title'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'

export const FavoriteShortBlock = ({doctors = [], clinics = []}) => {
  const doctorsSlice = clinics.length >= 2 ? 2 : 4 - clinics.length
  const clinicsSlice = doctors.length >= 2 ? 2 : 4 - doctors.length
  const slicedDoctors = doctors.slice(0, doctorsSlice)
  const slicedClinics = clinics.slice(0, clinicsSlice)
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <Well color={'transparent'} mobilePadding={'20px 0 0'}>
      <Container>
        <SectionTitle
          title={translator('profile.favorite.title', true)}
          link={'/profile/favorite'}
        />
        <Row>
          {slicedDoctors.map(({id, isFavorite, photo, name = '', surname = '', middlename = '', specializations}) => (
            <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '20px'}} key={'doctor-' + id}>
              <FavoriteShortCard
                pointer
                isDoctor
                img={photo ? photo : '/static/avatars/doctor_empty_big.svg'}
                isFavorite={isFavorite}
                title={`${surname} ${name} ${middlename}`}
                description={specializations.map(specialization => specialization.title).join(', ')}
                link={`/doctor/${id}`}
              />
            </Col>
          ))}
          {slicedClinics.map(({id, logo, name, isFavorite, address, metro}) => {
            const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])
            return (
              <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '20px'}} key={'clinic-' + id}>
                <FavoriteShortCard
                  pointer
                  img={logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`}
                  title={name}
                  isFavorite={isFavorite}
                  description={`${address} ${metro && metro.name ? `м. ${metro.name}` : ''}`}
                  link={`/clinic/${id}`}
                />
              </Col>
            )})}
        </Row>
      </Container>
    </Well>
  )
}