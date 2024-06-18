import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Icon} from './icon'
import {Wrapper} from './wrapper'
import {MediumText} from './medium-text'
import {media} from '../helpers/media'

const TextWrapper = styled(Wrapper)`
  ${p => p.editable && `
    cursor: pointer;
  `}
`

const IconWrapper = styled.div`
  display: inline;
  vertical-align: top;
  padding-left: 4px;
  width: auto;
  ${media.mobile`
    padding-left: 6px;
  `}
  ${media.mobile`
    display: inline;
    vertical-align: top;
  `}
`

export const EditableField = ({value, emptyText, editableWhenFilled, onClick}) => {
  const isEditable = (editableWhenFilled || !value) && onClick
  return (

    <TextWrapper editable={isEditable} onClick={isEditable ? onClick : null} align={'center'}>
      <MediumText width={'auto'} color={value ? 'black' : 'primary'}>{value || emptyText}
        {isEditable && <IconWrapper>
          <Icon type={'pencil'} color={value ? 'black50' : 'primary'} width={24} height={24} shrink={'0'}/>
        </IconWrapper>}
      </MediumText>
    </TextWrapper>

  )
}

EditableField.propTypes = {
  text: PropTypes.string,
  editableWhenFilled: PropTypes.bool,
  onClick: PropTypes.func,
}

EditableField.defaultProps = {
  editableWhenFilled: false,
  onClick: null,
}
