import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {getIconSvgByType} from './helpers/type-of-icons'
import {getColor} from './helpers/getColor'

const IconSvg = styled.svg`
  vertical-align: middle;
  ${(p) => p.shrink && css`
    flex-shrink: ${p.shrink};
  `}
  ${(p) => p.cursor && css`
    cursor: ${p.cursor};
  `}
  fill: ${(p) => getColor(p.color, p.theme)};
  &:hover{
  ${(p) => p.hoverColor && css`
    fill: ${getColor(p.hoverColor, p.theme)};
  `}
  }
`

export const Icon = ({type, ...restProps}) => {
  let iconData = getIconSvgByType(type, restProps.color)
  if (!iconData) {
    console.warn('icon not found', restProps)
    return null
  }
  let viewBox = '0 0 24 24'
  if (iconData.hasOwnProperty('viewBox')) {
    viewBox = iconData.viewBox
    iconData = iconData.path
  }

  return (
    <IconSvg {...restProps} viewBox={viewBox}>
      {iconData}
    </IconSvg>
  )
}

Icon.propTypes = {
  click: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.any,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  shrink: PropTypes.string,
  cursor: PropTypes.string
}

Icon.defaultProps = {
  type: 'circle_dash',
  width: 24,
  height: 24,
  color: 'white'
}