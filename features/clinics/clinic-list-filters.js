import React, {useState, useEffect, useRef} from 'react'
import {Container} from '../../ui/grid/container'
import {Text} from '../../ui/text'
import {TitleText} from '../../ui/title-text'
import {Well} from '../../ui/well'
import {useDispatch, useSelector} from 'react-redux'
import {useDebouncedEffect} from '../../helpers/debounce'
import {FiltersTemplate} from '../../templates/filters'
import {ClearFilters} from '../../templates/filters/clear'
import {ClinicsMapCards} from './clinics-map-cards'
import {getTranslator} from '../../utils/translation'
import {Switch} from '../../ui/switch'
import {Wrapper} from '../../ui/wrapper'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {isMobile} from 'react-device-detect'

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    overflow-x: auto;
  `}
`

export const ClinicsListFilter = ({title, offLoadScroll, resizeMap, coords, showMap = false}) => {
  const dispatch = useDispatch()
  const clinics = useSelector(state => state.clinics.list)
  const mapClinics = useSelector(state => state.clinics.mapList)
  const filters = useSelector(state => state.clinics.filters)
  const [switcherOn, setSwitcher] = useState(false)
  const [searchText, setSearchText] = useState(filters.searchCF)
  const translator = useSelector(state => getTranslator(state.localization))
  const switchRef = useRef(null)

  const getFilters = () => {
    return [
      {
        type: 'search',
        key: 'searchCF',
        value: searchText,
        placeholder: translator('clinic.main.search.placeholder', true),
        options: {hideMobile: true, mobileFull: true},
      },
      {
        type: 'cities',
        key: 'cityIdCF',
        value:  filters.cityIdCF,
      },
      {
        type: 'metro',
        key: 'metroStationsIdsCF',
        value: filters.metroStationsIdsCF,
      },
      // {
      //   type: 'checkerFilter',
      //   key: 'childOnly',
      //   value: filters.childOnly,
      //   title: 'Детская клиника',
      //   subTitle: 'Детская клиника',
      //   text: 'Включите фильтр, если ищите клинику для ребёнка.'
      // },
      {
        type: 'appointmentType',
        key: 'serviceIdCF',
        value: filters.serviceIdCF
      },
      {
        type: 'specializations',
        key: 'specializationIdCF',
        value:  filters.specializationIdCF,
      },
      {
        type: 'checkerFilter',
        key: 'onlyRatedCF',
        value: filters.onlyRatedCF,
        title: translator('doctor.filter.rating', true),
        subTitle: translator('doctor.filter.rating.subtitle', true),
        text: translator('doctor.filter.rating.content', true)
      },
      {
        type: 'otherFilters',
        value: [
          'onlyFavoriteCF',
        ]
      },
    ]
  }

  const handleChange = (field, value) => {
    if(field === 'searchCF') {
      setSearchText(value)
      return
    }

    dispatch.clinics.updateFilters({
      [field]: value
    })
  }

  const clearFilters = async () => {
    await dispatch.clinics.clearFiltersRequest()
    setSearchText('')
  }

  const handleSwitch = async () => {
    dispatch.loaders.showLoader()
    const switcherValue = !switcherOn

    await dispatch.clinics.setForMap(switcherValue)
    await dispatch.clinics.fetchClinics({filters})
    setSwitcher(switcherValue)
    dispatch.loaders.hideLoader()
  }

  useEffect(() => {
    if(showMap && !switcherOn) {
      switchRef.current.click()
    }
  }, [showMap])


  useEffect(() => {
    if(switcherOn && isMobile){
      dispatch.router.toggleBottomTemplate(false)
    }
    else {
      dispatch.router.toggleBottomTemplate(true)
    }
  }, [switcherOn])


  useDebouncedEffect(() => dispatch.clinics.updateFilters({searchCF: searchText}), 500, [searchText])

  return (
    <Well padding={'24px 0 0'} mobilePadding={'20px 0 0'}>
      <Container>
        <Wrapper justify={'space-between'} align={'center'} padding={'0 0 16px'}>
          <TitleText width={'auto'} shrink={'1'}>{title}</TitleText>
          <Wrapper width={'auto'} justify={'flex-end'} align={'center'} gap={'6px'}>
            <Text color={'black50'}>На&nbsp;карте</Text>
            <Switch active={switcherOn} onClick={handleSwitch} forwardRef={switchRef} />
          </Wrapper>
        </Wrapper>
        <StyledWrapper padding={'0 0 16px'} mobilePadding={'0 0 8px'} >
          <FiltersTemplate filters={getFilters()} onChange={handleChange} />
        </StyledWrapper>
      </Container>
      <ClinicsMapCards
        isMap={switcherOn}
        clinics={switcherOn ? mapClinics : clinics}
        offLoadScroll={offLoadScroll}
        resizeMap={resizeMap}
        coords={coords}
      />
      {!switcherOn && (
        <Container>
          <ClearFilters
            text={translator('clinic.main.search.clear', true)}
            onClick={clearFilters}
          />
        </Container>
      )}
    </Well>
  )
}

ClinicsListFilter.default = {
  resizeMap: false,
}