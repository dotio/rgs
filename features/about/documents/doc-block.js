import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {Link} from '../../../routes'
import {getTranslator} from '../../../utils/translation'
import {useSelector} from 'react-redux'
import {media} from '../../../helpers/media'

const OuterContainer = styled.div`
  display: -webkit-box;
  display: -moz-box;
  -webkit-box-align: end;
  min-height: 220px;
  background: ${p => getColor(p.bgColor, p.theme)};
  border-radius: 20px;
  padding: ${p => p.padding};
  cursor: pointer;
  ${media.mobile`
    min-height: 169px;
  `}
`

const StyledText = styled(Text)`
  word-wrap: break-word;
  overflow-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  hyphens: auto;
`

export const DocBlock = ({route, title, bgColor}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <Link route={route} passHref>
      <OuterContainer bgColor={bgColor} padding={'16px'}>
        <StyledText size={'20px'} smSize={'16px'} dangerouslySetInnerHTML = {{__html: translator(title, true)}}/>
      </OuterContainer>
    </Link>
  )
}

DocBlock.propTypes = {
  route: PropTypes.string,
  img: PropTypes.string,
  color: PropTypes.string,
}

DocBlock.defaultProps = {
  color: 'black05'
}