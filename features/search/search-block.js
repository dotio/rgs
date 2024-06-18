import React, {Fragment, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {Wrapper} from '../../ui/wrapper'
import {FastSearchBlock} from './fast-search-block'
import {SearchInput} from '../../ui/search-input'
import {getTranslator} from '../../utils/translation'
import {Well} from '../../ui/well'
import {Divider} from '../../ui/divider'
import {media} from '../../helpers/media'
import {TitleText} from '../../ui/title-text'
import {MedconsultantTooltip} from './medconsultant-tooltip'
import {CardWithIcon} from '../profile/medcard/components/card-with-icon'
import {requestApi} from '../../lib/api'
import {DoctorsMapCards} from '../doctors/doctors-map-cards'
import {ClinicsMapCards} from '../clinics/clinics-map-cards'
import {useDebouncedEffect} from '../../helpers/debounce'

const StyledText = styled(Text)`
  padding: 0 0 12px;
  ${media.mobile`
    padding: 0 0 8px
  `}
`

const StyledWrapper = styled(Wrapper)`
  padding: 16px 0 32px;
  ${media.mobile`
    padding: 16px 0 20px
  `}
`

const CardWrapper = styled(Wrapper)`
  min-width: 171px;
  width: 171px;
  height: 120px;
`
const ListWrapper = styled.div`
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
  
  ${media.mobile`
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  `}
`

const ListContainer = styled(Container)`
  ${media.mobile`
    padding: 0;
  `}
`

const ContentWrapper = styled(Wrapper)`
  overflow-x: auto;
  overflow-y: hidden;
  margin-left: -16px;
  margin-right: -16px;
  position: relative;
  padding-right: 16px;
  width: calc(100% + 32px);
`

const IconWrapper = styled.div`
  display: inline;
  position: relative;
  bottom: 2px;
  padding-right: 6px;
  cursor: pointer;
`

export const SearchBlock = ({initSearch}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const clinics = useSelector((state) => state.filtersSearch.clinics)
  const doctors = useSelector((state) => state.filtersSearch.doctors.items)
  const consultation = useSelector(state => state.consultation.current)
  const userCity = useSelector(state => state.user.city)
  const route = useSelector(state => state.router.currentPath)

  const [searchText, setSearchText] = useState(initSearch)

  const getCityQuery = (type) => {
    return userCity && userCity.id ? (type === 'doctor' ? `?cityIdDF=${userCity.id}` : `?cityIdCF=${userCity.id}`) : ''
  }

  useDebouncedEffect(() => dispatch.filtersSearch.updateFilters({query: searchText}), 500, [searchText])

  const callChatType = (type) => async () => {
    await dispatch.consultation.createOrGoToActive({type, redirect: true})

    if(consultation.active && type !== 'chat') {
      await requestApi('post', '/app/event', {
        event: `webrtc_incoming_${type}`,
        chatId: consultation.chat.id,
        consultationId: consultation.id
      })
    }
  }

  const searchFieldIsEmpty = doctors.length === 0 && clinics.length === 0 && route ==='/search'
  const noResultsFound = doctors.length === 0 && clinics.length === 0 && route !=='/search'
  const resultsAfterSearchAvailable = doctors.length !== 0 || clinics.length !== 0

  return (
    <Well color={'transparent'}>
      <Container>
        <TitleText>{translator('search.menu.title', true)}</TitleText>
        <StyledWrapper>
          <SearchInput
            big={true}
            value={searchText}
            initValue={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            width={'100%'}
            bgColor={'white'}
            placeholder={translator('search.menu.placeholder', true)}
            mobileSmall
          />
        </StyledWrapper>
      </Container>
      {searchFieldIsEmpty ? <Container>
        <StyledText color={'black50'}>{translator('search.menu.subtitle', true)}</StyledText>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <FastSearchBlock
              route={`/doctors${getCityQuery('doctor')}`}
              title={'search.menu.example.appointment'}
              bgColor={'white'}
              img={'/static/icons/search_doc.svg'}
              circle
              color={'black05'}
            />
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 6, paddingBottom: '6px'}}>
            <FastSearchBlock
              route={`/clinics${getCityQuery('clinic')}`}
              title={'search.menu.example.clinic'}
              bgColor={'white'}
              img={'/static/icons/search_clinic.svg'}
              color={'black05'}
            />
          </Col>
        </Row>
      </Container> : <Fragment>
        {resultsAfterSearchAvailable && <Well>
          <ListContainer>
            <ListWrapper>
              <DoctorsMapCards doctors={doctors ? doctors : []}/>
              {doctors.length > 0 && <Divider width={'calc(100% - 32px)'} color={'black20'} margin={'8px 16px'} />}
              <ClinicsMapCards clinics={clinics ? clinics : []}/>
            </ListWrapper>
          </ListContainer>
        </Well>}
        <Container>
          {noResultsFound && <StyledText size={'24px'} lineHeight={'28px'} color={'black50'}>{translator('search.result.tooltip.notfound', true)}</StyledText>}
          <Wrapper align={'center'} padding={'24px 0 0'} flexWrap>
            <TitleText width={'auto'} padding={'0 6px 0 0'}>{translator('search.result.connection.title-first', true)}</TitleText>
            <TitleText width={'auto'} padding={'0'}><IconWrapper><MedconsultantTooltip isSearch/></IconWrapper>{translator('search.result.connection.title-second', true)}</TitleText>
            <TitleText color={'black50'}>Выберите удобный тип связи</TitleText>
            <Container>
              <ContentWrapper padding={'24px 0 0'} gap={'12px'}>
                <CardWrapper>
                  <CardWithIcon
                    onClick={callChatType('chat')}
                    icon={'chat'}
                    iconColor={'primary'}
                    bgColor={'white'}
                    label={'Чат'}
                  />
                </CardWrapper>
                <CardWrapper>
                  <CardWithIcon
                    onClick={callChatType('video')}
                    icon={'camera24'}
                    iconColor={'primary'}
                    bgColor={'white'}
                    label={'Видео'}
                  />
                </CardWrapper>
                <CardWrapper>
                  <CardWithIcon
                    onClick={callChatType('audio')}
                    icon={'microphone24'}
                    iconColor={'primary'}
                    bgColor={'white'}
                    label={'Аудио'}
                  />
                </CardWrapper>
                <CardWrapper>
                  <CardWithIcon
                    icon={''}
                    onClick={() => dispatch.modal.addAndShowModal({type: 'call-about-modal'})}
                    iconColor={'primary'}
                    bgColor={'white'}
                    label={'По телефону'}
                  />
                </CardWrapper>
              </ContentWrapper>
            </Container>
          </Wrapper>
        </Container>
      </Fragment>
      }
    </Well>
  )
}