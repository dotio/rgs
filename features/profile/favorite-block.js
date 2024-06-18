import React, {useState} from 'react'
import styled  from 'styled-components'
import {Well} from '../../ui/well'
import {Container} from '../../ui/grid/container'
import {FavoriteDoctor} from './main/favorite/favorite-doctor'
import {FavoriteClinic} from './main/favorite/favorite-clinic'
import {Button} from '../../ui/button'
import {Wrapper} from '../../ui/wrapper'
import {T} from '../../utils/translation'
import {TitleText} from '../../ui/title-text'

const FavoriteBox = styled.div`
  position: relative;
  width: calc(100% + 32px);
  margin-left: -16px;
  margin-right: -16px;
`
export const FavoriteBlock = ({items, type, title}) => {
  const [showFull, setShowFull] = useState(!(items.length > 3))
  const FavoriteComponent = type === 'doctor' ? FavoriteDoctor : FavoriteClinic
  const visibleItems = showFull ? items : items.slice(0, 3)

  return (
    <Well padding={'24px 0 8px'} mobilePadding={'20px 0 4px'}>
      <Container>
        <TitleText padding={'0 0 8px'} smPadding={'0'}>{title}</TitleText>
        <FavoriteBox>
          {visibleItems.map(item => (
            <FavoriteComponent key={item.id} {...item} />
          ))}
        </FavoriteBox>
        {!showFull && <Wrapper justify={'center'} padding={'8px 0 16px'} mobilePadding={'4px 0 16px'}>
          <Button onClick={() => setShowFull(true)} color={'black05'}><T ucFirst>profile.product.favorite.title</T></Button>
        </Wrapper>}
      </Container>
    </Well>
  )
}