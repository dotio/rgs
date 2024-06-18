import styled from 'styled-components'
import {media} from '../../../../helpers/media'

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  ${media.mobile`
    min-height: 103px;
  `}
`