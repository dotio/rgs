import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Text} from '../../ui/text'
import {getColor} from '../../ui/helpers/getColor'
import {Link} from '../../routes'
import {getTranslator} from '../../utils/translation'
import {useSelector} from 'react-redux'
import {Img} from '../../ui/img'
import {Circle} from '../../ui/circle'
import {media} from '../../helpers/media'

const OuterContainer = styled.div`
  height: 220px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  background: ${p => getColor(p.bgColor, p.theme)};
  border-radius: 20px;
  padding: ${p => p.padding};
  cursor: pointer;
  ${media.mobile`
    height: 169px;
  `}
`

const IconWrapper = styled.div`
  background: ${p => getColor(p.color, p.theme)};
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`

const StyledText = styled(Text)`
  ${media.mobile`
    display: flex;
    flex-wrap: wrap;
    width: 70px;
    align-self: flex-start;
  `}
`

const StyledCircle = styled(Circle)`
  width: 92px;
  height: 92px;
  border-radius: 92px;
  ${media.mobile`
    width: 72px;
    height: 72px;
  `}
`

const StyledImg = styled(Img)`
  width: 80px;
  height: 80px;
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`

export const FastSearchBlock = ({route, img, color, title, circle, bgColor}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <Link route={route} passHref>
      <OuterContainer bgColor={bgColor} padding={circle ? '16px 10px 10px 16px' : '16px'}>
        <StyledText size={'20px'} lineHeight={'24px'} dangerouslySetInnerHTML = {{__html: translator(title, true)} }/>
        {circle ? <StyledCircle color={color} ><StyledImg src={img} shrink={'0'}/></StyledCircle>
          :
          <IconWrapper color={color}><StyledImg src={img} shrink={'0'}/></IconWrapper>}
      </OuterContainer>
    </Link>
  )
}

FastSearchBlock.propTypes = {
  route: PropTypes.string,
  img: PropTypes.string,
  icon: PropTypes.shape({
    type: PropTypes.string,
    color: PropTypes.string,
  }),
  color: PropTypes.string,
}

FastSearchBlock.defaultProps = {
  color: 'black05'
}