import styled from 'styled-components'
import {Text} from './text'
import {media} from '../helpers/media'

export const TitleText = styled(Text)`
  font-size: 28px;
  line-height: 32px;

  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
  `}
`