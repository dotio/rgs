import React, {useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {ModalTemplate} from '../../modal'
import {Button} from '../../../ui/button'
import {Icon} from '../../../ui/icon'
import {Circle} from '../../../ui/circle'
import {Switch} from '../../../ui/switch'
import {getTranslator} from '../../../utils/translation'
import {SingleListFilter, FilterDropDown} from '../ui/single-list-filter'
import {Container} from '../../../ui/grid/container'
import {Wrapper} from '../../../ui/wrapper'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import {FiltersGroup} from './filters-group'
import {withRouter} from 'next/dist/client/router'
import {pick} from 'ramda'
// import {DateTimeFilter} from './date-time-filter'
// import {CheckGroup} from './check-group'

const SwitchContainer = styled.div`
  margin-left: auto;
`
const FiltersContainer = styled.div`
  position: relative;
  
  ${FilterDropDown} {
    top: auto;
    bottom: 100%;
    margin-bottom: 6px;
    left: 75%;
  }
`
const ButtonContainer = styled.div`
  height: 80px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
  width: 100%;
  border-radius: 0 0 20px 20px;
`

export const OtherFiltersModal = withRouter(({current, router}) => {
  const dispatch = useDispatch()
  const type = router.pathname.includes('doctors') ? 'doctors' : 'clinics'
  const translator = useSelector(state => getTranslator(state.localization))

  const storeFilters = useSelector(state => state[type].filters)
  const [filters, setFilters] = useState(pick(current.data, storeFilters))
  // const qualifications = useSelector(state => state.dictionary['qualifications'])
  // const experience = useSelector(state => state.dictionary['experience'])
  // const genders = useSelector(state => state.dictionary['genders'])
  const clinics = useSelector(state => state.dictionary['clinics'])

  const handleChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const favoriteMapping = (value) => {
    return type === 'doctors' ? value + 'DF' : value + 'CF'
  }

  const applyFilters = () => {
    dispatch.modal.deleteModal()
    dispatch[type].updateFilters(filters)
  }

  return (
    <ModalTemplate padding={'24px 0 0 0'}>
      <FiltersContainer>
        <Container>
          <Row>
            <Col>
              <Text size={'28px'} lineHeight={'32px'}>{translator('doctor.filters-modal.title', true)}</Text>
            </Col>
          </Row>
        </Container>
        {/*<FiltersGroup padding={'24px 0 0'} title={translator('doctor.filters-modal.date', true)}>*/}
        {/*  <Col>*/}
        {/*    <Wrapper padding={'12px 0 0'}>*/}
        {/*      <DateTimeFilter date={filters.dateDF} setDate={(value) => (setFilter('dateDF', value))}/>*/}
        {/*    </Wrapper>*/}
        {/*  </Col>*/}
        {/*</FiltersGroup>*/}
        <FiltersGroup title={translator('doctor.filters-modal.favorite', true)}>
          <Col>
            <Wrapper align={'center'}>
              <Text width={'auto'} size={'20px'} padding={'0 6px 0 0'} lineHeight={'30px'}>{translator('doctor.filters-modal.favorite.title', true)}</Text>
              <Circle size={24} color={'starred'}>
                <Icon type={'star'} color={'white'} height={16} width={16}/>
              </Circle>
              <SwitchContainer>
                <Switch
                  active={!!filters[favoriteMapping('onlyFavorite')]}
                  onClick={() => handleChange(favoriteMapping('onlyFavorite'), filters[favoriteMapping('onlyFavorite')].length > 0 ? '' : 'true')}
                />
              </SwitchContainer>
            </Wrapper>
            <Text color={'black50'}>{translator('doctor.filters-modal.favorite.subtitle', true)}</Text>
          </Col>
        </FiltersGroup>
        {/*<CheckGroup*/}
        {/*  title={translator('doctor.filters-modal.favorite.experience', true)}*/}
        {/*  value={filters.experiencesIdsDF}*/}
        {/*  onChange={(value) => setFilter('experiencesIdsDF', value)}*/}
        {/*  options={experience.map(exp => ({*/}
        {/*    value: exp.id.toString(),*/}
        {/*    title: exp.title,*/}
        {/*  }))}*/}
        {/*/>*/}
        {/*<CheckGroup*/}
        {/*  title={translator('doctor.filters-modal.favorite.qualification', true)}*/}
        {/*  value={filters.qualificationsIdsDF}*/}
        {/*  onChange={(value) => setFilter('qualificationsIdsDF', value)}*/}
        {/*  options={qualifications.map(qualification => ({*/}
        {/*    value: qualification.id.toString(),*/}
        {/*    title: qualification.title,*/}
        {/*  }))}*/}
        {/*/>*/}
        {current.data.includes('clinicsIdsDF') && <FiltersGroup title={translator('doctor.filters-modal.favorite.clinic', true)}>
          <Col lg={{cols: 6}}>
            <SingleListFilter
              title={translator('doctor.filters-modal.favorite.clinic-placeholder', true)}
              searchPlaceholder={translator('clinic.main.search.placeholder', true)}
              mobileWidth={'100%'}
              options={clinics.map(clinic => ({
                value: clinic.id.toString(),
                title: clinic.title,
                searchBy: clinic.title
              }))}
              value={filters.clinicsIdsDF}
              onChange={(value) => handleChange('clinicsIdsDF', value)}
            />
          </Col>
        </FiltersGroup>}
        {/*<CheckGroup*/}
        {/*  title={translator('doctor.filters-modal.favorite.gender', true)}*/}
        {/*  value={filters.gender}*/}
        {/*  onChange={(value) => setFilter('gender', value)}*/}
        {/*  options={genders.map(gender => ({*/}
        {/*    value: gender.id.toString(),*/}
        {/*    title: gender.title,*/}
        {/*  }))}*/}
        {/*/>*/}
        <ButtonContainer>
          <Container>
            <Row>
              <Col>
                <Wrapper padding={'16px 0 0'}>
                  <Button color={'primary'} onClick={applyFilters}>{translator('doctor.filters-modal.button', true)}</Button>
                </Wrapper>
              </Col>
            </Row>
          </Container>
        </ButtonContainer>
      </FiltersContainer>
    </ModalTemplate>
  )
})