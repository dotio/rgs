import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Gap} from '../../../ui/gap'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {Button} from '../../../ui/button'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'
import {Icon} from '../../../ui/icon'

const AddressWrapper = styled(Wrapper)` 
  width: 100%;
  padding: 16px;
  border: 1px solid ${p => getColor('black10', p.theme)};
  border-radius: 16px;
`

const TitleName = styled(Text)`
  ${media.mobile`
    width: 230px;
  `}
`

const NameBox = styled.div`
  display: flex;
  ${media.mobile`
    flex-direction: column;
  `}
`

const ButtonsBox = styled(Gap)`
  display: flex;
  padding-top: 12px;
`

const IconWrapper = styled(Wrapper)`
  border-radius: 50%;
  background: ${p => getColor(p.color, p.theme)};
  height: 36px;
  flex-shrink: 0;
`

export const Address = ({id, name, city, country, address, onClick}) => (
  <AddressWrapper padding={'16px'} justify={'space-between'} align={'flex-start'}>
    <Wrapper flow={'column'} justify={'flex-start'} align={'flex-start'}>
      <NameBox>
        <Text width={'auto'} smSize={'16px'} smLineHeight={'24px'} padding={'0 6px 0 0'} size={'20px'} lineHeight={'24px'}>{name}</Text>
        <TitleName width={'auto'} smSize={'16px'} smLineHeight={'24px'} size={'20px'} lineHeight={'24px'} color={'black50'}>{`${country}, ${city}, ${address}`}</TitleName>
      </NameBox>
      <ButtonsBox direction={'left'} gap={'8px'}>
        <Button color={'black05'} onClick={() => onClick(id, name)}><T ucFirst>profile.addresses.change</T></Button>
      </ButtonsBox>
    </Wrapper>
    <IconWrapper align={'center'} justify={'center'} width={'36px'} color={name === 'Дом' ? 'secondary' : name === 'Работа' ? 'secondary' : 'primary'}>
      <Icon color={'white'} width={24} height={24} shrink={'0'} type={name === 'Дом' ? 'home_simple' : (name === 'Работа' ? 'work' : 'location_settings_addresses')}/>
    </IconWrapper>
  </AddressWrapper>
)

Address.propTypes = {
  id: PropTypes.number,
  iconUrl: PropTypes.string,
  name: PropTypes.string,
  city: PropTypes.string,
  address: PropTypes.string,
  onClick: PropTypes.func,
}
