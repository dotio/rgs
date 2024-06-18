import styled from 'styled-components'
import {Text} from './text'
import {media} from '../helpers/media'

export const MediumText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  word-break: break-word;

  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`