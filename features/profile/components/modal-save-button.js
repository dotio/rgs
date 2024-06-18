import styled, {css} from 'styled-components'
import {Button} from '../../../ui/button'
import {media} from '../../../helpers/media'

export const ModalSaveButton = styled(Button)`
  padding: 8px 15px;
  font-size: 20px;
  line-height: 30px;
  ${p => p.isModal && css`
    position: fixed;
    bottom: 20px;
  `}

  ${p => p.mobileFixed && media.mobile`
    position: fixed;
    bottom: 20px;
  `}
`