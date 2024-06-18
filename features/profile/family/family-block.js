import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { media } from '../../../helpers/media'
import { Container } from '../../../ui/grid/container'
import { TitleText } from '../../../ui/title-text'
import { Button } from '../../../ui/button'
import { Well } from '../../../ui/well'
import { Wrapper } from '../../../ui/wrapper'
import { Medcard } from '../components/medcard'
import {T} from '../../../utils/translation'

const FamilyBlockWrapper = styled(Well)`
  min-height: ${p => p.hasMedcards ? 'auto' : '492px'};
  position: relative;
  
  ${p => media.mobile`
    padding: ${p.hasMedcards ? '20px 0' : '20px 0 0'};
    min-height: auto;
  `}
`

const StyledButton = styled(Button)`
  z-index: 10;
`

const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    padding: 0 0 20px;
  `}
`

const StyledAddButton = styled(Button)`
  margin-top: 24px;
  
  ${media.mobile`
    margin-top: 20px;
  `}
`

const BannerBlock = styled.div`
  position: absolute;
  bottom: 0;
  display: block;
  left: 50%;
  margin-left: -474px;
  width: 944px;
  height: 492px;
  background-image: url('/static/banners/family-medcard-lg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  z-index: 9;

  ${media.mobile`
    position: relative;
    left: 0;
    bottom: 0;
    margin: 0 auto;
    max-width: 750px;
    max-height: 344px;
    width: 100vw;
    height: 45.87vw;
    background-size: contain;
    background-image: url('/static/banners/family-medcard-sm.png');
  `}
`

export const FamilyBlock = () => {
  const dispatch = useDispatch()
  const medcards = useSelector(state => state.medcards.list.filter(medcard => !medcard.main))
  const hasMedcards = medcards.length > 0

  const addMedcardHandle = () => dispatch.modal.addAndShowModal({type: 'select-add-medcard'})

  return (
    <FamilyBlockWrapper hasMedcards={hasMedcards} padding={hasMedcards ? '24px 0' : '24px 0 0'}>
      <Container>
        <TitleText><T ucFirst>family.title</T></TitleText>
        <StyledTitleText color={'black50'} padding={hasMedcards ? '0 0 16px' : '0 0 24px'}>
          {hasMedcards ? <T ucFirst>family.has-medcard.subtitle</T> : <T ucFirst>family.no-medcard.subtitle</T>}
        </StyledTitleText>
        {!hasMedcards && <StyledButton color={'green'} padding={'9px 16px'} fontSize={'20px'} lineHeight={'30px'} onClick={addMedcardHandle}>
          <T ucFirst>family.button.add</T>
        </StyledButton>}
        {hasMedcards && <Wrapper flow={'column'} gap={'16px'} align={'center'} justify={'center'}>
          {medcards.map((medcard) => <Medcard key={medcard.id} {...medcard} />)}
          <StyledAddButton color={'black05'} onClick={addMedcardHandle}>
            <T ucFirst>family.button.new</T>
          </StyledAddButton>
        </Wrapper>}
      </Container>
      {!hasMedcards && <BannerBlock />}
    </FamilyBlockWrapper>
  )
}

FamilyBlock.propTypes = {
  medcards: PropTypes.arrayOf(PropTypes.shape({
    hasAccess: PropTypes.bool,
    id: PropTypes.number,
    name: PropTypes.string,
    surname: PropTypes.string,
    phone: PropTypes.string,
    relationship: PropTypes.string
  }))
}