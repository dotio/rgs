import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {Circle} from './circle'
import {Text} from './text'
import {Wrapper} from './wrapper'
import {Checkbox} from './form/checkbox'

const StyledWrapper = styled(Wrapper)`
  cursor: pointer;
  padding-top: 16px;
  &:first-child{
    padding-top: 0;
  }
  &:last-child{
    margin-bottom: 52px;
  }
`

export const Metro = ({title, color, isSelected, onClick}) => {
  return (
    <StyledWrapper onClick={onClick}>
      <Checkbox checked={isSelected} renderItem={() => {
        return <Wrapper align={'center'} padding={'0 0 0 10px'} gap={'6px'}>
          <Circle size={12} hexColor={color}/>
          <Text>{title}</Text>
        </Wrapper>
      }}/>
    </StyledWrapper>
  )
}

Metro.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

Metro.defaultProps = {
  onClick: () => {}
}