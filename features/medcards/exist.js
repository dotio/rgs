import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from '../../ui/text'
import { Button } from '../../ui/button'
import { LabeledBox } from '../../ui/form/labeled-box'
import { media } from '../../helpers/media'
import { getColor } from '../../ui/helpers/getColor'
import { Switcher } from '../../ui/form/switcher'
import { Input } from '../../ui/form/input'
import { Container } from '../../ui/grid/container'
import { Avatar } from '../../ui/avatar'
import {getTranslator} from '../../utils/translation'
import {Wrapper} from '../../ui/wrapper'
import {TitleText} from '../../ui/title-text'


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`

const ContentWrapper = styled(Wrapper)`
  border-radius: 16px;
  background-color: ${p => getColor('black05', p.theme)};
  
  ${media.mobile`
    width: 100%;
  `}
`

const StyledWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  min-height: 420px;
  justify-content: space-between;
`

export const MedcardExistComponent = () => {
  const dispatch = useDispatch()
  const relationships = useSelector(state => state.dictionary.relationships.map(({title, isChild}) => ({value: title, title, isChild})))
  const authParams = useSelector(state => state.medcards.authParams)
  const medcard = authParams.medcard || {}
  const [relationship, setRelationship] = useState('')
  const [own, setOwn] = useState('')
  const translator = useSelector(state => getTranslator(state.localization))

  const getRelationships = () => {
    return [...relationships, { title: translator('medcard.exist.relationship.other', true), id: 'own', value: 'own', }]
  }

  const onSubmit = async () => {
    const userRelationship = own ? own : relationship
    await dispatch.medcards.addRelationship({ ...medcard, relationship: userRelationship, userId: authParams.userId, phone: authParams.phone})
    dispatch.modal.deleteAllModals()
  }

  return (
    <Container>
      <StyledWrapper>
        <Wrapper flow={'column'}>
          <TitleText>{translator('medcard.exist.title', true)}</TitleText>
          <Wrapper width={'auto'}>
            <ContentWrapper align={'center'} gap={'8px'} padding={'16px'} with={'auto'} margin={'24px 0 20px'} width={'auto'}>
              <Avatar size={'36px'} bgColor={'secondary'} color={'white'} text={medcard && medcard.name && medcard.name[0]} src={medcard.photo} />
              <Text size={'20px'} lineHeight={'24px'} width={'auto'}>{medcard && `${medcard.name} ${medcard.surname}`}</Text>
            </ContentWrapper>
          </Wrapper>
          <FormContainer>
            <LabeledBox text={translator('medcard.exist.form.relationship', true)} margin={'0 0 10px'}>
              <Switcher isCallBackForm list={getRelationships()} selected={relationship} onChange={(value) => setRelationship(value)} />
            </LabeledBox>
            {relationship === 'own' && <LabeledBox text={translator('medcard.exist.form.relationship-other', true)} margin={'0 0 24px'}>
              <Text color={'black50'} padding={'0 0 6px'}>{translator('medcard.exist.form.relationship-title', true)}</Text>
              <Input
                value={own}
                size={'16px'}
                lineHeight={'24px'}
                borderRadius={'16px'}
                padding={'5px 11px'}
                onChange={(e) => setOwn(e.currentTarget.value)}
              />
            </LabeledBox>}
          </FormContainer>
        </Wrapper>
        <Wrapper width={'auto'}>
          <Button
            color={'primary'}
            width={'auto'}
            onClick={onSubmit}
            cursor={'pointer'}
            lineHeight={'30px'}
            fontSize={'20px'}
            padding={'8px 15px'}
          >
            {translator('medcard.exist.form.button', true)}</Button>
        </Wrapper>
      </StyledWrapper>
    </Container>
  )
}

MedcardExistComponent.propTypes = {
  backUrl: PropTypes.string,
  medcardId: PropTypes.string,
}