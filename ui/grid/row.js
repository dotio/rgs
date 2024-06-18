import styled from 'styled-components'
import {media} from '../../helpers/media'

export const Row = styled.div`
  display: flex;
  margin-left: -6px;
  margin-right: -6px;
  flex-wrap: wrap;

  ${media.mobile`
    margin-left: -3px;
    margin-right: -3px;
  `}
`