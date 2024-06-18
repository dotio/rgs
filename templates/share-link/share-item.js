import React from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../ui/wrapper'
import {getColor} from '../../ui/helpers/getColor'
import {Text} from '../../ui/text'
import {Img} from '../../ui/img'
import PropTypes from 'prop-types'
import {media} from '../../helpers/media'

const IconWrapper = styled(Wrapper)`
  height: 110px;
  width: 110px;
  border-radius: ${p => p.radius};
  background-color: ${p => getColor('black05', p.theme)};
  &:hover {
    cursor: pointer;
    background-color: ${p => getColor('black10', p.theme)};
  }
  ${media.mobile`
    min-width: 60px;
    width: 60px;
    height: 60px;
  `}
`

const StyledImg = styled(Img)`
  ${media.mobile`
    width: 32px;
    height: 32px;
  `}
`

const ContentWrapper = styled(Wrapper)`
  ${media.mobile`
    &:last-child {
      padding-right: 16px;
    }
  `}
`

export const ShareItem = ({icon, title, link, radius, onClick, notLink}) => {
  return (
    <ContentWrapper flow={'column'} align={'center'} as={!notLink && 'a'} href={link} target={'_blank'} onClick={onClick}>
      <IconWrapper radius={radius} align={'center'} justify={'center'}>
        <StyledImg src={icon} height={'48px'} width={'48px'}/>
      </IconWrapper>
      <Text align={'center'} padding={'16px 0 0'} smPadding={'12px 0 0'} smSize={'10px'} smLineHeight={'16px'}>{title}</Text>
    </ContentWrapper>
  )
}

ShareItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
  radius: PropTypes.string,
  onClick: PropTypes.func,
}

ShareItem.defaultProps = {
  link: '',
  title: '',
  radius: '16px',
}