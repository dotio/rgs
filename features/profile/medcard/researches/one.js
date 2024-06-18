import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {Container} from '../../../../ui/grid/container'
import {TitleText} from '../../../../ui/title-text'
import moment from 'moment'
import {Router} from '../../../../routes'
import {Gap} from '../../../../ui/gap'
import {Text} from '../../../../ui/text'
import {Img} from '../../../../ui/img'
import {Button} from '../../../../ui/button'
import {Well} from '../../../../ui/well'
import {useDispatch, useSelector} from 'react-redux'
import {media} from '../../../../helpers/media'
import {CircleButton} from '../../../../ui/circle-button'
import {DataRow} from '../../../../ui/data-row'
import {T, getTranslator} from '../../../../utils/translation'
import {FileCoverComponent, mimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'

const PageBox = styled(Wrapper)`
  position: relative;
`

const ImageWrapper = styled.div`
  display: inline-block;
  padding-right: 12px;
  padding-bottom: 12px;
  cursor: pointer;
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const StyledCircleButton = styled(CircleButton)`
  z-index: 0;
`

export const ResearchComponent = ({medcardId}) => {
  const dispatch = useDispatch()
  const translator = getTranslator(useSelector(state => state.localization))

  const {id, serviceType, name, date, comment, files} = useSelector(state => state.profileMedcard.currentResearch)

  const onEditClick = () => dispatch.modal.addAndShowModal({
    type: 'new-research-modal',
    editForm: {
      id,
      name,
      orderTypeId: serviceType.id.toString(),
      comment,
      date,
      files
    },
    medcardId
  })

  const showGallery = (file) => {
    dispatch.modal.addAndShowModal({
      type: 'gallery-modal',
      data: {
        images: files.filter(item => item.mimeType.includes('image')).map(item => ({...item, path: item.url})),
        titles: files.map(file => file.title),
        currentIndex: files.filter(item => item.mimeType.includes('image')).indexOf(file),
        isShowPreview: true
      }
    })
  }

  useEffect(() => {
    return () => {
      dispatch.profileMedcard.setResearch({})
    }
  }, [])

  return (
    <PageBox flow={'column'} gap={'6px'}>
      <Well>
        <Container>
          <TitleText>{moment(date).format('D MMMM')}</TitleText>
          <TitleText color={'black50'} padding={'0 0 16px'}>{name}</TitleText>
          <StyledCircleButton icon={'long_arrow_left'} onClick={() => Router.back()} />
          <Gap gap={'12px'}>
            <DataRow label={translator('recommendation.current.recommend.title', true)}>
              <StyledText size={'20px'} lineHeight={'30px'}>{comment && comment}</StyledText>
            </DataRow>
            {files && files.length > 0 && <DataRow label={translator('recommendation.current.files.title', true)}>
              <Wrapper flexWrap>
                {files.map((file, index) =>
                  file.mimeType.includes('image') ?<ImageWrapper onClick={() => showGallery(file)} key={'image-' + index}>
                    <Img src={file.thumbnail} height={'128px'} shrink={'0'} key={file.id}/>
                  </ImageWrapper>
                    : <ImageWrapper>
                      <FileCoverComponent
                        title={mimeTypeChecker(file.mimeType)}
                        size={'24px'}
                        lineHeight={'30px'}
                        width={'96px'}
                        height={'128px'}
                        download
                        url={file.url}
                      />
                    </ImageWrapper>
                )}
              </Wrapper>
            </DataRow>}
            <Wrapper justify={'center'}>
              <Button onClick={onEditClick} color={'black05'}><T ucFirst>recommendation.current.edit</T></Button>
            </Wrapper>
          </Gap>
        </Container>
      </Well>
    </PageBox>
  )
}