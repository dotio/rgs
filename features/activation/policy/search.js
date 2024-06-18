import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {Button} from '../../../ui/button'
import {media} from '../../../helpers/media'
import {Input} from '../../../ui/form/input'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Container} from '../../../ui/grid/container'
import {getTranslator} from '../../../utils/translation'
import {useSelector} from 'react-redux'

const PolicyInfo = styled.div`
 display: flex;
 align-items: center;
 width: 100%;
 padding: 0 0 20px;
`

const BottomContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 44px 0 0;
  width: auto;
  
  ${media.mobile`
    text-align: center;
    padding: 40px 0 0;
  `}
`

const SerialInput = styled(Input)`
  width: 100px;
`

const getNumbers = (value) => {
  return value.replace('_', '')
}


export const SearchForm = ({serial, number, code, onChange, onSubmit}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const formDisabled = () => {
    return getNumbers(serial).length !== 6 || getNumbers(number).length !== 8 || getNumbers(code).length === 0
  }

  return (
    <Container>
      <Row>
        <Col lg={{cols: 6, offset: 3}} sm={{cols: 12, offset: 0}}>
          <Text color={'black50'} padding={'0 0 16px'}>{translator('activation.policy.search.title', true)}</Text>
          <LabeledBox text={translator('activation.policy.search.number', true)}>
            <PolicyInfo>
              <Text width={'auto'} bold>s&nbsp;—&nbsp;</Text>
              <SerialInput
                value={serial}
                mask={'999999'}
                size={'16px'}
                padding={'5px 11px'}
                placeholder={translator('activation.policy.search.placeholder-first', true)}
                onChange={(e) => onChange('serial', e.currentTarget.value)}
              />
              <Text  width={'auto'} bold>&nbsp;—&nbsp;</Text>
              <Input
                value={number}
                wide
                size={'16px'}
                lineHeight={'24px'}
                padding={'5px 11px'}
                mask={'99999999'}
                placeholder={translator('activation.policy.search.placeholder-second', true)}
                onChange={(e) => onChange('number', e.currentTarget.value)}
              />
            </PolicyInfo>
          </LabeledBox>
          <LabeledBox text={translator('activation.policy.search.code', true)}>
            <Input
              value={code}
              wide
              lineHeight={'24px'}
              size={'16px'}
              padding={'5px 11px'}
              onChange={(e) => onChange('code', e.currentTarget.value)}
            />
          </LabeledBox>
          <BottomContainer>
            <Button
              color={'primary'}
              width={'auto'}
              cursor={'pointer'}
              disabled={formDisabled()}
              onClick={onSubmit}
            >
              {translator('activation.policy.search.button', true)}
            </Button>
          </BottomContainer>
        </Col>
      </Row>
    </Container>
  )
}

SearchForm.propTypes = {
  serial: PropTypes.string,
  number: PropTypes.string,
  code: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  nextStep: PropTypes.func,
}