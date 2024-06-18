import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Img} from '../../../ui/img'
import {Divider} from '../../../ui/divider'
import {Link} from '../../../routes'
import {T} from '../../../utils/translation'

const HidingContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  height: 0;
  transition: height 0.5s ease-in;
  ${p => p.open && css`
    height: auto;
  `}
`

const HidingText = styled(Text)`
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.5s ease-in, opacity 0.5s ease-in;
  ${p => p.open && css`
    visibility: visible;
    opacity: 1;
  `}
`

const WrapperBlock = styled(Wrapper)`
  &:hover {
    cursor: pointer;
  }
`

const StyledDivider = styled(Divider)`
  position: absolute;
  left: 0;
  right: 0;
`

const AboutCompanyLink = styled.a`
  color: #911F20;
`

export const CopyrightBlock = () => {
  const [open, toggleOpen] = useState(false)
  const handleClickAccordion = () => {
    toggleOpen(!open)
  }

  return(
    <Wrapper flow={'column'} padding={'0 0 20px'} mobilePadding={'0'}>
      <StyledDivider/>
      <WrapperBlock
        onClick={handleClickAccordion}
        open={open}
        align={'center'}
        justify={'space-between'}
        padding={'20px 0 0'} mobilePadding={'21px 0 0'}
      >
        <Img
          src={open ? '/static/rgs_logo_red.svg' : '/static/rgs_logo.svg'}
          width={'118px'}
          height={'12px'}
          shrink={'0'}
        />
        <Text width={'auto'} color={'black50'} onClick={handleClickAccordion} open={open}>&copy; 2020</Text>
      </WrapperBlock>
      <HidingContainer open={open}>
        <HidingText open={open} padding={'8px 0 16px'}>
          <T ucFirst>copyright.title</T>
          <Link route={'https://www.rgs.ru/'} passHref>
            <AboutCompanyLink target={'blank'}>&nbsp;<T ucFirst>copyright.about.title</T></AboutCompanyLink>
          </Link>
        </HidingText>
      </HidingContainer>
    </Wrapper>
  )
}
