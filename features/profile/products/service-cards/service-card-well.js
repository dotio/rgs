import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {getColor} from '../../../../ui/helpers/getColor'
import {media} from '../../../../helpers/media'

export const ServiceCardWell = styled(Well)`
  max-width: 347px;
  min-height: 129px;
  ${p => p.border && `
    border: 1px solid ${getColor(p.border, p.theme)};
  `}
  ${media.mobile`
    width: 100%;
    max-width: 100%;
  `}
`
