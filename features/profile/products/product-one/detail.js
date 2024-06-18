import React from 'react'
import {useDispatch} from 'react-redux'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Col} from '../../../../ui/grid/col'
import {Row} from '../../../../ui/grid/row'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {Button} from '../../../../ui/button'
import {Wrapper} from '../../../../ui/wrapper'
import {Icon} from '../../../../ui/icon'
import styled from 'styled-components'
import {T} from '../../../../utils/translation'
import {media} from '../../../../helpers/media'

const BoxWrapper = styled(Wrapper)`
  height: 100%;
`

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-direction: row;
    padding : 0 4px 0 16px;
    flex-wrap: nowrap;
    overflow-x: auto;
    align-items: stretch;
  `}
`

const StyledWell = styled(Well)`
  ${media.mobile`
    min-width: 320px;
    min-height: 448px;
    margin-right: 12px;
  `}
`

const StyledContainer = styled(Container)`
  ${media.mobile`
    height: 100%;
  `}
`

const ImageContainer = styled.div`
  height: 372px;
  background-image: url(${p => p.img});
  background-size: contain;
  background-repeat: no-repeat;

  ${media.mobile`
    height: 155px;
    margin-bottom: 12px;
    background-position: center center;
  `}
`

const StyledRow = styled(Row)`
  ${media.mobile`
    height: 100%;
  `}
`

const StyledCol = styled(Col)`
  ${media.mobile`
    height: calc(100% - (155px + 12px));
  `}
`

export const ProductDetail = () => {
  const dispatch = useDispatch()
  const medicalAdviserHandle = () => dispatch.modal.addAndShowModal({type: 'product-medical-adviser-modal'})
  const telemedicineHandle = () => dispatch.modal.addAndShowModal({type: 'product-telemedicine-modal'})
  const addMedcardHandle = () => dispatch.modal.addAndShowModal({type: 'product-second-medical-opinion-modal'})

  return (
    <StyledWrapper flow={'column'} gap={'6px'} mobileGap={'0'}>
      <StyledWell color={'lightenGreen'}>
        <StyledContainer>
          <StyledRow>
            <StyledCol lg={{cols: 6}} sm={{cols: 12, order: 2}}>
              <BoxWrapper flow={'column'} align={'flex-start'} justify={'space-between'}>
                <Wrapper flow={'column'} height={'100%'}>
                  <TitleText bold><T ucFirst>product.current.med.title</T></TitleText>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} padding={'12px 0 0'}>
                    <T ucFirst>product.current.support.title</T>
                  </Text>
                </Wrapper>
                <Button color={'black05'} onClick={medicalAdviserHandle}>
                  <Wrapper align={'center'} gap={'6px'}>
                    <Icon type={'circle_plus'} width={16} height={16} color={'black'}/>
                    <Text><T ucFirst>product.current.know-more.title</T></Text>
                  </Wrapper>
                </Button>
              </BoxWrapper>
            </StyledCol>
            <Col lg={{cols: 6}} sm={{cols: 12, order: 1}}>
              <ImageContainer img={'/static/banners/product_tree_bg.png'} align={'right'}/>
            </Col>
          </StyledRow>
        </StyledContainer>
      </StyledWell>
      <StyledWell color={'lightenBlue'}>
        <StyledContainer>
          <StyledRow>
            <StyledCol lg={{cols: 6, order: 2}} sm={{cols: 12}}>
              <BoxWrapper flow={'column'} align={'flex-start'} justify={'space-between'}>
                <Wrapper flow={'column'}>
                  <TitleText bold><T ucFirst>product.current.telemedcine.title</T></TitleText>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} padding={'12px 0 0'}>
                    <T ucFirst>product.current.alltime.title</T>
                  </Text>
                </Wrapper>
                <Button color={'black05'} onClick={telemedicineHandle}>
                  <Wrapper align={'center'} gap={'6px'}>
                    <Icon type={'circle_plus'} width={16} height={16} color={'black'}/>
                    <Text><T ucFirst>product.current.know-more.title</T></Text>
                  </Wrapper>
                </Button>
              </BoxWrapper>
            </StyledCol>
            <Col lg={{cols: 6, order: 1}} sm={{cols: 12}}>
              <ImageContainer img={'/static/banners/product_man_bg.png'} align={'left'}/>
            </Col>
          </StyledRow>
        </StyledContainer>
      </StyledWell>
      <StyledWell color={'lightenAquamarin'}>
        <StyledContainer>
          <StyledRow>
            <StyledCol lg={{cols: 6}} sm={{cols: 12, order: 2}}>
              <BoxWrapper flow={'column'} align={'flex-start'} justify={'space-between'}>
                <Wrapper flow={'column'}>
                  <TitleText bold><T ucFirst>product.current.second-meaning.title</T></TitleText>
                  <Text size={'20px'} lineHeight={'30px'} smSize={'16px'} smLineHeight={'24px'} padding={'12px 0 0'}>
                    <T ucFirst>product.current.alternative.title</T>
                  </Text>
                </Wrapper>
                <Button color={'black05'} onClick={addMedcardHandle}>
                  <Wrapper align={'center'} gap={'6px'}>
                    <Icon type={'circle_plus'} width={16} height={16} color={'black'}/>
                    <Text><T ucFirst>product.current.how-it-work.title</T></Text>
                  </Wrapper>
                </Button>
              </BoxWrapper>
            </StyledCol>
            <Col lg={{cols: 6}} sm={{cols: 12, order: 1}}>
              <ImageContainer img={'/static/banners/product_people_bg.png'} align={'right'}/>
            </Col>
          </StyledRow>
        </StyledContainer>
      </StyledWell>
    </StyledWrapper>
  )
}
