import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { media } from '../../../helpers/media'
import {isEmail} from '../../../helpers/validator'
import { ModalTemplate } from '../../../templates/modal'
import { getColor } from '../../../ui/helpers/getColor'
import { TitleText } from '../../../ui/title-text'
import { Wrapper } from '../../../ui/wrapper'
import { Container } from '../../../ui/grid/container'
import { Input } from '../../../ui/form/input'
import { Checkbox } from '../../../ui/form/checkbox'
import { Button } from '../../../ui/button'
import {getTranslator} from '../../../utils/translation'

const CheckboxWrapper = styled(Wrapper)`
  margin-top: 20px;
  padding: 12px;
  background-color: ${p => p.checked ? 'transparent' : getColor('black05', p.theme)};
  border-radius: 8px;
`

const CustomInput = styled(Input)`
  font-size: 48px;
  line-height: 64px;
  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
    padding: 15px 0;
    text-align: center;
  `}

  &:focus, &:active {
    border-size: 3px;
  }

`

export const EditEmailModal = ({current}) => {
  const MAILING_ID = 2
  const {subscribeNews, email, onEmailChange} = current.data
  const dispatch = useDispatch()
  const [inputSubscribeNews, setInputSubscribeNews] = useState(subscribeNews)
  const [inputEmail, setInputEmail] = useState(email || '')
  const translator = useSelector(state => getTranslator(state.localization))
  const settings = useSelector(state => state.profileSettings.settings)
  const hasEmailFlag = settings.subscriptions.find(({id}) => id === MAILING_ID)

  const onSubmit = () => {
    onEmailChange(inputEmail)
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText>{translator('profile.edit-email.title', true)}</TitleText>
        <TitleText color={'black50'} padding={'0 0 24px'}>
          {translator('profile.edit-email.subtitle', true)}
        </TitleText>
        <Wrapper flow={'column'} gap={'20px'} padding={{bottom: '24px'}} mobilePadding={'0 0 20px 0'}>
          <CustomInput
            value={inputEmail}
            wide
            borderRadius={'100px'}
            borderColor={'rgba(0, 0, 0, 0.2)'}
            borderSize={'1px'}
            padding={'17px 31px'}
            onChange={(e) => setInputEmail(e.currentTarget.value)}
          />
          {hasEmailFlag && (
            <CheckboxWrapper checked={inputSubscribeNews}>
              <Checkbox
                key={'subscription'}
                onClick={() => setInputSubscribeNews(!inputSubscribeNews)}
                title={translator('profile.edit-email.subscription', true)}
                checked={inputSubscribeNews}
                alignItems={'top'}
              />
            </CheckboxWrapper>
          )}
        </Wrapper>
        <Button
          padding={'8px 15px'}
          fontSize={'20px'}
          lineHeight={'30px'}
          color={'primary'}
          onClick={onSubmit}
          cursor={'pointer'}
          disabled={!isEmail || !isEmail(inputEmail)}
        >
          {translator('profile.edit-email.save', true)}
        </Button>
      </Container>
    </ModalTemplate>
  )
}

EditEmailModal.propTypes = {
  email: PropTypes.string,
  subscribeNews: PropTypes.bool,
  onEmailChange: PropTypes.func
}

