import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Text} from '../../../../ui/text'
import {Wrapper} from '../../../../ui/wrapper'
import {Avatar} from '../../../../ui/avatar'
import {media} from '../../../../helpers/media'
import {getColor} from '../../../../ui/helpers/getColor'

const StyledNotification = styled(Wrapper)`
  height: 200px;
  border-radius: 20px;
  background-color: ${p => getColor('white', p.theme)};
  width: 171px;
  
  ${media.mobile`
    min-width: 122px;
    width: 122px;
    height: 158px;
    padding: 12px;
  `}
`

export const NotificationCardRateDoctor = ({title, photo, onClick}) => {
  return (
    <StyledNotification
      onClick={onClick}
      justify={'space-between'}
      flow={'column'}
      padding={'16px'}
    >
      <Text width={'auto'}>{title}</Text>
      <Wrapper >
        <Avatar src={photo} size={'39px'}/>
      </Wrapper>
    </StyledNotification>
  )
}

NotificationCardRateDoctor.propTypes = {
  title: PropTypes.string,
  photo: PropTypes.string,
  onClick: PropTypes.func
}
