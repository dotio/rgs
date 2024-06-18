import styled from 'styled-components'
import React from 'react'
import {Wrapper} from '../wrapper'
import {Text} from '../text'
import PropTypes from 'prop-types'
import {getColor} from '../helpers/getColor'

const StyledWrapper = styled(Wrapper)`
  cursor: ${p => p.checked ? 'default' : 'pointer'};
`

const Radio = styled.div`
  height: 20px;
  width: 20px;
  border: 1px solid ${p => getColor(p.checked ? 'primary' : 'black50', p.theme)};
  background: ${p => getColor('white', p.theme)};
  box-sizing: border-box;
  border-radius: 10px;
  display: inline-block;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 3px;
`

const RadioChecked = styled.div`
  width: 12px;
  height: 12px;
  background: ${p => getColor('primary', p.theme)};
  border-radius: 6px;
`

export const RadioButton = ({text, checked, onClick, children}) => {
  return (
    <StyledWrapper width={'auto'} onClick={onClick} align={'center'}>
      <Radio checked={checked}>
        {checked && <RadioChecked/>}
      </Radio>
      {children ? children : <Text width={'auto'}>{text}</Text>}
    </StyledWrapper>
  )
}

RadioButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
}