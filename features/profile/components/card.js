import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import React from 'react'
import PropTypes from 'prop-types'
import {Avatar} from '../../../ui/avatar'

const StyledWrapper = styled(Wrapper)`
  cursor: pointer;
`

export const Card = ({src, children, type, onClick, isDoctor, border}) => {
  return (
    <StyledWrapper align={'flex-start'} onClick={onClick ? onClick : () => {}}>
      <Avatar border={border} src={src} type={type} borderRadius={isDoctor ? '50%' : '16px'} fromList/>
      <Wrapper flow={'column'} padding={'0 0 0 12px'} mobilePadding={'0 0 0 16px'}>
        {children}
      </Wrapper>
    </StyledWrapper>
  )
}

Card.propTypes = {
  src: PropTypes.string,
}