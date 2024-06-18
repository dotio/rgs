import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'
import {Loader} from './loader'

const getInnerColor = (bgColor, opacity = 0.8) => {
  return `rgba(255, 255, 255, ${opacity})`
}

const Outer = styled.div`
  width: 46px;
  height: 28px;
  border-radius: 25px;
  padding: 4px;
  background: #d9d9d9;
  transition: 0.3s;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  ${(p) => p.active && css`
    background: ${getColor('primary', p.theme)};
  `}
`
const Inner = styled.div`
  width: 20px;
  height: 20px;
  background: ${p => getColor('white', p.theme)};
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;
  ${(p) => p.active && css`
    transform: translateX(18px);
  `}
`

export const Switch = ({active, onClick, showLoader, color, forwardRef}) => {
  const [localActive, setLocalActive] = useState(active)

  const changeActive = async () => {
    if(!onClick) {
      return
    }
    setLocalActive(!localActive)
    onClick()
  }

  return(
    <Outer active={localActive} onClick={changeActive} ref={forwardRef}>
      <Inner active={localActive} />
      <Loader bgColor={getInnerColor(color)} color={'primary'} size={'small'} show={showLoader}/>
    </Outer>
  )
}

Switch.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.any,
  showLoader: PropTypes.bool,
}

Switch.defaultProps = {
  showLoader: false
}