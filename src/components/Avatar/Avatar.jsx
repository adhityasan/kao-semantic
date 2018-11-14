import React from 'react'
import { Image, Popup } from 'semantic-ui-react'

const AvatarComponent = props => {
  const { withpopup } = props
  const avatar = <Image { ...props.image } style={{transition: 'width 0.5s'}}/>
  const avatar_withpopuname = <Popup trigger={avatar} { ...props.popup } />

  if (withpopup) {
    return avatar_withpopuname
  } else {
    return avatar
  }
}

export default AvatarComponent