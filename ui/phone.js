import PropTypes from 'prop-types'
import React, {useState} from 'react'
import styled from 'styled-components'
import {Button} from './button'
import {getColor} from './helpers/getColor'

const StyledRightShadow = styled.span`
  display: block;
  position: absolute; 
  top: 0; 
  bottom: 0; 
  width: 80%;
  right: 0;
  background: linear-gradient(to right, rgba(255,255,255,0), ${p => getColor('black05', p.theme)});
`

export const Phone = ({phone, shortPhone}) => {
  const [uncapped, setUncapped] = useState(false)
  return (
    <Button
      onClick={() => {
        uncapped ? window.open(`tel:${phone}`) : setUncapped(true)
      }}
      color={'black05'}
    >
      {uncapped ? phone : shortPhone}
      {!uncapped && <StyledRightShadow/>}
    </Button>
  )
}

Phone.propTypes = {
  phone: PropTypes.string,
  shortPhone: PropTypes.string,
}