import React from 'react'
import styled from 'styled-components'
import {FormButton} from '../buttons/form-button'
import {Icon} from '../icon'

const StyledIcon = styled(Icon)`
  margin-left: 6px;
  cursor: pointer;
`

export const DateButton = ({selected, onCrossClick, children, optionsMargin, ...restProps}) => {
  return (
    <FormButton selected={selected} margin={optionsMargin} {...restProps}>
      {children}
      {(selected && onCrossClick) && <StyledIcon
        onClick={(e) => {
          e.stopPropagation()
          onCrossClick(e)
        }}
        width={16}
        height={16}
        type={'cross_16'}
        color={'black40'}
      />}
    </FormButton>
  )
}