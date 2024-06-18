import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {media} from '../../../helpers/media'
import {BackButton} from '../../../ui/buttons/back-button'
import {Router} from '../../../routes'
import {SearchForm} from './search'
import {ActivateForm} from './activate'
import {T} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'
import {Well} from '../../../ui/well'
import moment from 'moment'

const ActivationWrapper = styled(Well)`
  position: relative;
  border-radius: 20px;
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

class ActivationPolicyComponentPure extends Component {
  constructor(props) {
    super(props)

    const {id, name, surname, middlename, birthDate, email, gender, phone, passport} = this.props.currentMedcard

    this.state = {
      screen: 'search',
      searchForm: {
        serial: '',
        number: '',
        code: '',
      },

      activateForm: {
        id,
        name,
        middlename,
        surname,
        birthDate: moment(birthDate, 'YYYY-MM-DD').format('DD.MM.YYYY'),
        email: email,
        gender: gender,
        phone: phone,
        passport: passport,
        insurant: {
          medcardId: id || '',
          email: '',
          phone: '',
          passport: {
            series: '',
            number: ''
          },
        },
        personalAgreement: false,
      },
    }
  }

  changeSearchParams = (field, value) => {
    this.setState(({searchForm}) => ({
      searchForm: {...searchForm, [field]: value}
    }))
  }

  changeActivateParams = (field, value) => {
    this.setState(({activateForm}) => ({
      activateForm: {...activateForm, [field]: value}
    }))
  }

  searchPolicy = async () => {
    const {serial, number, code} = this.state.searchForm
    const {searchPolicy} = this.props

    const result = await searchPolicy({
      number: `S${serial}-${number}`,
      code
    })
    result && this.setState({screen: 'activate'})
  }

  activatePolicy = async () => {
    const {activateForm} = this.state
    const {currentPolicy, activatePolicy} = this.props

    const result = await activatePolicy({...activateForm, number: currentPolicy.number, code: currentPolicy.code})
    result && Router.pushRoute('activation/policy/success', {id: result.id})
  }

  getContent = () => {
    const {screen, searchForm, activateForm} = this.state

    switch(screen) {
      case 'search':
        return <SearchForm
          {...searchForm}
          onChange={this.changeSearchParams}
          onSubmit={this.searchPolicy}
        />

      case 'activate':
        return <ActivateForm
          onChange={this.changeActivateParams}
          fields={activateForm}
          onSubmit={this.activatePolicy}
          goBack={() => this.setState({screen: 'search'})}
        />
    }
  }

  render () {
    return (
      <ActivationWrapper color={'transparent'}>
        <Container>
          <Row>
            <Col lg={{cols: 6, offset: 3}} sm={{cols: 12}}>
              <TitleBox>
                <BackButton onClick={() => Router.pushRoute('/activation')} />
                <StyledTitleText align={'center'}><T ucFirst>activation.policy.title</T></StyledTitleText>
              </TitleBox>
            </Col>
          </Row>
        </Container>
        {this.getContent()}
      </ActivationWrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentPolicy: state.activation.currentPolicy,
    currentMedcard: state.profileMedcard.currentMedcard,
  }
}

const mapDispatchToProps = dispatch => ({
  searchPolicy: (params) => dispatch.activation.searchPolicy(params),
  activatePolicy: (params) => dispatch.activation.activatePolicy(params),
})

export const ActivationPolicyComponent = connect(mapStateToProps, mapDispatchToProps)(ActivationPolicyComponentPure)