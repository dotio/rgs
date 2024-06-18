import {Well} from '../../ui/well'
import {Container} from '../../ui/grid/container'
import {Wrapper} from '../../ui/wrapper'
import {TitleText} from '../../ui/title-text'
import {Text} from '../../ui/text'
import {Switch} from '../../ui/switch'
import {ClinicsMapCardsDoctors} from '../doctors/clinics-map-cards-doctors'
import React, {useEffect, useState} from 'react'
import {isMobile} from 'react-device-detect'
import {useDispatch} from 'react-redux'

export const DoctorClinics = ({title, clinics, specializations}) => {
  const [switcherOn, setSwitcher] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(switcherOn && isMobile){
      dispatch.router.toggleBottomTemplate(false)
    }
    else {
      dispatch.router.toggleBottomTemplate(true)
    }
  }, [switcherOn])

  return (
    <Well padding={'24px 0 0'} mobilePadding={'20px 0 0'}>
      <Container>
        <Wrapper justify={'space-between'} align={'flex-start'}>
          <Wrapper flow={'column'}>
            <TitleText width={'auto'} shrink={'1'} padding={switcherOn ? '0 0 24px' : ''} smPadding={switcherOn ? '0 0 16px' : ''}>{title}</TitleText>
          </Wrapper>
          <Wrapper width={'auto'} justify={'flex-end'} align={'center'} gap={'6px'}>
            <Text color={'black50'}>На&nbsp;карте</Text>
            <Switch active={switcherOn} onClick={() => setSwitcher(!switcherOn)}/>
          </Wrapper>
        </Wrapper>
      </Container>
      <ClinicsMapCardsDoctors
        isClinicMapDoctors={true}
        isMap={switcherOn}
        specializations={specializations}
        clinics={clinics}
      />
    </Well>
  )
}