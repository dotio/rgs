import React from 'react'
import {DoctorCard} from './components/doctor-card'
import {Container} from '../../ui/grid/container'
import {Well} from '../../ui/well'
import PropTypes from 'prop-types'


export const AppointmentBlock = (props) => {
  return (
    <Well>
      <Container>
        <DoctorCard {...props}/>
      </Container>
    </Well>
  )
}

AppointmentBlock.propTypes = {
  date: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rightTitle: PropTypes.string,
  rightSubtitle: PropTypes.string,
  doctor: PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
    middlename: PropTypes.string,
    img: PropTypes.string,
  }),
  specialization: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
}