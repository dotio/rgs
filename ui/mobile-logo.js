import styled from 'styled-components'
import {Logo} from './logo'
import {media} from '../helpers/media'

export const MainLogo = styled(Logo)`
  margin: 16px auto;
  display: none;
  ${media.mobile`
    display: block;
  `}
`