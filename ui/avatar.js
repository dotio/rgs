import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'
import {Text} from './text'
import {Wrapper} from './wrapper'
import {media} from '../helpers/media'

const AvatarWrapper = styled(Wrapper)`
  width: ${p => p.size};
  height: ${p => p.size};
  border-radius: ${p => p.borderRadius};
  background: ${p => getColor(p.bgColor, p.theme)};
  font-size: ${p => p.fontSize};
  line-height: ${p => p.lineHeight};
  text-align: center;
  flex-shrink: 0;
  color: ${p => getColor(p.color, p.theme)};
  text-transform: uppercase;
`

const ImageUrl = styled.div`
  background-image: ${p => `url(${p.src})`};
  width: ${p => p.fromList ? '80px' : p.width};
  height: ${p => p.fromList ? '80px' : p.height};
  border-radius: ${p => p.borderRadius};
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  min-height: ${p => p.fromList ? '80px' : p.minHeight};
  flex-grow: 0;
  background-size:  ${p => p.isAutoWidth ? 'auto 100%' : '100% auto'};
  background-size:  ${p => p.backgroundSize};
  background-position: center center;
  background-repeat: no-repeat;
  border: ${p => p.border};
 
  
  ${p => media.mobile(p.fromList && css`
    width: 60px;
    height: 60px;
    min-height: 60px;
  `)}
`

export const Avatar = ({src, text, width, height, bgColor, size, minHeight, lineHeight, fontSize, color, aboutBlock, ...props}) => {
  const [isAutoWidth, setIsAutoWidth] = useState(false)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if(src) {
      let img = new Image()

      img.onload = () => {
        setIsAutoWidth(img.width >= img.height)
        setIsShow(true)
      }
      img.src = src
    }
  }, [])

  if(!src) {
    return <AvatarWrapper bgColor={bgColor} size={size} {...props} align={'center'} justify={'center'}>
      <Text width={'auto'} size={fontSize} lineHeight={lineHeight} color={color} bold>{text}</Text>
    </AvatarWrapper>
  } else {
    return isShow && <ImageUrl backgroundSize={aboutBlock && 'cover'} src={src} width={width} height={height} minHeight={minHeight} isAutoWidth={isAutoWidth} {...props}/>
  }
}

Avatar.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  src:  PropTypes.string,
  borderRadius: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

Avatar.defaultProps = {
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  minHeight: '36px',
}