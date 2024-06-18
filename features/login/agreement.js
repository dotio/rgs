import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Wrapper} from '../../ui/wrapper'
import {Button} from '../../ui/button'
import {media} from '../../helpers/media'
import {T} from '../../utils/translation'
import {AgreementBlock} from '../../ui/form/agreement'

const BottomContainer = styled.div`
  padding: 64px 0 0;
  width: auto;
  
  ${media.mobile`
    text-align: center;
    padding: 40px 0 0;
  `}
`

export class LoginAgreement extends React.PureComponent {
  render () {
    const {checked, onChange, onSubmitForm, isRegistration = true} = this.props
    return (
      <Wrapper align={'center'} flow={'column'}>
        <AgreementBlock
          isRegistration={isRegistration}
          onChange={() => onChange(!checked)}
          checked={checked}
        />
        <BottomContainer>
          <Button
            color={'green'}
            cursor={'pointer'}
            disabled={!checked}
            onClick={onSubmitForm}
            analyticsElement={'confirm-agreement'}
          >
            <T ucFirst>login.agreement.button</T>
          </Button>
        </BottomContainer>
      </Wrapper>
    )
  }
}

LoginAgreement.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  nextStep: PropTypes.func,
}