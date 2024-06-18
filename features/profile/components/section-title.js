import React from 'react'
import PropTypes from 'prop-types'
import {Router} from '../../../routes'
import {TitleText} from '../../../ui/title-text'
import {Icon} from '../../../ui/icon'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'

const ContentWrapper = styled(Wrapper)`
  width: max-content;
  ${p => p.pointer && `
    cursor: pointer;
  `}
  ${media.mobile`
    width: 100%;
  `}
`
const StyledTitleText = styled(TitleText)`
  flex-shrink: 0;
  ${media.mobile`
    flex-shrink: 1;
  `}
`

export const SectionTitle = ({title, padding, count, link, longTitle}) => {
  return (
    <ContentWrapper gap={'8px'} width={'auto'} align={'center'} padding={padding} pointer={!!link} onClick={() => link ? Router.pushRoute(link) : {}}>
      <StyledTitleText width={'auto'} longTitle={longTitle}>{title}</StyledTitleText>
      <Wrapper gap={'4px'} align={'center'} width={count ? '100%' : 'auto'}>
        {count > 0 && <TitleText width={'auto'} color={'primary'}>{count}</TitleText>}
        {link && <Icon type={'bg_arrow_right'} color={'primary'} width={24} height={24}/>}
      </Wrapper>
    </ContentWrapper>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string,
  itemCount: PropTypes.number,
  withContent: PropTypes.bool,
  padding: PropTypes.string,
  onClick: PropTypes.func,
  longTitle: PropTypes.bool
}

SectionTitle.defaultProps = {
  padding: '0 0 16px',
}