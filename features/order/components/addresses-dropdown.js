import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {Icon} from '../../../ui/icon'
import {useDispatch, useSelector} from 'react-redux'
import {SelectDropdown} from '../../../ui/form/select-dropdown'
import {AddressesItem} from './addresses-item'
import {T} from '../../../utils/translation'
import {media} from '../../../helpers/media'

const AddressesBlock = styled.div`
  // border: 1px solid ${p => getColor('black20', p.theme)};
  // box-sizing: border-box;
  // border-radius: 100px;
  width: 354px;
  ${media.mobile`
    width: 100%;
  `}
`

const AddressesWrapper = styled(Wrapper)`
  margin: ${p => p.margin ? p.margin : '16px 0 20px 0'};
`

const AddAddress = styled.div`
  display: flex;
  align-items: center;
  padding: 12px;
  width: 100%;
  height: 60px;
  ${p => p.showBorder && css`
     border-top: 1px solid ${p => getColor('black10', p.theme)};   
  `}
`

const AddAddressInfo = styled.div`
  padding-left: 8px;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(147.74deg, #40B2C9 13.44%, #55DF94 85.6%);
  border-radius: 10px;
`

export const AddressesDropdown = ({addressId, errorText, onChange, margin, mobileModal}) => {
  const dispatch = useDispatch()
  const addressesList = useSelector(state => state.profileSettings.addresses)
  const isAddressChange = useSelector(state => state.profileSettings.isAddressChange)
  const [currentAddress, setCurrentAddress] = useState({})

  useEffect(() => {
    if(addressesList.length === 0) {
      return
    }
    const selected = addressId ? addressesList.find(address => address.id === addressId) : addressesList[0]
    !addressId && onChange(selected.id)
    setCurrentAddress(selected)
  }, [])

  useEffect(() => {
    if(!addressId && !isAddressChange) {
      return
    }
    const id = isAddressChange || addressId
    const selected = addressesList.find(address => address.id === id)
    isAddressChange && onChange(id)
    setCurrentAddress(selected)
  }, [addressId, isAddressChange])

  const renderSelected = () => {
    if((addressesList && addressesList.length === 0) || Object.keys(currentAddress).length === 0 || !currentAddress.id) {
      return null
    }

    return <AddressesItem id={currentAddress.id} title={currentAddress.name} street={currentAddress.address}/>
  }

  const onAddressClick = async (addressId) => {
    if (mobileModal) {
      dispatch.modal.deleteTargetModal(mobileModal)
    }
    await dispatch.profileSettings.setAddressChange('')
    onChange(addressId)
  }

  const renderItems = (isListOpen) => {
    return addressesList.filter(address => !isListOpen || address.id !== currentAddress.id).map((address, index) => {
      return <AddressesItem id={address.id} title={address.name} street={address.address} onClick={() => onAddressClick(address.id)} key={index} bordered />
    })
  }

  const renderAdd = () => {
    return <AddAddress key={'add-address'} onClick={() => dispatch.modal.addAndShowModal({type: 'add-change-address', isDropDown: true})} showBorder={addressesList.length !== 0}>
      <Wrapper align={'center'}>
        <IconBox>
          <Icon type={'big_plus'} width={20} height={20}/>
        </IconBox>
        <AddAddressInfo>
          <Text breakWord size={'16px'} lineHeight={'24px'} color={'primary'}>
            <T ucFirst>order.addresses-dropdown.title</T>
          </Text>
        </AddAddressInfo>
      </Wrapper>
    </AddAddress>
  }

  return (
    <AddressesWrapper flow={'column'} margin={margin}>
      <AddressesBlock>
        <SelectDropdown renderSelected={renderSelected} renderItems={renderItems} renderAdd={renderAdd} mobileModal={mobileModal}/>
      </AddressesBlock>
      {errorText && (
        <Text color={'red'}>{errorText}</Text>
      )}
    </AddressesWrapper>
  )
}