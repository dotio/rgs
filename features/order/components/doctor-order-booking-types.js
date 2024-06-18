import React, {useEffect,useState} from 'react'
import {DoctorOrderTooltip} from './doctor-order-tooltip'
import {FormButton} from '../../../ui/buttons/form-button'
import {requestApi} from '../../../lib/api'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'

const mapOrderTypeTitle = (type) => {
  if (type.id === 3)
    return 'В клинике'
  else
    return type.title
}

const reduceSortDictionary = (types, doctorsTypes) => types.reduce((total, current) => {
  const doctorType = doctorsTypes.find(({id}) => id === current.id)

  return !doctorType ? [...total, current] : [current, ...total]
}, [])


const BookingTypesWrapper = styled(Wrapper)`
  display: flex;
  
  ${media.mobile`
    overflow-x: auto;
    width: calc(100% + 16px);
    margin-left: -16px;
    margin-right: -16px;
    padding: 0 16px 12px
  `}
`

const notAvailableDescriptions = [
  {
    id: 1,
    title: 'order.doctor.not-available.online.title',
    subtitle: 'order.doctor.not-available.online.subtitle',
    buttonTitle: 'order.doctor.not-available.online.button-title'
  },
  {
    id: 2,
    title: 'order.doctor.not-available.home.title',
    subtitle: 'order.doctor.not-available.home.subtitle',
    buttonTitle: 'order.doctor.not-available.home.button-title'
  },
  {
    id: 3,
    title: 'order.doctor.not-available.clinic.title',
    subtitle: 'order.doctor.not-available.clinic.subtitle',
    buttonTitle: 'order.doctor.not-available.clinic.button-title'
  }
]

export const DoctorOrderBookingTypes = ({orderType, onClickType}) => {
  const translator = useSelector(state => getTranslator(state.localization))

  const doctor = useSelector((state) => state.doctors.currentDoctor)
  const orderTypes = doctor.orderTypes
  const dictionaryOrderTypes = reduceSortDictionary(useSelector((state) => state.dictionary['order-types']), orderTypes)
  const [totalOrderTypes, setTotalOrderTypes] = useState([])

  const fetchTotalDoctors = async (types) => {
    const data = await Promise.all(types.map(({id}) => (
      requestApi('get', '/doctor', {filters: {servicesTypesIds: [id], limit: 1}})
    )))

    setTotalOrderTypes(types.map((type, index) => (
      {...type, total: data[index].total, ...notAvailableDescriptions.find(item => item.id === type.id)}
    )))
  }

  useEffect(() => {
    const doctorsTypesIds = orderTypes.map(({id}) => id)
    const doctorNotAvailableTypes = dictionaryOrderTypes.filter((dictionaryType) => !doctorsTypesIds.includes(dictionaryType.id))

    fetchTotalDoctors(doctorNotAvailableTypes)
  }, [orderTypes])

  return (
    <BookingTypesWrapper>
      {totalOrderTypes && dictionaryOrderTypes.map((dictionaryType, index) => {
        const doctorType = orderTypes.find(({id}) => id === dictionaryType.id)
        const doctorNotAvailableType = totalOrderTypes.find(({id}) => id === dictionaryType.id)
        const linkTitle = doctorNotAvailableType ? `${doctorNotAvailableType.total} ${translator('doctor.cluster-modal.doctors.plural', false, doctorNotAvailableType.total)}, ${translator(doctorNotAvailableType.buttonTitle)}`: ''

        return (
          <DoctorOrderTooltip
            show={!doctorType}
            title={doctorNotAvailableType ? translator(doctorNotAvailableType.title) : ''}
            description={doctorNotAvailableType ? translator(doctorNotAvailableType.subtitle) : ''}
            linkTitle={linkTitle}
            key={'button-' + index}
            typeId={doctorNotAvailableType ? doctorNotAvailableType.id : ''}
          >
            <FormButton
              key={index}
              margin={'0 10px 0 0'}
              disabled={!doctorType}
              selected={doctorType && orderType === doctorType.code}
              onClick={() => onClickType(doctorType && doctorType.code)}
            >
              {translator(mapOrderTypeTitle(dictionaryType))}
            </FormButton>
          </DoctorOrderTooltip>
        )
      })}
    </BookingTypesWrapper>
  )
}