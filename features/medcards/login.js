import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Wrapper} from '../../ui/wrapper'
import {TitleText} from '../../ui/title-text'
import {Text} from '../../ui/text'
import {media} from '../../helpers/media'
import {LoginPhone} from '../login/phone'
import {LoginCode} from '../login/code'
import {getTranslator} from '../../utils/translation'

const LoginBox = styled.div`
  position: relative;
  max-height: calc(100vh - 14px);
  overflow-y: auto;
`

const Description = styled(TitleText)`
  ${media.mobile`
    padding: 0 0 48px;
    text-align: left;
  `}
`
const PasswordTextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 32px;
  
  ${media.mobile`
    padding: 0 0 24px;
    align-items: flex-start;
  `}
`

class LoginMedcardComponent extends Component {
  state = {
    form: {
      login: '',
      code: '',
    },
    errors: {},
    screen: 'login',
  }

  handleChange = (name, value) => {
    const { wrongCode, resetWrongCode } = this.props

    wrongCode && resetWrongCode()

    this.setState({form: {...this.state.form, [name]: value}, errors: {}})
  }

  sendPhoneForCode = async () => {
    const {sendCode} = this.props
    const {login} = this.state.form
    await sendCode('7' + login.replace(/[- ]/g, '')) && this.setState({screen: 'code'})
  }

  confirm = async () => {
    const {confirm, title, addAndShowModal, fetchRelationships} = this.props
    const {login, code} = this.state.form
    const result = await confirm({phone: '7' + login.replace(/[- ]/g, ''), code})

    await fetchRelationships({dictionary: 'relationships'})

    if (!result.medcard) {
      addAndShowModal({type: 'add-medcard', isChild: false, title})
    } else {
      await this.props.setApproved(true)
      addAndShowModal({type: 'exist-medcard', medcardId: result.medcard.id})
    }
  }

  getTitle = (name) => {
    switch (name) {
      case 'login':
        return <Description
          color={'black50'}
          padding={'0 0 40px'}
          dangerouslySetInnerHTML={{__html: this.props.translator('medcard.login.phone.number', true)}}
        />
      case 'code':
        return <PasswordTextBox>
          <TitleText padding={'0 0 8px'}
            dangerouslySetInnerHTML={{__html: `${this.props.translator('medcard.login.phone.code', true)} ${this.state.form.login}`}}
          />
          <Text
            color={'green'}
            onClick={() => this.setState({screen: 'login'})}
            pointer
          >
            {this.props.translator('medcard.login.change-number', true)}
          </Text>
        </PasswordTextBox>
    }
  }

  getContent = (name) => {
    switch (name) {
      case 'login':
        return <LoginPhone
          value={this.state.form[name]}
          onSubmit={this.sendPhoneForCode}
          onChange={(value) => this.handleChange(name, value)}
          isModal
        />
      case 'code':
        return <LoginCode
          isModal
          value={this.state.form[name]}
          isError={this.props.wrongCode}
          errorMessage={this.props.wrongCodeText}
          params={this.props.codeParams}
          resendCode={this.sendPhoneForCode}
          nextStep={this.confirm}
          onChange={(value) => this.handleChange(name, value)}
        />
    }
  }

  render() {
    const {screen} = this.state
    const {translator} = this.props

    return (
      <LoginBox>
        <Container>
          <Row>
            <Col>
              <Wrapper flow={'column'}>
                <TitleText>{translator('medcard.login.title', true)}</TitleText>
                {this.getTitle(screen)}
                {this.getContent(screen)}
              </Wrapper>
            </Col>
          </Row>
        </Container>
      </LoginBox>
    )
  }
}

const mapStateToProps = state => {
  return {
    codeParams: state.medcards.codeParams,
    wrongCode: state.medcards.wrongCode,
    wrongCodeText: state.medcards.wrongCodeMessage,
    translator: getTranslator(state.localization),
  }
}

const mapDispatchToProps = dispatch => ({
  resetWrongCode: () => dispatch.medcards.resetWrongCodeError(),
  sendCode: (phone) => dispatch.medcards.sendCode(phone),
  confirm: (params) => dispatch.medcards.confirm(params),
  setApproved: (value) => dispatch.medcards.setApproved(value),
  addAndShowModal: (data) => dispatch.modal.addAndShowModal(data),
  fetchRelationships: () => dispatch.dictionary.fetchDictionary({dictionary: 'relationships'}),
})

export const LoginMedcard = connect(mapStateToProps, mapDispatchToProps)(LoginMedcardComponent)
