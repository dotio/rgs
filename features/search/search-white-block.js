import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {Wrapper} from '../../ui/wrapper'
import {Well} from '../../ui/well'
import {FastSearchBlock} from './fast-search-block'
import {Router} from '../../routes'
import {getTranslator} from '../../utils/translation'
import {SearchInput} from '../../ui/search-input'
import {TitleText} from '../../ui/title-text'
import {media} from '../../helpers/media'
import {getColor} from '../../ui/helpers/getColor'
import {Img} from '../../ui/img'
import {isMobile} from 'react-device-detect'

const SearchForm = styled.form`
  width: 100%;
`

const StyledText = styled(Text)`
  padding: 0 0 12px;
  ${media.mobile`
    padding: 0 0 8px
  `}
`

const StyledWrapper = styled(Wrapper)`
  padding: 16px 0 32px;
  ${media.mobile`
    padding: 16px 0 24px
  `}
`

const DutyContainer = styled(Wrapper)`
  height: 220px;
  background: linear-gradient(180deg, #F2F2F2 0%, #DEF2EA 100%);
  border-radius: 20px;
  cursor: pointer;
  ${media.mobile`
    height: 169px;
  `}
`

const DutyIconWrapper = styled.div`
  background: ${p => getColor(p.color, p.theme)};
  width: 80px;
  height: 80px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`

const StyledImg = styled(Img)`
  width: 80px;
  height: 80px;
  ${media.mobile`
    width: 60px;
    height: 60px;
  `}
`

const OuterText = styled(Text)`
    ${media.mobile`
      width: auto;
  `}
`

const InnerText = styled(Text)`
      display: block;
    ${media.mobile`
      display: inline;
  `}
`

export const SearchWhiteBlock = () => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const dutyAvailable = useSelector(state => state.user.dutyAvailable)
  const userCity = useSelector(state => state.user.city)
  const [search, setSearch] = useState('')

  const getCityQuery = (type) => {
    return userCity && userCity.id
      ? type === 'doctor' ? `?cityIdDF=${userCity.id}` : `?cityIdDF=${userCity.id}&servicesTypesIdsDF=2`
      : type === 'doctor' ? '' : '?servicesTypesIdsDF=2'
  }

  const onSearchSubmit = (e) => {
    e.preventDefault()
    Router.pushRoute('search', {query: search})
  }

  const showDutyModal = () => {
    dispatch.modal.addAndShowModal({type: 'search-online-modal'})
  }

  useEffect(() => {
    dispatch.user.getDutyAvailable()
  }, [])

  return (
    <Well>
      <Container>
        <TitleText>{translator('search.main.title', true)}</TitleText>
        <StyledWrapper>
          <SearchForm onSubmit={onSearchSubmit}>
            <SearchInput
              big={true}
              mobileSmall={true}
              value={search}
              bgColor={'black05'}
              onChange={(e) => setSearch(e.target.value)}
              width={'100%'}
              placeholder={translator('search.main.placeholder', true)}
            />
          </SearchForm>
        </StyledWrapper>
        <StyledText color={'black50'}>{translator('search.main.subtitle', true)}</StyledText>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <FastSearchBlock
              bgColor={'black05'}
              route={`/doctors${getCityQuery('doctor')}`}
              img={'/static/icons/search_doc.svg'}
              title={'search.main.example.doctor'}
              circle
              color={'white'}
            />
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <FastSearchBlock
              bgColor={'black05'}
              route={`/doctors${getCityQuery('home')}`}
              img={'/static/icons/search_home.svg'}
              title={'search.main.example.home'}
              color={'white'}
            />
          </Col>
          {dutyAvailable && dutyAvailable.length > 0 && (dutyAvailable[0].available || dutyAvailable[1].available) && <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <DutyContainer flow={'column'} align={'flex-end'} justify={'space-between'} padding={'16px'} onClick={showDutyModal}>
              <Wrapper flow={'column'}>
                <OuterText size={'20px'} width={'100%'} lineHeight={'24px'}>{translator('search.main.example.duty', true)}
                  <InnerText smPadding={'0 6px 0'} color={'primary'} width={'auto'} size={'20px'} lineHeight={'24px'}>
                    {isMobile ? 'Онлайн' : 'Онлайн, готов принять'}
                  </InnerText>
                </OuterText>
              </Wrapper>
              <DutyIconWrapper color={'white'}><StyledImg src={'/static/icons/duty.svg'} shrink={'0'}/></DutyIconWrapper>
            </DutyContainer>
          </Col>}
          {/*<Col lg={{cols: 4}} sm={{cols: 6}}>*/}
          {/*<FastSearchBlock*/}
          {/*bgColor={'black05'}*/}
          {/*route={'/doctors'}*/}
          {/*img={'/static/icons/search_colbs.svg'}*/}
          {/*title={'search.main.example.tests'}*/}
          {/*color={'white'}*/}
          {/*/>*/}
          {/*</Col>*/}
        </Row>
      </Container>
    </Well>
  )
}