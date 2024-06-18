import styled from 'styled-components'
import PropTypes from 'prop-types'
import {media} from '../../helpers/media'
import React from 'react'
import {Text} from '../../ui/text'

const StyledDiscountWrapper = styled.div`
  padding: 16px;
  background: #fff;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  ${media.mobile`
    margin-bottom: 6px;
  `}
  &:last-child {
    margin-bottom: 0;
  }
`
const StyledDiscountImg = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 16px;
  border-radius:  20px;
  flex-shrink: 0;
  flex-grow: 0;
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`
const StyledTexts = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${media.mobile`
    flex-direction: column;
  `}
`
const StyledMiddle = styled.div`
  align-self: center;
  ${media.mobile`
    align-self: flex-start;
  `}
  max-width: 397px;
`

const StyledRight = styled.div`
  margin-left: auto;
  ${media.mobile`
    margin-top: 4px;
    margin-left: 0;
  `}
`

export const Discount = ({src, title, description, rightTitle, rightSubtitle, rightSubtitleStyles}) => {
  return (
    <StyledDiscountWrapper>
      <StyledDiscountImg src={src} />
      <StyledTexts>
        <StyledMiddle>
          <Text>{title}</Text>
          <Text color={'black50'}>{description}</Text>
        </StyledMiddle>
        <StyledRight>
          <Text align={'right'} smAlign={'left'} size={'28px'} lineHeight={'32px'} color={'primary'}>{rightTitle}</Text>
          <Text
            align={'right'}
            smAlign={'left'}
            color={rightSubtitleStyles.color}
            decoration={rightSubtitleStyles.decoration}
          >
            {rightSubtitle}
          </Text>
        </StyledRight>
      </StyledTexts>
    </StyledDiscountWrapper>
  )
}

Discount.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  rightTitle: PropTypes.string,
  rightSubtitle: PropTypes.string,
  rightSubtitleStyles: PropTypes.shape({
    color: PropTypes.string,
    decoration: PropTypes.string,
  }),
}