import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Text} from '../../../../ui/text'
import {getColor} from '../../../../ui/helpers/getColor'
import {media} from '../../../../helpers/media'
import {Wrapper} from '../../../../ui/wrapper'

const StyledNotification = styled(Wrapper)`
  height: 200px;
  border-radius: 20px;
  width: 171px;
  background: ${(p) => p.outdated ? getColor('black06', p.theme) : 'linear-gradient(143.56deg, #40B2C9 13.44%, #55DF94 85.6%)'};
  ${p => p.outdated && `
    border: 1px solid ${getColor('black20', p.theme)};
  `}
 
  ${media.mobile`
    min-width: 122px;
    width: 122px;
    height: 158px;
    padding: 12px;
  `}
`

const NotificationText = styled(Text)`
  color: ${p => p.outdated ? getColor('black50', p.theme) : '#fff'};
`

export const NotificationCardBill = ({title, expirationDate, outdated, onClick}) => {
  return (
    <StyledNotification
      outdated={outdated}
      onClick={onClick}
      justify={'space-between'}
      flow={'column'}
      padding={'16px'}
    >
      <NotificationText width={'auto'}  outdated={outdated}>{title}</NotificationText>
      <NotificationText
        outdated={outdated}
        width={'auto'}
        size={'14px'}
        lineHeight={'21px'}
        ellipsis
      >
        {expirationDate}
      </NotificationText>
    </StyledNotification>
  )
}

NotificationCardBill.propTypes = {
  title: PropTypes.string,
  expirationDate: PropTypes.string,
  outdated: PropTypes.bool,
  onClick: PropTypes.func
}
