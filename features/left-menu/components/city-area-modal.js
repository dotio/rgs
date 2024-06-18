import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {getColor} from '../../../ui/helpers/getColor'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'
import {Divider} from '../../../ui/divider'
import {getTranslator} from '../../../utils/translation'
import {SearchInput} from '../../../ui/search-input'
import {media} from '../../../helpers/media'

const ContentWrapper = styled.div`
  height: calc(100vh - 48px);
`

const StyledWrapper = styled(Wrapper)`
  height: 100%;
`

const Option = styled(TitleText)`
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    color: ${p => getColor('primary', p.theme)};
  }
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`
const StyledSearchInput = styled(SearchInput)`
  cursor: pointer;
`
const ScrollContainer = styled.div`
  margin-top: 24px;
  height: calc(100% - 280px);
  overflow-y: auto;
  ${media.mobile`
    height: calc(100% - 225px);
    margin-top: 16px;
  `}
  }
`
const InnerContainer = styled(Container)`
  padding-left: 8px;
  ${media.mobile`
    padding-left: 19px;
  `}
`

export const CityAreaModal = () => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const city = useSelector(state => state.user.city.name)
  const cities = useSelector(state => state.dictionary.cities)
  const [searchText, setSearchText] = useState('')
  const visibleOptions = cities.filter(({name}) => name.toUpperCase().includes(searchText.toUpperCase()))

  const onOptionClick = (id) => {
    dispatch.user.updateCity(id)
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate icon={'cross'}>
      <ContentWrapper>
        <Container>
          <Wrapper flow={'column'} gap={'8px'}>
            <TitleText>{translator('user.city.title', true)}</TitleText>
            <TitleText color={'primary'}>{city}</TitleText>
          </Wrapper>
        </Container>
        <Divider margin={'24px 0'} smMargin={'20px 0'}/>
        <Container>
          <StyledWrapper flow={'column'} gap={'24px'} mobileGap={'16px'}>
            <TitleText>{translator('user.change-city.title', true)}</TitleText>
            <StyledSearchInput
              width={'100%'}
              placeholder={translator('search.menu.example.city', true)}
              bgColor={'black10'}
              value={searchText}
              big
              mobileSmall
              onChange={(e) => setSearchText(e.target.value)}
            />
          </StyledWrapper>
        </Container>
        <ScrollContainer>
          <InnerContainer>
            {visibleOptions.length > 0 && (
              <Wrapper flow={'column'} gap={'24px'} mobileGap={'16px'}>
                {visibleOptions.map(({id, name}) => (
                  <Option
                    key={id}
                    onClick={() => onOptionClick(id)}
                  >
                    {name}
                  </Option>
                ))}
              </Wrapper>
            )}
          </InnerContainer>
        </ScrollContainer>
      </ContentWrapper>
    </ModalTemplate>
  )
}