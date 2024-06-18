import React from 'react'
import styled from 'styled-components'
import {ModalTemplate} from '../../templates/modal'
import {asyncModal} from '../../helpers/hocs/asyncModal'

const ListWrapper = styled.div`
  padding: 12px;

  & > div:first-child {
    border-top: 0;
  }
`

const MobileModalDropDownComp = ({data}) => {
  return (
    <ModalTemplate disableIcon mobilePadding={'0'}>
      <ListWrapper>
        {data && data.items}
      </ListWrapper>
    </ModalTemplate>
  )
}

export const MobileModalDropDown = asyncModal(
  MobileModalDropDownComp,
  ({current}) => {
    return current.data
  }
)