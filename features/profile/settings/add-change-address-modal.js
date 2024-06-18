import React, {useState, useRef, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../../templates/modal'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'
import {Text} from '../../../ui/text'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {Input} from '../../../ui/form/input'
import {Map, YMaps} from 'react-yandex-maps'
import {ModalSaveButton} from '../components/modal-save-button'
import {getConfig} from '../../../helpers/config'
import {getTranslator} from '../../../utils/translation'
import {AddressesRepository} from '../repository/addresses'
import {AsyncAutocomplete} from '../../../ui/form/async-autocomplete'
import {Icon} from '../../../ui/icon'
import {Button} from '../../../ui/button'
import {asyncModal} from '../../../helpers/hocs/asyncModal'

const MapCenterBalloon = styled(Wrapper)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 36px;
  height: 36px;
  margin-top: -36px;
  margin-left: -12px;
  background: ${p => getColor(p.color, p.theme)};
  border-radius: 50%;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
`

const MapWrapper = styled(Wrapper)`
  position: relative;
  border-radius: 20px;
  margin: 0 0 16px;
   ${media.mobile`
    margin: 0 0 20px;
    height: 200px;
  `}
`

const StyledMap = styled(Map)`
  width: ${p => p.width};
  height: ${p => p.height};
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  border-radius: 20px;
   ${media.mobile`
      width: 100%;
      height: 200px;
  `}
`

const AddressLink = styled.span`
  color: ${p => getColor('primary', p.theme)};
  cursor: pointer;
`

const FieldsWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-direction: column;
  `}
`

const ButtonsWrapper = styled(Wrapper)`
  position: relative;
  max-width: 720px;
`

const ModalDelButton = styled(Button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  ${media.mobile`
    position: fixed;
    left: 50%;
    margin-left: 302px;
    bottom: 20px;
    
    @media (max-width: 732px) {
      left: auto;
      right: 16px;
    }
  `}
`

const AddChangeAddressModalComp = ({current}) => {
  const data = current.data || {}
  const {preSelectedName, typeId: typeIdImg, address: addressId} = data
  const currentAddress = useSelector(state => state.profileSettings.addresses.find(({id}) => id === addressId))
  const userCity = useSelector(state => state.user.city.name)
  const {address, typeId, flat, entrance, intercomCode, floor, name, comment, latitude, longitude} = currentAddress || ''
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const [ymaps, setYmaps] = useState(null)
  const [form, setForm] = useState({
    address,
    typeId: typeIdImg || typeId,
    flat,
    entrance,
    intercomCode,
    floor,
    name: preSelectedName || name,
    comment,
    latitude,
    longitude
  })
  const mapRef = useRef(null)
  const saveButtonDisabled = () => {
    return form.address === ''
      || !form.latitude || form.latitude === ''
      || !form.longitude || form.longitude === ''
  }

  const onSubmit = async () => {
    const result = currentAddress ? await dispatch.profileSettings.updateAddress({id: currentAddress.id, address: form}) : await dispatch.profileSettings.createAddress(form)
    result && current.isDropDown && dispatch.profileSettings.setAddressChange(result.id)
    result && dispatch.modal.deleteModal()
  }

  const onDragEnd = (e) => {
    const coords = e.originalEvent.map.getCenter()

    ymaps && ymaps.geolocation
      .get({provider: 'yandex', mapStateAutoApply: true})
      .then(() => {
        ymaps.geocode(coords).then(res => {
          const geoObject = res.geoObjects.get(0)
          const city = geoObject.getLocalities().length ? geoObject.getLocalities() : geoObject.getAdministrativeAreas()
          const street = geoObject.getThoroughfare()
          const house = geoObject.getPremiseNumber()

          const coordinates = geoObject.geometry._coordinates

          setForm({
            ...form,
            address: [city, street, house].join(', '),
            latitude: coordinates[0],
            longitude: coordinates[1]
          })
        })
      })
      .catch(() => {
        if (coords && coords.length === 2) {
          setForm({
            ...form,
            latitude: coords[0],
            longitude: coords[1]
          })
        }
      })
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  const handleApiAvailable = ymaps => setYmaps(ymaps)

  const searchAddress = async (address) => {
    const addresses = await AddressesRepository.search({searchText: address})
    return addresses.map((address, i) => ({id: i, title: address.name, value: address}))
  }

  const handleAddressChange = (address) => {
    handleChange('address', address.name)
    mapRef.current && mapRef.current.setCenter([address.point.latitude, address.point.longitude])
  }

  const center = latitude && longitude ? [+latitude, +longitude] : [55.75, 37.57]

  const handleDeleteAddress = async id => {
    await dispatch.profileSettings.deleteAddress(id)
    await dispatch.modal.deleteAllModals()
  }

  const addCityFromLoad = async () => {
    const result = await searchAddress(userCity)
    result.length > 0 && handleAddressChange(result[0].value)
  }

  useEffect(() => {
    addCityFromLoad()
  }, [])

  return (
    <ModalTemplate>
      <Container>
        <Wrapper padding={'0 0 24px'} mobilePadding={'0 0 16px'}>
          <TitleText>{currentAddress ? translator('settings.add-address.title-edit', true) : translator('settings.add-address.title-new', true)}</TitleText>
        </Wrapper>
      </Container>
      <Container>
        <Row>
          <Col lg={{cols: 12}}>
            <MapWrapper>
              <YMaps
                query={{
                  coordorder: 'latlong',
                  apikey: getConfig().publicRuntimeConfig.YANDEX_API_KEY
                }}
              >
                <StyledMap
                  defaultState={{center: center, zoom: 15}}
                  width={'100%'}
                  height={'240px'}
                  onActionEnd={onDragEnd}
                  modules={['geolocation', 'geocode']}
                  onLoad={handleApiAvailable}
                  instanceRef={mapRef}
                >
                </StyledMap>
              </YMaps>
              <MapCenterBalloon color={form.typeId > 0 ? 'secondary' : 'primary'} align={'center'} justify={'center'}>
                <Icon type={form.typeId === 1 ? 'home_simple' : form.typeId === 2 ? 'work' : 'location_settings_addresses'}
                  color={'white'}
                  width={24}
                  height={24}
                />
              </MapCenterBalloon>
            </MapWrapper>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            <LabeledBox text={translator('settings.add-address.title.address', true)} margin={'0 0 20px'}>
              <AsyncAutocomplete
                value={form.address}
                wide
                placeholder={translator('settings.add-address.title.address-placeholder', true)}
                onChange={handleAddressChange}
                search={searchAddress}
              />
            </LabeledBox>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={{cols: 8}} sm={{cols: 8}}>
            <FieldsWrapper direction={'left'}>
              <Wrapper gap={'12px'} margin={'0 12px 0 0'}>
                <LabeledBox text={translator('settings.add-address.title.flat', true)} margin={'0 0 20px'}>
                  <Input
                    value={form.flat}
                    wide
                    size={'16px'}
                    borderRadius={'100px'}
                    borderSize={'1px'}
                    borderColor={'black20'}
                    padding={'5px 11px'}
                    onChange={(e) => handleChange('flat', e.currentTarget.value)}
                  />
                </LabeledBox>
                <LabeledBox text={translator('settings.add-address.title.entrance', true)} margin={'0 0 20px'}>
                  <Input
                    value={form.entrance}
                    wide
                    size={'16px'}
                    borderRadius={'100px'}
                    borderSize={'1px'}
                    borderColor={'black20'}
                    padding={'5px 11px'}
                    onChange={(e) => handleChange('entrance', e.currentTarget.value)}
                  />
                </LabeledBox>
              </Wrapper>
              <Wrapper gap={'12px'}>
                <LabeledBox text={translator('settings.add-address.title.intercom', true)} margin={'0 0 20px'}>
                  <Input
                    value={form.intercomCode}
                    wide
                    size={'16px'}
                    borderRadius={'100px'}
                    borderSize={'1px'}
                    borderColor={'black20'}
                    padding={'5px 11px'}
                    onChange={(e) => handleChange('intercomCode', e.currentTarget.value)}
                  />
                </LabeledBox>
                <LabeledBox text={translator('settings.add-address.title.floor', true)} margin={'0 0 20px'}>
                  <Input
                    value={form.floor}
                    wide
                    size={'16px'}
                    borderRadius={'100px'}
                    borderSize={'1px'}
                    borderColor={'black20'}
                    padding={'5px 11px'}
                    onChange={(e) => handleChange('floor', e.currentTarget.value)}
                  />
                </LabeledBox>
              </Wrapper>
            </FieldsWrapper>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            <LabeledBox text={translator('settings.add-address.title.name', true)} margin={'0 0 6px'}>
              <Input
                value={form.name}
                wide
                size={'16px'}
                borderRadius={'100px'}
                borderSize={'1px'}
                borderColor={'black20'}
                padding={'5px 11px'}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
              />
            </LabeledBox>
            <Text color={'black50'} padding={'0 0 20px'}>
              {translator('settings.add-address.example.title', true)} <AddressLink onClick={() => setForm({...form, name: 'Дом', typeId: 1})}>
                {translator('settings.add-address.example.title-home', true)} </AddressLink> {translator('settings.add-address.example.title-or', true)} <AddressLink onClick={() => setForm({...form, name: 'Работа', typeId: 2})}>
                {translator('settings.add-address.example.title-work', true)}</AddressLink>
            </Text>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg={{cols: 8, paddingBottom: '20px'}} sm={{cols: 12}}>
            <LabeledBox text={translator('settings.add-address.title.comment', true)}>
              <Input
                value={form.comment}
                wide
                size={'16px'}
                borderRadius={'100px'}
                borderSize={'1px'}
                borderColor={'black20'}
                padding={'5px 11px'}
                onChange={(e) => handleChange('comment', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
      </Container>
      <Container>
        <ButtonsWrapper mobilePadding={'0 0 48px'} justify={'space-between'}>
          <ModalSaveButton
            mobileFixed
            color={'primary'}
            onClick={onSubmit}
            disabled={saveButtonDisabled()}>
            {translator('settings.add-address.save.button', true)}
          </ModalSaveButton>
          {currentAddress && <ModalDelButton
            onClick={() => handleDeleteAddress(addressId)}
            color={'black05'}>
            <Icon type={'delete_trash'} color={'dangerousRed'} width={24} height={24}/>
          </ModalDelButton>}
        </ButtonsWrapper>
      </Container>
    </ModalTemplate>
  )
}

export const AddChangeAddressModal = asyncModal(
  AddChangeAddressModalComp,
  ({current}) => {
    return current
  }
)
