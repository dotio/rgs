import React, {useState} from 'react'
import styled from 'styled-components'
import {Popover} from '../../../ui/popover'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Link} from '../../../routes'
import {Button} from '../../../ui/button'
import {media} from '../../../helpers/media'

const RelativeWrapper = styled.div`
  position: relative;
  width: auto;
`

const OrderPopover = styled(Popover)`
  ${media.mobile`
    display: none;
  `}
`

export const DoctorOrderTooltip = ({children, show, title, description, linkTitle, typeId}) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <RelativeWrapper
      onMouseEnter={() => !isOpen && setOpen(true)}
      onMouseLeave={() => isOpen && setOpen(false)}
    >
      {show && isOpen && <OrderPopover type={'top'} bottom={'36px'} left={'-60px'} isOpen={isOpen} width={'320px'}>
        <Wrapper flow={'column'} justify={'space-between'} padding={'12px'} gap={'8px'}>
          <Wrapper flow={'column'} gap={'12px'}>
            <Text color={'white'}>
              {title}
            </Text>
            <Text color={'black50'}>
              {description}
            </Text>
          </Wrapper>
          <Link href={`/doctors?servicesTypesIdsDF=${typeId}`} passHref>
            <Button>
              {linkTitle}
            </Button>
          </Link>
        </Wrapper>
      </OrderPopover>}
      {children}
    </RelativeWrapper>
  )
}