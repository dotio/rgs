import React, {forwardRef, useState, useEffect, useCallback} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Container} from '../../ui/grid/container'
import {Wrapper} from '../../ui/wrapper'
import {Text} from '../../ui/text'
import {TitleText} from '../../ui/title-text'
import {Well} from '../../ui/well'
import {useDispatch, useSelector} from 'react-redux'
import {useDebouncedEffect} from '../../helpers/debounce'
import {FiltersTemplate} from '../../templates/filters'
import {ClearFilters} from '../../templates/filters/clear'
import {Switch} from '../../ui/switch'
import {getTranslator} from '../../utils/translation'
import {DoctorsMapCards} from './doctors-map-cards'
import {Button} from '../../ui/button'
import {media} from '../../helpers/media'
import {compose, filter, isEmpty, not} from 'ramda'
import {isMobile} from 'react-device-detect'

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    overflow-x: auto;
  `}
`

export const DoctorsListComponent = forwardRef(({setShowMore, title, limit, handleMapMode, offLoadScroll, handleHideBlock, resizeMap, coords, hideMap = false, othersDoctors = false}, ref) => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.doctors.filters)
  let doctors = useSelector(state => state.doctors.list)
  const mapDoctors = useSelector(state => state.doctors.mapList)
  const doctor = useSelector(state => state.doctors.currentDoctor)
  const totalDoctors = useSelector(state => state.doctors.total)
  const [searchText, setSearchText] = useState(useSelector(state => state.doctors.filters.searchDF))
  const [switcherOn, setSwitcher] = useState(false)
  const [hideBlockSpecializations, setHideBlockSpecializations] = useState(false)
  const translator = useSelector(state => getTranslator(state.localization))
  const currentDoctorsLength = limit ? Math.min(doctors.length, limit) : doctors.length
  const [showFull, setShowFull] = useState(false)
  const hasFilters = Object.keys(filter(compose(not, isEmpty), filters)).length > 0

  if (doctor && othersDoctors) {
    doctors = doctors.filter(({id}) => id !== +doctor.id)
  }

  const slicedDoctors = limit ? doctors.slice(0, limit) : doctors

  const memoizedCallback = useCallback(async () => {
    const promises = [
      dispatch.doctors.fetchSpecializations(),
      dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
      dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
      dispatch.dictionary.fetchDictionary({dictionary: 'experience'}),
      dispatch.dictionary.fetchDictionary({dictionary: 'qualifications'}),
      dispatch.dictionary.fetchDictionary({dictionary: 'genders'}),
      dispatch.dictionary.fetchDoctorsDictionary({dictionary: 'clinics'}),
      dispatch.dictionary.fetchDictionary({dictionary: 'cities'}),
    ]

    await Promise.all(promises)
  }, [])

  useEffect(() => {
    memoizedCallback()
  }, [])

  const getFilters = () => {
    if(hideMap) {
      return [
        {
          type: 'search',
          key: 'searchDF',
          value: searchText,
          placeholder: translator('doctor.filter.search', true),
          options: {hideMobile: true},
          clinicRoute: true
        },
        {
          type: 'specializations',
          key: 'specializationIdDF',
          value: filters.specializationIdDF,
        },
        {
          type: 'checkerFilter',
          key: 'onlyChildDF',
          value: filters.onlyChildDF,
          title: translator('doctor.filter.children', true),
          subTitle: translator('doctor.filter.children.subtitle', true),
          text: translator('doctor.filter.children.content', true)
        },
        {
          type: 'appointmentType',
          key: 'servicesTypesIdsDF',
          value: filters.servicesTypesIdsDF
        },
        {
          type: 'checkerFilter',
          key: 'onlyRatedDF',
          value: filters.onlyRatedDF,
          title: translator('doctor.filter.rating', true),
          subTitle: translator('doctor.filter.rating.subtitle', true),
          text: translator('doctor.filter.rating.content', true)
        },
        {
          type: 'otherFilters',
          value: [
            {
              type: 'favorite',
              key: 'onlyFavoriteDF',
              value: filters.onlyFavoriteCF,
            },{
              type: 'clinics',
              key: 'clinicsIdsDF',
              value: filters.clinicsIdsDF,
            },
          ]
        },
      ]
    } else return [
      {
        type: 'search',
        key: 'searchDF',
        value: searchText,
        placeholder: translator('doctor.filter.search', true),
        options: {hideMobile: true, mobileFull: true},
      },
      {
        type: 'specializations',
        key: 'specializationIdDF',
        value: filters.specializationIdDF,
      },
      {
        type: 'cities',
        key: 'cityIdDF',
        value: filters.cityIdDF,
      },
      {
        type: 'metro',
        key: 'metroStationsIdsDF',
        value: filters.metroStationsIdsDF,
      },
      {
        type: 'appointmentType',
        key: 'servicesTypesIdsDF',
        value: filters.servicesTypesIdsDF
      },
      {
        type: 'checkerFilter',
        key: 'onlyChildDF',
        value: filters.onlyChildDF,
        title: translator('doctor.filter.children', true),
        subTitle: translator('doctor.filter.children.subtitle', true),
        text: translator('doctor.filter.children.content', true)
      },
      {
        type: 'checkerFilter',
        key: 'onlyRatedDF',
        value: filters.onlyRatedDF,
        title: translator('doctor.filter.rating', true),
        subTitle: translator('doctor.filter.rating.subtitle', true),
        text: translator('doctor.filter.rating.content', true)
      },
      {
        type: 'otherFilters',
        value: [
          'onlyFavoriteDF',
          'clinicsIdsDF',
        ]
      },
    ]
  }

  const handleChange = (field, value) => {
    if(field === 'specializationIdDF'){
      setHideBlockSpecializations(hideBlockSpecializations)
      handleHideBlock && handleHideBlock(hideBlockSpecializations)
    }

    if(field === 'specializationIdDF' && value === ''){
      handleHideBlock && handleHideBlock(!hideBlockSpecializations)
    }

    if (field === 'searchDF') {
      setSearchText(value)
      return
    }
    dispatch.doctors.updateFilters({
      [field]: value
    })
  }

  const clearFilters = async () => {
    await dispatch.doctors.clearFiltersRequest()
    handleHideBlock && handleHideBlock(!hideBlockSpecializations)
    setSearchText('')
  }

  const filtersShowMore = () => {
    setShowFull(true)
    setShowMore(true)
  }

  const handleSwitch = async () => {
    dispatch.loaders.showLoader()
    const switcherValue = !switcherOn

    await dispatch.doctors.setForMap(switcherValue)

    await dispatch.doctors.fetchDoctors({filters})

    await setSwitcher(switcherValue)
    handleMapMode && handleMapMode(switcherOn)
    dispatch.router.toggleBottomTemplate(switcherOn)

    dispatch.loaders.hideLoader()
  }

  useEffect(() => {
    return () => {
      dispatch.router.toggleBottomTemplate(true)
    }
  }, [])

  useEffect(() => {
    if(switcherOn && isMobile){
      dispatch.router.toggleBottomTemplate(false)
    } else {
      dispatch.router.toggleBottomTemplate(true)
    }
  }, [switcherOn])

  useDebouncedEffect(() => dispatch.doctors.updateFilters({searchDF: searchText}), 500, [searchText])

  return (
    <Well ref={ref} padding={'24px 0 0'} mobilePadding={'20px 0 0'}>
      <Container>
        <Wrapper justify={'space-between'} align={'center'} padding={'0 0 16px'}>
          <TitleText width={'auto'} shrink={'1'}>{translator(title || 'doctor.main.title', true)}</TitleText>
          {!hideMap && <Wrapper width={'auto'} justify={'flex-end'} align={'center'} gap={'6px'}>
            <Text color={'black50'}>На&nbsp;карте</Text>
            <Switch active={switcherOn} onClick={handleSwitch}/>
          </Wrapper>}
        </Wrapper>
        <StyledWrapper justify={'space-between'} padding={'0 0 8px'}>
          <FiltersTemplate
            onChange={handleChange}
            filters={getFilters()}
            mapFilters={switcherOn}
          />
        </StyledWrapper>
      </Container>
      <DoctorsMapCards
        isMap={switcherOn}
        doctors={switcherOn ? mapDoctors : slicedDoctors}
        offLoadScroll={offLoadScroll}
        resizeMap={resizeMap}
        coords={coords}
      />
      {!switcherOn && (
        <Container>
          {offLoadScroll && !showFull && !othersDoctors
            ? <Wrapper padding={'0 0 24px 96px'} mobilePadding={'0 0 20px 70px'} flow={'column'} justify={'flex-start'} align={'flex-start'} gap={'8px'}>
              {!showFull && <Text color={'black50'}>
                {currentDoctorsLength > 0 && `${translator('doctor.filter.show-more.title-p1', true)} ${currentDoctorsLength} ${translator('doctor.cluster-modal.doctors.plural', false, currentDoctorsLength)} из ${totalDoctors}. `}
                {`${translator('doctor.filter.show-more.title-p2', true)}`}
              </Text>}
              {!showFull && totalDoctors > 8 && <Button onClick={filtersShowMore} color={'transparent'}>{translator('doctor.filter.show-more.button', true)}</Button>}
            </Wrapper>
            : hasFilters && <ClearFilters
              text={translator('doctor.filter.clear', true)}
              onClick={clearFilters}
            />
          }
        </Container>
      )}
    </Well>
  )
})

DoctorsListComponent.propTypes = {
  title: PropTypes.string,
  limit: PropTypes.number,
  offLoadScroll: PropTypes.bool,
  resizeMap: PropTypes.bool,
  hideMap: PropTypes.bool,
}

DoctorsListComponent.default = {
  resizeMap: false,
}