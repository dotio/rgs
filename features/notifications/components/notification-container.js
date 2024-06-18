import React from 'react'
import styled from 'styled-components'
import {ToastContainer, toast} from 'react-toastify'
import {getColor} from '../../../ui/helpers/getColor'
import {Icon} from '../../../ui/icon'
import {media} from '../../../helpers/media'

const StyledIcon = styled(Icon)`
  cursor: pointer;
  align-self: center;
`

export const CloseButton = ({closeToast, type}) => (
  <StyledIcon type={'cross_16'} width={18} height={18} onClick={closeToast} color={type === 'default' ? 'black40' : 'white'}/>
)

export const NotificationContainer = styled(ToastContainer).attrs({
  autoClose: 10000,
  hideProgressBar: true,
  closeButton: <CloseButton />,
  closeOnClick: false,
  position: toast.POSITION.TOP_RIGHT,
})`
   width: 598px;
   padding: 0;
   
   ${media.mobile`
     width: calc(100% - 12px);
   `}
   
   &.Toastify__toast-container--top-right {
     top: 6px;
     right: 6px;
   }
   &.Toastify__toast-container--top-center {
     top: 6px;
   }
   &.Toastify__toast-container--top-left {
     top: 6px;
     left: 6px;
   }
   &.Toastify__toast-container--bottom-left {
     bottom: 6px;
     left: 6px;
   }
   &.Toastify__toast-container--bottom-center {
     bottom: 6px;
   }
   &.Toastify__toast-container--bottom-right {
     bottom: 6px;
     right: 6px;
   }
   
   ${media.mobile`
     &.Toastify__toast-container--bottom-left,
     &.Toastify__toast-container--bottom-center,
     &.Toastify__toast-container--bottom-right {
       bottom: 74px;
     }
     &.Toastify__toast-container {
      left: 6px;
     }
   `}

  .Toastify__toast {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    font-size: 16px;
    line-height: 24px;
    padding: 16px;
    min-height: 56px;
    margin-bottom: 6px;
  }

  .Toastify__toast--error {
    background-color: ${(p) => getColor('dangerousRed', p.theme)}
  }
  .Toastify__toast--warn {
    background-color: ${(p) => getColor('dangerousRed', p.theme)}
  }
  .Toastify__toast--success {
    background-color: ${(p) => getColor('primary', p.theme)}
  }
`