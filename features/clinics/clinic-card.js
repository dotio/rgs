import React, {useMemo} from 'react'
import {Text} from '../../ui/text'
import styled from 'styled-components'
import {ListItem} from '../../ui/list-item'
import {Wrapper} from '../../ui/wrapper'
import {Icon} from '../../ui/icon'
import {media} from '../../helpers/media'
import {Rating} from '../../ui/rating'
import {Circle} from '../../ui/circle'
import {useRouter} from 'next/dist/client/router'
import Qs from 'qs'
import {omit} from 'ramda'
import {getRandomIntInclusive} from '../../ui/helpers/getRandomIntInclusive'

const ContentInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.mobile`
    flex-direction: column;
  `}
`

const ClinicInfo = styled.div`
  padding-right: 36px;
  width: calc(100% - 140px);
  
  ${media.mobile`
    padding-bottom: 4px;
    padding-right: 0;
    width: 100%;
  `}
`

const StyledCircle = styled(Circle)`
  position: absolute;
  right: 0;
  top: 0;
`
export const ClinicCard = ({id, logo, isFavorite, name, address, metro, rating, withRating, withBottomPadding, withHover, withoutLastBorder, withBorder, ...props}) => {
  const router = useRouter()
  const imgIcon = isFavorite ? (
    <StyledCircle color={'starred'} size={24}>
      <Icon type={'star'} color={'white'} width={16} height={16}/>
    </StyledCircle>
  ) : null

  const stringParams = Qs.stringify(omit(['clinicsIds', 'searchCF'], router.query))
  const href = `/clinic/${id}${stringParams ? `?${stringParams}` : ''}`
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])

  return (
    <ListItem
      href={withHover ? href : null}
      src={logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`}
      imgBorderRadius={'16px'}
      imgIcon={imgIcon}
      withBorder={withBorder}
      withBottomPadding={withBottomPadding}
      withoutLastBorder={withoutLastBorder}
      smPadding={'0 16px'}
      borderRadius={'16px'}
      {...props}
    >
      <ContentInfoWrapper>
        <ClinicInfo>
          <Text breakWord size={'16px'} lineHeight={'24px'}>{name}</Text>
          <Text breakWord color={'black50'}>{address}</Text>
          {metro && metro.map(item => <Text key={item.id} breakWord color={'black50'}>{`м. ${item.name}`}</Text>)}
        </ClinicInfo>
        {withRating && rating && <Wrapper justify={'flex-start'} width={'auto'} direction={'left'} gap={'10px'}>
          <Rating number={parseFloat(rating)} color={'primary'} />
        </Wrapper>}
      </ContentInfoWrapper>
    </ListItem>
  )
}


ClinicCard.defaultProps = {
  withRating: true,
  withHover: true,
  withBorder: true,
  withoutLastBorder: false,
  withBottomPadding: true,
}