import {Input} from './form/input'
import React from 'react'
import styled, {css} from 'styled-components'
import {Icon} from './icon'
import PropTypes from 'prop-types'
import {media} from '../helpers/media'

const SearchBox = styled.div`
  display: inline-block;
  position: relative;
  width: ${p => p.width};
  
  ${media.mobile`
    width: 100%;
    flex-shrink: 0;
  `}
`

const IconContainer = styled.div`
  position: absolute;
  margin-top: ${p => p.big ? '-12px' : '-8px'};
  left: ${p => p.big ? '18px' : '12px'};
  top: 50%; 
  
  ${p => media.mobile(p.mobileSmall && css`
    margin-top: -8px;
    left: 12px;
    width: 16px;
    height: 16px;
  `)}
`
const StyledIcon = styled(Icon)`
  ${p => media.mobile(p.mobileSmall && css`
    width: 16px;
    height: 16px;
  `)}
`

const StyledInput = styled(Input)`
  font-size: ${p => p.big ? '28px' : '16px'};
  line-height: ${p => p.big ? '32px' : '24px'};
  padding: ${p => p.big ? '14px 18px 14px 50px' : '6px 12px 6px 34px'};
  
  ${p => media.mobile(p.mobileSmall && css`
    font-size: 16px;
    line-height: 24px;
    padding: 6px 12px 6px 34px;
  `)}
`

export const SearchInput = ({width, big = false, mobileSmall = false, ...inputProps}) => {
  const iconProps = big ? {
    height: 24,
    width: 24,
    viewBox: '0 0 24px 24px',
    type: 'search'
  } : {
    height: 16,
    width: 16,
    type: 'search_16'
  }

  return (
    <SearchBox width={width}>
      <IconContainer big={big} mobileSmall={mobileSmall}>
        <StyledIcon {...iconProps} color={'black40'} mobileSmall={mobileSmall} />
      </IconContainer>
      <StyledInput
        wide={true}
        big={big}
        mobileSmall={mobileSmall}
        borderRadius={'100px'}
        borderSize={'0px'}
        {...inputProps}
      />
    </SearchBox>
  )
}

SearchInput.propTypes = {
  width: PropTypes.string,
}