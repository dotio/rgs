import styled from 'styled-components'
import {media} from '../../helpers/media'

export const Container = styled.div`
  max-width: 732px;
  width: 100%;
  height: auto;
  padding: 0 6px;
  margin-right: auto;
  margin-left: auto;
  
  ${media.mobile`
    padding: 0 16px;
  `}
`