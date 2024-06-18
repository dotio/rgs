import React, {useState} from 'react'
import {ModalTemplate} from '../../../../templates/modal'
import {TitleText} from '../../../../ui/title-text'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Input} from '../../../../ui/form/input'
import styled from 'styled-components'
import {media} from '../../../../helpers/media'
import {Button} from '../../../../ui/button'
import {Gap} from '../../../../ui/gap'
import {useDispatch, useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'

const CustomInput = styled(Input)`
  font-size: 48px;
  line-height: 64px;

  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
    padding: 15px 19px;
  `}
`

export const EditPassportModal = ({current}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const [series, setSeries] = useState(current.data.series)
  const [number, setNumber] = useState(current.data.number)
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch.modal.deleteModal()
    dispatch.profileMedcard.updateMedcard({
      medcardId: current.data.medcardId,
      data: {passport: {series, number}}
    })
  }

  const getNumbers = (value) => {
    return value.replace('_', '')
  }

  const formDisabled = () => {
    return !series || !number || getNumbers(series).length !== 4 || getNumbers(number).length !== 6
  }

  return (
    <ModalTemplate>
      <Container>
        <Gap gap={'36px'} mobileGap={'32px'}>
          <TitleText>{translator('profile.medcard.personal-edit.passport-title', true)}</TitleText>
          <Row>
            <Col lg={{cols: 5}} sm={{cols: 5}}>
              <CustomInput
                wide
                borderRadius={'100px'}
                mask={'9999'}
                placeholder={translator('profile.medcard.personal-edit.passport-series', true)}
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                padding={'17px 31px'}
              />
            </Col>
            <Col lg={{cols: 7}} sm={{cols: 7}}>
              <CustomInput
                wide
                borderRadius={'100px'}
                mask={'999999'}
                placeholder={translator('profile.medcard.personal-edit.passport-number', true)}
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                padding={'17px 31px'}
              />
            </Col>
          </Row>
          <Button color={'primary'} padding={'8px 15px'} lineHeight={'30px'} fontSize={'20px'} onClick={onSubmit} disabled={formDisabled()}>{translator('profile.medcard.personal-edit.button', true)}</Button>
        </Gap>
      </Container>
    </ModalTemplate>
  )
}