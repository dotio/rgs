import React, {useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from '../../ui/grid/container'
import {Wrapper} from '../../ui/wrapper'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {ModalTemplate} from '../modal'
import {DateTimeFilter} from './components/date-time-filter'
import {FiltersGroup} from './components/filters-group'
import {CheckGroup} from './components/check-group'
import {Icon} from '../../ui/icon'
import {Circle} from '../../ui/circle'
import {Switch} from '../../ui/switch'
import {Select} from '../../ui/form/select'
import {Button} from '../../ui/button'
import {media} from '../../helpers/media'

const SwitchContainer = styled.div`
  margin-left: auto;
`
const FiltersContainer = styled.div`
  position: relative;
  padding-bottom: 80px;
`
const ButtonFixedContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10000;
  width: 100%;
  padding: 0 345px 0 328px;
  ${media.medium`
    padding: 6px 6px 0 328px;
  `}
  ${media.mobile`
    padding: 0;
  `}
`
const ButtonContainer = styled.div`
  height: 80px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
  width: 100%;
  border-radius: 0 0 20px 20px;
`

export const FiltersModal = () => {
  const dispatch = useDispatch()
  const experience = useSelector(state => state.dictionary['experience'])
  const qualifications = useSelector(state => state.dictionary['qualifications'])
  const genders = useSelector(state => state.dictionary['genders'])
  const clinics = useSelector(state => state.dictionary['clinics'])
  const [filters, setFilters] = useState(useSelector(state => state.doctors.filters))

  const setFilter = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }

  const applyFilters = () => {
    dispatch.modal.deleteModal()
    dispatch.doctors.updateFilters(filters)
  }

  return (
    <ModalTemplate>
      <FiltersContainer>
        <Container>
          <Row>
            <Col>
              <Text size={'28px'} lineHeight={'32px'}>Фильтры</Text>
            </Col>
          </Row>
        </Container>
        <FiltersGroup padding={'24px 0 0'} title={'Дата приема'}>
          <Col>
            <Wrapper padding={'12px 0 0'} justify={'flex-start'}>
              <DateTimeFilter date={filters.date} setDate={(value) => (setFilter('date', value))}/>
            </Wrapper>
          </Col>
        </FiltersGroup>
        <FiltersGroup title={'Мои избранные'}>
          <Col>
            <Wrapper justify={'flex-start'} align={'center'}>
              <Text width={'auto'} size={'20px'} padding={'0 6px 0 0'} lineHeight={'30px'}>Только избранные</Text>
              <Circle size={24} color={'starred'}>
                <Icon type={'star'} color={'white'} height={16} width={16}/>
              </Circle>
              <SwitchContainer>
                <Switch
                  active={filters.onlyFavorite}
                  onClick={() => setFilter('onlyFavorite', filters.onlyFavorite ? null : true)}
                />
              </SwitchContainer>
            </Wrapper>
            <Text color={'black50'}>Показывать только врачей, которых вы добавили в избранное</Text>
          </Col>
        </FiltersGroup>
        <CheckGroup
          title={'Стаж работы'}
          value={filters.experience}
          onChange={(value) => setFilter('experience', value)}
          options={experience.map(exp => ({
            value: exp.id.toString(),
            title: exp.title,
          }))}
        />
        <CheckGroup
          title={'Квалификация врача'}
          value={filters.qualification}
          onChange={(value) => setFilter('qualification', value)}
          options={qualifications.map(qualification => ({
            value: qualification.id.toString(),
            title: qualification.title,
          }))}
        />
        <FiltersGroup title={'Клиника'}>
          <Col lg={{cols: 6}}>
            <Select
              placeholder={'Выберите клинику'}
              value={filters.clinics[0]}
              onChange={(value) => setFilter('clinics', [value])}
              options={clinics.map(clinic => ({
                value: clinic.id.toString(),
                title: clinic.title,
              }))}
            />
          </Col>
        </FiltersGroup>
        <CheckGroup
          title={'Пол врача'}
          value={filters.gender}
          onChange={(value) => setFilter('gender', value)}
          options={genders.map(gender => ({
            value: gender.id.toString(),
            title: gender.title,
          }))}
        />
        <ButtonFixedContainer>
          <ButtonContainer>
            <Container>
              <Row>
                <Col>
                  <Wrapper justify={'flex-start'} padding={'16px 0 0'}>
                    <Button color={'primary'} onClick={applyFilters}>Применить</Button>
                  </Wrapper>
                </Col>
              </Row>
            </Container>
          </ButtonContainer>
        </ButtonFixedContainer>
      </FiltersContainer>
    </ModalTemplate>
  )
}