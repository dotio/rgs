import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {Button} from '../../../ui/button'
import {Wrapper} from '../../../ui/wrapper'
import {Address} from '../components/address'
import {Well} from '../../../ui/well'
import {Gap} from '../../../ui/gap'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {T} from '../../../utils/translation'
import {MediumText} from '../../../ui/medium-text'

const AddressLink = styled.span`
  color: ${p => getColor('primary', p.theme)};
  cursor: pointer;
`

export const Addresses = () => {
  const dispatch = useDispatch()

  const addresses = useSelector(state => state.profileSettings.addresses)

  const addChangeAddressHandle = (address, name, typeId) => dispatch.modal.addAndShowModal({
    type: 'add-change-address',
    backUrl: '/profile/settings',
    data: {
      preSelectedName: name,
      address,
      typeId,
      addressImage: {
        home: 'home_simple',
        work: 'work',
        other: 'location_settings_addresses'
      }
    }
  })

  return (
    <Well>
      <Container>
        <Gap gap={'16px'}>
          <TitleText><T ucFirst>settings.addresses.title</T></TitleText>
          {addresses.length > 0
            ? <Wrapper flow={'column'} gap={'16px'}>
              {addresses.map((address) => <Address key={address.id} {...address} onClick={addChangeAddressHandle} />)}
            </Wrapper>
            : <MediumText color={'black50'}>
              <T ucFirst>settings.addresses.add.title</T> <AddressLink onClick={() => addChangeAddressHandle(null, 'Дом', 1)}><T>settings.addresses.title.home</T></AddressLink> <T>settings.addresses.title.or</T>
              <AddressLink onClick={() => addChangeAddressHandle(null, 'Работа', 2)}> <T>settings.addresses.title.work</T></AddressLink> <T>settings.addresses.title.continue</T>
            </MediumText>
          }
          <Wrapper justify={'center'} padding={'8px 0 0'}>
            <Button color={'black05'} onClick={() => addChangeAddressHandle()}>
              <T ucFirst>settings.addresses.add-new.button</T>
            </Button>
          </Wrapper>
        </Gap>
      </Container>
    </Well>
  )
}

Addresses.propTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    iconUrl: PropTypes.string,
    name: PropTypes.string,
    city: PropTypes.string,
    address: PropTypes.string,
    floor: PropTypes.string,
    entrance: PropTypes.string,
    flat: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    intercomeCode: PropTypes.string,
    comment: PropTypes.string
  }))
}
