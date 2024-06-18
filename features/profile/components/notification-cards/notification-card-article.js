import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Text} from '../../../../ui/text'
import {media} from '../../../../helpers/media'
import {Wrapper} from '../../../../ui/wrapper'
import {getColor} from '../../../../ui/helpers/getColor'

const StyledNotification = styled(Wrapper)`
  height: 200px;
  background-color: ${p => getColor('white', p.theme)};
  background-image: url(${p => p.bgImage});
  background-position: 0 100%;
  background-size: 100% auto;
  background-repeat: no-repeat;
  border-radius: 20px;
  width: 171px;
  
  ${media.mobile`
    min-width: 122px;
    width: 122px;
    height: 158px;
    padding: 12px;
  `}
`

export const NotificationCardArticle = ({title, bgImage, onClick}) => {
  return (
    <StyledNotification
      bgImage={bgImage}
      onClick={onClick}
      justify={'space-between'}
      flow={'column'}
      padding={'16px'}
    >
      <Text width={'auto'}>{title}</Text>
    </StyledNotification>
  )
}

NotificationCardArticle.propTypes = {
  title: PropTypes.string,
  bgImage: PropTypes.string,
  onClick: PropTypes.func
}
