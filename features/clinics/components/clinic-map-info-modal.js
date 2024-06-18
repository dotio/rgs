import {ModalTemplate} from '../../../templates/modal'
import React, {useMemo} from 'react'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Divider} from '../../../ui/divider'
import {asyncModal} from '../../../helpers/hocs/asyncModal'
import {ClinicsRepository} from '../repository'
import {media} from '../../../helpers/media'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {Avatar} from '../../../ui/avatar'

const ContentBlock = styled(Wrapper)`
  ${media.mobile`
    max-width: 303px;
    flex-direction: column;
  `}
`

const RatingText = styled(Text)`
  ${media.mobile`
    text-align: left;
    padding: 4px 0 0 75px;
  `}
`

// TODO не согласовано все пока
export const ClinicInfoMapModalComp = ({data}) => {
  const {id, logo, name, address, metro, rating} = data

  const memoizedRandom = useMemo(() => getRandomIntInclusive(1, 5), [id])

  return (
    <ModalTemplate>
      <Container>
        <Divider margin={'24px 0'} />
        <ContentBlock justify={'space-between'}>
          <Wrapper>
            <Avatar
              src={logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`}
              height={'80px'}
              minHeight={'80px'}
              width={'80px'}
              borderRadius={'16px'}
              fromList
            />
            <Wrapper padding={'0 0 0 16px'} flow={'column'}>
              {name && <Text>{name}</Text>}
              {address && <Text color={'black50'}>{address}</Text>}
              {metro && metro.map(item => <Text key={item.id} color={item.color}>{`м. ${item.name}`}</Text>)}
            </Wrapper>
          </Wrapper>
          {rating && (
            <RatingText
              size={'24px'}
              lineHeight={'28px'}
              color={'primary'}
              align={'right'}
              width={'auto'}
              decoration={'underline'}
            >
              {rating}
            </RatingText>
          )}
        </ContentBlock>
      </Container>
    </ModalTemplate>
  )
}

export const ClinicInfoMapModal = asyncModal(ClinicInfoMapModalComp, ({current}) => {
  return ClinicsRepository.getClinic(current.data.id)
})