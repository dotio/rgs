import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {media} from '../../helpers/media'
import {LoginPhone} from './phone'
import {LoginCode} from './code'
import {LoginAgreement} from './agreement'
import {getColor} from '../../ui/helpers/getColor'
import {CircleButton} from '../../ui/circle-button'
import {Router} from '../../routes'
import {getTranslator} from '../../utils/translation'
import {requestApi} from '../../lib/api'

const LoginBox = styled.div`
  position: relative;
  border-radius: 20px;
  padding: 24px;
  min-height: calc(100vh - 14px);
  overflow-y: auto;
  border: 1px solid ${(p) => getColor('black20', p.theme)};
  
  ${media.mobile`
    min-height: auto;
    border-radius: 0;
    padding: 16px 0;
    border: none;
  `}
`
const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${media.mobile`
    display: block;
    height: auto;
  `}
`
const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${media.mobile`
    justify-content: flex-start;
    padding: 0 0 16px;
  `}
`
const TitleText = styled(Text)`
  ${media.mobile`
    text-align: left;
  `}
`
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
  padding: 24px 0 0;
  flex-shrink: 1;
  
  ${media.mobile`
    padding: 0;
    display: block;
    height: auto;
  `}
`
const Description = styled(Text)`
  ${media.mobile`
    padding: 0 0 48px;
    text-align: left;
  `}
`
const PasswordTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 40px;
  
  ${Text} {
    text-align: center;
    
    ${media.mobile`
      text-align: left;
    `}
  }
  
  ${media.mobile`
    padding: 0 0 24px;
    align-items: flex-start;
  `}
`

class LoginComponentPure extends Component {
  state = {
    form: {
      login: '',
      code: '',
      agreement: false,
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
    await sendCode('+7 ' + login) && this.setState({screen: 'code'})
  }

  authorize = async () => {
    const {authorize, backUrl} = this.props
    const {login, code} = this.state.form

    const result = await authorize({login: '+7 ' + login, code})

    const myProducts = await requestApi('get', '/profile/current-products')
    result.personalAgreementStatus
      ? (myProducts.length > 0 && backUrl !== '/activation') ? Router.pushRoute('/profile/products') : (backUrl ? Router.pushRoute(backUrl) : this.returnToMain())
      : this.setState({screen: 'agreement'})
  }

  authorizeWithAgreement = async () => {
    const {authorizeWithAgreement, backUrl} = this.props
    const {form} = this.state

    await authorizeWithAgreement({
      ...form,
      login: '+7 ' + form.login
    }) && (backUrl ? Router.pushRoute(backUrl) : this.returnToMain())
  }

  returnToMain = () => {
    Router.pushRoute('/')
  }

  getTitle = (name) => {
    switch (name) {
      case 'login':
        return <Description
          size={'16px'}
          padding={'24px 0 40px'}
          lineHeight={'1.5'}
          align={'center'}
          dangerouslySetInnerHTML={{__html: this.props.translator('login.auth.description', true)}}
        />
      case 'code':
        return <PasswordTextBox>
          <Text
            size={'16px'}
            lineHeight={'1.5'}
            dangerouslySetInnerHTML={{__html: `${this.props.translator('login.auth.code', true)} ${this.state.form.login}`}}
          />
          <Text
            color={'green'}
            size={'16px'}
            lineHeight={'1.5'}
            onClick={() => this.setState({screen: 'login'})}
            align={'center'}
            pointer
          >
            {this.props.translator('login.auth.button.change-number', true)}
          </Text>
        </PasswordTextBox>
      case 'agreement':
        return <Description
          size={'16px'}
          padding={'24px 0 40px'}
          lineHeight={'1.5'}
          align={'center'}
          dangerouslySetInnerHTML={{__html: this.props.translator('login.auth.agreement', true)}}
        />
    }
  }

  getContent = (name) => {
    switch (name) {
      case 'login':
        return <LoginPhone
          value={this.state.form[name]}
          onSubmit={this.sendPhoneForCode}
          onChange={(value) => this.handleChange(name, value)}
        />
      case 'code':
        return <LoginCode
          value={this.state.form[name]}
          isError={this.props.wrongCode}
          errorMessage={this.props.wrongCodeText}
          params={this.props.codeParams}
          resendCode={this.sendPhoneForCode}
          nextStep={this.authorize}
          onChange={value => /^[0-9]+$/.test(value) || value.length === 0 ? this.handleChange(name, value) : {}}
        />
      case 'agreement':
        return <LoginAgreement
          checked={this.state.form[name]}
          onChange={(value) => this.handleChange(name, value)}
          onSubmitForm={this.authorizeWithAgreement}
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
              <LoginWrapper>
                <TitleBox>
                  <TitleText align={'center'} size={'28px'} lineHeight={'32px'}>{translator('login.auth.title', true)}</TitleText>
                  <CircleButton icon={'cross'} onClick={() => Router.pushRoute('/')}/>
                </TitleBox>
                <ContentBox>
                  {this.getTitle(screen)}
                  {this.getContent(screen)}
                </ContentBox>
              </LoginWrapper>
            </Col>
          </Row>
        </Container>
      </LoginBox>
    )
  }
}

const mapStateToProps = state => {
  return {
    codeParams: state.login.codeParams,
    wrongCode: state.login.wrongCode,
    wrongCodeText: state.login.wrongCodeMessage,
    translator: getTranslator(state.localization),
  }
}

const mapDispatchToProps = dispatch => ({
  resetWrongCode: () => dispatch.login.resetWrongCodeError(),
  sendCode: (login) => dispatch.login.sendCode(login),
  authorize: (params) => dispatch.login.authorize(params),
  authorizeWithAgreement: (params) => dispatch.login.authorizeWithAgreement(params),
})

export const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(LoginComponentPure)
