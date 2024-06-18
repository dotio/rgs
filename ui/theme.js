import {ThemeProvider} from 'styled-components'
import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

export const color = {
  white:     '#ffffff',
  white20:    'rgba(255, 255, 255, 0.2)',
  white50:    'rgba(255, 255, 255, 0.5)',
  white70:    'rgba(255, 255, 255, 0.7)',
  black:     '#000000',
  black50:   '#808080',
  black40:   '#999999',
  black20:   '#CCCCCC',
  black15:   '#D9D9D9',
  black10:   '#E6E6E6',
  black06:   '#F3F3F3',
  black05:   '#F2F2F2',
  //new
  primary:   '#28C387',
  secondary: '#008CB4',
  starred:   '#D69F4C',
  dangerousRed: '#E74B41',
  lightenGreen: '#D8EABF',
  lightenBlue: '#BFDCF5',
  lightenAquamarin: '#C5EAE0',
  //old
  red:       '#AE1F16',
  gold:      '#B89258',
  blue:      '#106BF2',
  green:     '#28C387',
  positiveGreen: '#5EC52D',
  pearlWhite: '#F4EFE6',
  lightPurple: '#B8B5EF',
  bgChat: '#262626',
  gradPrimary: 'linear-gradient(171.03deg, #40B2C9 13.44%, #55DF94 85.6%)',
  gradRed:   'linear-gradient(147.74deg, #88211C 13.44%, #BC231B 85.6%)',
  gradGreen: 'linear-gradient(189.42deg, #1134DD -5.12%, #103AFF 107.8%)',
  gradBlue:  'linear-gradient(180deg, #5CC857 0%, #1ADB11 100%)',
}

const elementsColors = {
  background:      'black05',
  greyText:        'black50',
  icons:           'black40',
  disabledText:    'black20',
  separator:       'black15',
  stroke:          'black20',
  hovers:          'black15',
  disabledButtons: 'black10',
}

const font = {
  baseFamily: 'Suisse Intl',
  textSizeDefault: '16px',
  textColorDefault: 'black',
}

let defaultTheme = {
  color,
  elementsColors,
  font,
}

export const getTheme = () => {
  return defaultTheme
}

export const transition = 'transition: all 500ms cubic-bezier(0.23, 1, 0.32, 1);'
export const noTextSelection = `
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    -webkit-user-select: none;
    cursor: default;
`

export const ThemeWrapper = (props) => {
  const theme = {
    color: {
      ...defaultTheme.color,
      ...props.color || {},
    },
    elementsColors: {
      ...defaultTheme.elementsColors,
      ...props.elementsColors || {},
    },
    font: {
      ...defaultTheme.font,
      ...props.font || {},
    },
  }
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        {props.children}
      </Fragment>
    </ThemeProvider>
  )
}

ThemeWrapper.propTypes = {
  color: PropTypes.object,
  elementsColors: PropTypes.object,
  gradients: PropTypes.object,
  font: PropTypes.object,
}
ThemeWrapper.defaultProps = {
  additionalFonts: []
}