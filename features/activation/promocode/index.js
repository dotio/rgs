import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {media} from '../../../helpers/media'
import {BackButton} from '../../../ui/buttons/back-button'
import {Router} from '../../../routes'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {Input} from '../../../ui/form/input'
import {Button} from '../../../ui/button'
import {MedcardDropdown} from '../components/medcard-dropdown'
import {getTranslator} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  
  ${media.mobile`
    text-align: left;
  `}
`

const ActivationWrapper = styled.div`
  position: relative;
  border-radius: 20px;
  min-height: calc(100vh - 14px);
  overflow-y: auto;
  padding: 24px;
  border: 1px solid ${p => getColor('black20', p.theme)};
  
  ${media.mobile`
    min-height: auto;
    border-radius: 0;
    padding: 16px 0;
    border: none;
  `}
`

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
  
  ${media.mobile`
    justify-content: flex-start;
    padding: 0 0 16px;
  `}
`
const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    text-align: left;
  `}
`

const ButtonBox = styled.div`
  text-align: center;
  padding: 44px 0 0;
  width: auto;
  
  ${media.mobile`
    padding: 40px 0 0;
  `}
`

export const ActivationPromocodeComponent = ({medcardOptions}) => {
  const dispatch = useDispatch()
  const [promocode, setPromocode] = useState('')
  const [patientId, setPatientId] = useState('')
  const translator = useSelector(state => getTranslator(state.localization))
  const mainMedcardId = useSelector(state => state.user.mainMedcardId)
  const errorText = useSelector(state => state.activation.errorText)

  const activate = async () => {
    const result = await dispatch.activation.activatePromocode({code: promocode, medcardId: patientId || mainMedcardId})
    result && Router.pushRoute('activation/promocode/success', {id: result.id})
  }

  const changePromocode = (value) => {
    setPromocode(value)
    errorText.length > 0 && dispatch.activation.setError('')
  }

  return (
    <ActivationWrapper>
      <Container>
        <Row>
          <Col lg={{cols: 6, offset: 3}} sm={{cols: 12}}>
            <TitleBox>
              <BackButton onClick={() => Router.pushRoute('/activation')} />
              <StyledTitleText align={'center'}>{translator('activation.promo.title', true)}</StyledTitleText>
            </TitleBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 6, offset: 3}} sm={{cols: 12, offset: 0}}>
            <FormContainer>
              <Text color={'black50'} padding={'0 0 16px'}>{translator('activation.promo.subtitle', true)}</Text>
              <LabeledBox text={translator('activation.promo.promocode', true)} >
                <Input
                  value={promocode}
                  wide
                  size={'16px'}
                  lineHeight={'24px'}
                  borderRadius={'16px'}
                  padding={'5px 11px'}
                  onChange={(e) => changePromocode(e.currentTarget.value)}
                />
              </LabeledBox>
              {medcardOptions && (
                <MedcardDropdown
                  medcardId={patientId}
                  onChange={(value) => setPatientId(value)}
                  backUrl={'/activation/promocode'}
                />)}
              {errorText && (
                <Text padding={'8px 0 0'} color={'dangerousRed'} align={'center'}>{errorText}</Text>
              )}
              <ButtonBox>
                <Button
                  color={'primary'}
                  width={'auto'}
                  cursor={'pointer'}
                  disabled={promocode.length === 0}
                  onClick={activate}
                >
                  {translator('activation.promo.button', true)}
                </Button>
              </ButtonBox>
            </FormContainer>
          </Col>
        </Row>
      </Container>
    </ActivationWrapper>
  )
}

ActivationPromocodeComponent.propTypes = {
  medcardOptions: PropTypes.bool,
}

ActivationPromocodeComponent.defaultProps = {
  medcardOptions: false,
}