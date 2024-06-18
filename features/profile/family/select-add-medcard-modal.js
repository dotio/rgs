import React from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import { media } from '../../../helpers/media'
import { ModalTemplate } from '../../../templates/modal'
import { getColor } from '../../../ui/helpers/getColor'
import { Text } from '../../../ui/text'
import { Wrapper } from '../../../ui/wrapper'
import { Icon } from '../../../ui/icon'
import { Container } from '../../../ui/grid/container'
import {T} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'

const AddMedcardBlock = styled(Wrapper)`
  background-color: ${p => getColor('black05', p.theme)};
  height: 120px;
  border-radius: 16px;
  cursor: pointer;
`

const IconWrapper = styled.div`
  padding-left: 18px;
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const ADDCARD_MAPPING = [
  {
    title: <T ucFirst>family.add-medcard.adult</T>,
    isChild: false
  },
  {
    title: <T ucFirst>family.add-medcard.child</T>,
    isChild: true
  },
]
export const SelectAddMedcardModal = () => {
  const dispatch = useDispatch()

  const showAddMedcard = async (title) => {
    await dispatch.dictionary.fetchDictionary({dictionary: 'relationships'})
    dispatch.modal.addAndShowModal({type: 'add-medcard', isChild: true, title})
  }

  const showLoginMedcard = (title) => {
    dispatch.modal.addAndShowModal({type: 'login-medcard', title})
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText smPadding={'0 32px 0 0'}><T ucFirst>family.add-medcard.title</T></TitleText>
        <TitleText color={'black50'} padding={'0 0 24px'}><T ucFirst>family.add-medcard.subtitle</T></TitleText>
        <Row>
          {ADDCARD_MAPPING.map(({title, isChild}, index) => <Col lg={{ cols: 4 }} sm={{ cols: 6 }} key={index}>
            <AddMedcardBlock
              onClick={() => isChild ? showAddMedcard(title) : showLoginMedcard(title)}
              flow={'column'}
              justify={'space-between'}
              padding={'18px 0 16px'}
            >
              <IconWrapper>
                <Icon width={24} height={24} shrink={'0'} type={'circle_plus'} color={'primary'}/>
              </IconWrapper>
              <StyledText size={'20px'} lineHeight={'24px'} padding={'0 16px'}>{title}</StyledText>
            </AddMedcardBlock>
          </Col>
          )}
        </Row>
      </Container>
    </ModalTemplate>
  )
}
