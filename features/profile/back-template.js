import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Wrapper} from '../../ui/wrapper'
import {Container} from '../../ui/grid/container'
import {TitleText} from '../../ui/title-text'
import {CircleButton} from '../../ui/circle-button'
import {Router, Link} from '../../routes'
import {media} from '../../helpers/media'
import {getColor} from '../../ui/helpers/getColor'

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: ${p => p.withoutText ? '0' : '0 0 16px'};
`
const StyledText = styled(TitleText)`
  & > a {
    color: ${p => getColor('green', p.theme)};
  }
  
  ${media.mobile`
    width: 88%;
  `}
`
const StyledCircleButton = styled(CircleButton)`
  z-index: 5;
  ${media.mobile`
    top: -2px;
  `}
`

export const BackTemplate = ({parent, parentLink, title, backUrl, children, withText}) => {
  return (
    <Wrapper flow={'column'} padding={'18px 0 0'}>
      <Header withoutText={!withText}>
        {withText && <Container>
          <StyledText><Link route={parentLink} passHref><a>{parent}</a></Link> / {title}</StyledText>
        </Container>}
        <StyledCircleButton top={'0'} onClick={() => Router.pushRoute(backUrl)} icon={'long_arrow_left'}/>
      </Header>
      {children}
    </Wrapper>
  )
}

BackTemplate.propTypes = {
  parent: PropTypes.string,
  parentLink: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backUrl: PropTypes.string,
  withText: PropTypes.bool,
}

BackTemplate.defaultProps = {
  backUrl: '/profile',
  withText: true,
}