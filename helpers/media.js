import {css} from 'styled-components'

export const sizes = {
  mobile: 1089,
  medium: 1411,
}

const sizesMediaMapper = {
  medium: (...args) => css`
      @media (max-width: ${sizes.medium}px) and (min-width: ${sizes.mobile + 1}px) {
         ${css(...args)};
      }
   `,
  mobile: (...args) => css`
      @media (max-width: ${sizes.mobile}px) {
         ${css(...args)};
      }
   `
}

export const media =  Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => sizesMediaMapper[label](args)

  return acc
}, {})