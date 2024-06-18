import React, {Fragment, PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Button} from '../../ui/button'
import {isPhoneNumber} from '../../helpers/validator'
import {media} from '../../helpers/media'
import {Text} from '../../ui/text'
import {Input} from '../../ui/form/input'
import {getColor} from '../../ui/helpers/getColor'
import {T} from '../../utils/translation'

const InputContainer = styled.div`
  display: flex;
  justify-content: ${p => p.isModal ? 'flex-start' : 'center'};
  align-items: center;
  padding-left: ${(p) => (p.isValue && !p.isModal ? '0' : p.isModal ? '32px' : '48px')};
  width: ${p => p.isModal ? '100%' : '598px'};
  height: 100px;
  border: 3px solid ${(p) => getColor('black20', p.theme)};
  border-radius: ${p => p.isModal ? '100px' : '20px'};
  background-color: #ffffff;

  ${media.mobile`
    width: 100%;
    height: 60px;
  `}
`

const StyledInput = styled(Input)`
  width: ${p => p.ismodal ? '100%' : '72px'};
  height: 100px;
  font-size: 48px;
  line-height: 64px;
  letter-spacing: 2px;

  ${media.mobile`
    font-size: 36px;
    line-height: 44px;
    height: 60px;
    letter-spacing: 0.3px;
  `}
  
  ${p => p.ismodal && media.mobile`
    font-size: 24px;
    line-height: 28px;
  `}
`

const Code = styled(Text)`
  font-size: 48px;
  line-height: 64px;
  padding: 0 15px 0 0;

  ${media.mobile`
    font-size: 36px;
    line-height: 44px;
    padding: 0 8px 0 0; 
  `}
  
  ${p => p.isModal && media.mobile`
    font-size: 24px;
    line-height: 28px;
  `}
`

const ButtonContainer = styled.div`
  padding: ${p => p.isModal ? '64px 0 10px' : '64px 0 0'};
  width: auto;

  ${media.mobile`
    text-align: center;
    padding: 40px 0 0;
  `}
  
  ${p => p.isModal && media.mobile`
    text-align: left;
    padding: 40px 0 10px;
  `}
`

export class LoginPhone extends PureComponent {
  input = React.createRef()
  code = React.createRef()

  inputClick = () => {
    this.input.focus()
  }

  onChange = (e) => {
    this.props.onChange(e.currentTarget.value)
    this.calculateInputWidth()
  }

  handleKeyPress = (target) => {
    if (target.charCode === 13 && isPhoneNumber(this.props.value)) {
      this.props.onSubmit()
    }
  }

  calculateInputWidth = () => {
    this.input.style.width = 0
    this.input.style.width = `${Math.max(
      this.input.scrollWidth + 10,
      this.code.clientWidth
    )}px`
  }

  componentDidMount() {
    this.calculateInputWidth()
  }

  render() {
    const {value, onSubmit, isModal} = this.props

    return (
      <Fragment>
        <InputContainer onClick={this.inputClick} isValue={value.length > 0} isModal={isModal}>
          <Code ref={(el) => (this.code = el)} width={'auto'} color={'black'} isModal={isModal}>
            +7
          </Code>
          <StyledInput
            ismodal={isModal}
            inputMode={'numeric'}
            type='tel'
            maskChar={null}
            hideBorder
            value={value}
            onChange={this.onChange}
            onKeyPress={this.handleKeyPress}
            bgColor={'transparent'}
            mask={'999 999-99-99'}
            autoFocus={true}
            padding={'0'}
            borderSize={'0px'}
            ref={(el) => (this.input = el)}
          />
        </InputContainer>
        <ButtonContainer isModal={isModal}>
          <Button
            color={'green'}
            disabled={!isPhoneNumber(value)}
            onClick={onSubmit}
            width={'150px'}
            cursor={'pointer'}
            analyticsElement={'send-phone'}
            fontSize={isModal ? '20px' : '16px'}
            lineHeight={isModal ? '30px' : '24px'}
          >
            <T ucFirst>login.auth.button.next</T>
          </Button>
        </ButtonContainer>
      </Fragment>
    )
  }
}

LoginPhone.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}
