import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {getColor} from '../../../../ui/helpers/getColor'
import {media} from '../../../../helpers/media'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {Link} from '../../../../routes'
import {Img} from '../../../../ui/img'
import {FileCoverComponent, mimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'

const AttachmentWrapper = styled(Wrapper)`
  height: 176px;  
  width: 232px;
  border-radius: 16px;
  background-color: ${p => getColor('black05', p.theme)};

  ${media.mobile`
    min-width: 232px;
    width: 232px;
    height: 166px;
  `}
  &:hover {
    cursor: pointer;
  }
`

const StyledWrapper = styled(Wrapper)`
  margin-top: 0;
`

const StyledText = styled(Text)`
  overflow: hidden;
  word-wrap: break-word;
  width: 150px;
`

export const ShortAttachmentBlock = ({
  link,
  title,
  date,
  files,
  comment,
}) => {
  const hasFiles = !!(files && files[0])

  return (
    <Link route={link}>
      <AttachmentWrapper flow={'column'} justify={'space-between'} gap={'12px'} padding={'16px'}>
        <Wrapper align={'flex-start'} justify={'space-between'}>
          <Text width={'150px'}>{title}</Text>
          <Wrapper width={'auto'} flow={'column'} align={'flex-end'}>
            {date && (
              <>
                <TitleText align={'right'} color={'black50'} width={'auto'}>{moment(date).format('DD')}</TitleText>
                <Text align={'right'} color={'black50'}>{moment(date).format('MMM')}</Text>
              </>)}
          </Wrapper>
        </Wrapper>
        {(hasFiles || comment) && <StyledWrapper align={'center'} gap={'6px'}>
          {hasFiles && files[0].mimeType.includes('image') ? <Img src={files[0].thumbnail} height={'64px'} borderRadius={'16px'} />
            : hasFiles && <FileCoverComponent
              title={mimeTypeChecker(files[0].mimeType)}
              size={'12px'}
              lineHeight={'20px'}
              width={'50px'}
              height={'64px'}
              smallCard
            />
          }
          {hasFiles && files.length > 1 && <Text width={'auto'} color={'black50'} padding={'0 0 0' +
          ' 10px'}>+{files.length - 1}</Text>}
          {!hasFiles && comment && <StyledText color={'black50'}>{comment.length >=50 ? comment.substring(0, 50) + '...' : comment}</StyledText>}
        </StyledWrapper>}
      </AttachmentWrapper>
    </Link>
  )
}

ShortAttachmentBlock.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    mimeType: PropTypes.string,
  })),
  comment: PropTypes.string,
}