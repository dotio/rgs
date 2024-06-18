import React, {Component}  from 'react'
import styled, {css, keyframes} from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'
import {media} from '../helpers/media'

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`

const LoaderBg = styled.div`
  position: ${p => p.fixed ? 'fixed' :'absolute'};
  top: 0;
  bottom: 0;
  left: 0;
  right: ${p => p.global ? '328px' : '0'};
  padding: 5%;
  z-index: ${p => p.zIndex};
  background: ${p => getColor(p.bgColor, p.theme)};
  ${p => p.center && css`
    border-radius: 20px;
    top: 6px;
    left: 328px;
    right: 328px;
    
    ${media.mobile`
      left: 0;
      right: 0;
    `}
  `}
  ${p => p.right && css`
    border-radius: 20px;
    top: 6px;
    width: 316px;
    right: 0;
    margin-left: auto;
    
    ${media.mobile`
      width: 100%;
    `}
  `}

  ${media.mobile`
    right: 0;
    left: 0;
  `}
  ${media.medium`
    right: 0;
  `}
`

const LoaderDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: ${p => `calc(${p.width}/-2)`};
  width: ${p => p.width};
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`

const LoaderSvg = styled.svg`
  animation: ${rotate} 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  & circle {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    animation: ${dash} 1.5s ease-in-out infinite;
    stroke: ${p => getColor(p.color, p.theme)};
  }
`

export class Loader extends Component {
  get getParams() {
    switch(this.props.size) {
      case 'small':
        return {
          viewBox: '12 12 24 24',
          radius: '10',
          diameter: '24',
          width: '24px',
          strokeWidth: '2px'
        }
      case 'medium':
        return {
          viewBox: '18 18 36 36',
          radius: '16',
          diameter: '36',
          width: '36px',
          strokeWidth: '3px'
        }
      default:
        return {
          viewBox: '25 25 50 50',
          radius: '24',
          diameter: '50',
          width: '100px',
          strokeWidth: '2px'
        }
    }
  }

  render() {
    const {show, zIndex, fixed, bgColor, color, center = false, global = false, right = false} = this.props
    if (show) {
      const bgProps = {
        zIndex,
        fixed,
        bgColor,
        global,
        center,
        right
      }
      const LoaderSvgProps = {
        color,
        className: 'loader'
      }

      const sizeParams = this.getParams

      return (
        <LoaderBg {...bgProps}>
          <LoaderDiv width={sizeParams.width}>
            <LoaderSvg {...LoaderSvgProps}>
              <svg viewBox={sizeParams.viewBox}>
                <circle
                  cx={sizeParams.diameter}
                  cy={sizeParams.diameter}
                  r={sizeParams.radius}
                  fill="none"
                  strokeWidth={sizeParams.strokeWidth}
                  strokeMiterlimit="10"
                />
              </svg>
            </LoaderSvg>
          </LoaderDiv>
        </LoaderBg>
      )
    } else {
      return null
    }
  }
}

Loader.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  small: PropTypes.bool,
  zIndex: PropTypes.number,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  global: PropTypes.bool,
  right: PropTypes.bool,
}

Loader.defaultProps = {
  show: false,
  small: false,
  zIndex: 100000,
  color: 'white',
  bgColor: 'transparent',
}