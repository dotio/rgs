import React, {useState} from 'react'
import {Container} from '../../../../../ui/grid/container'
import {Wrapper} from '../../../../../ui/wrapper'
import {useDispatch, useSelector} from 'react-redux'
import {Well} from '../../../../../ui/well'
import {SectionTitle} from '../../../components/section-title'
import moment from 'moment'
import {Img} from '../../../../../ui/img'
import styled from 'styled-components'
import {Icon} from '../../../../../ui/icon'
import {Button} from '../../../../../ui/button'
import {Text} from '../../../../../ui/text'
import {T} from '../../../../../utils/translation'
import {mimeTypeChecker} from '../../../../../ui/helpers/mimeType-checker'
import {FileCoverComponent} from '../../../../../ui/helpers/mimeType-checker'

const ImgWrapper = styled(Wrapper)`
  overflow-x: auto;
  cursor: pointer;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
`

const HiddenButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FileItem = ({id, dateInsert, img, mimeType, url, items, item}) => {
  const dispatch = useDispatch()
  const files = useSelector(state => state.profileMedcard.files.items)
  const [showDelete, setShowDelete] = useState(false)
  const imageItems = items.filter(item => item.mimeType.includes('image'))
  const currentIndex = imageItems.indexOf(item)

  const handleSetShowDelete = id => {
    if(files.find(item => item.id === id)){
      setShowDelete(!showDelete)
    }
  }

  const handleDeleteFile = async id => {
    await dispatch.profileMedcard.deleteFile(id)
  }

  return (
    <Wrapper  padding={{bottom: '6px'}}>
      <Well>
        <Container>
          <SectionTitle title={moment(dateInsert).format('DD MMMM')} padding={'0 0 16px'}/>
          {mimeType.includes('image') ? <ImgWrapper gap={'12px'}
            onClick={() => dispatch.modal.addAndShowModal({
              type: 'gallery-modal',
              data: {
                images: imageItems.map(item => ({...item, path: item.url})),
                titles: items.map(file => file.title),
                currentIndex: currentIndex,
                isShowPreview: true
              }
            })}
          >
            <Img height={'128px'} src={img} />
          </ImgWrapper>
            : <ImgWrapper>
              <FileCoverComponent
                width={'96px'}
                height={'128px'}
                url={url}
                title={mimeTypeChecker(mimeType)}
                size={'24px'}
                lineHeight={'30px'}
                download
              />
            </ImgWrapper>
          }
          <Wrapper padding={'24px 0 0'} gap={'8px'}>
            <StyledButton color={'black05'} padding={'0'} onClick={() => handleSetShowDelete(id)}>
              <Icon type={'dots_16'} color={'black50'} width={16} height={16}/>
            </StyledButton>
            {showDelete && <HiddenButton color={'white'}  onClick={() => handleDeleteFile(id)}>
              <Wrapper><Icon type={'delete_trash_16'} color={'black50'} width={16} height={16}/></Wrapper>
              <Text padding={'0 0 0 6px'}><T ucFirst>files.list.delete.button</T></Text>
            </HiddenButton>}
          </Wrapper>
        </Container>
      </Well>
    </Wrapper>
  )
}
