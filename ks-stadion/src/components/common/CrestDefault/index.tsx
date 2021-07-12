import React from 'react'
import { useSelector } from 'react-redux'

import { getDefaultCrest } from '../../../redux/selectors'
import CommonImage from '../Image'

export const DefaultCrest = () => {
  const defaultCrest = useSelector(getDefaultCrest)
  const alt = defaultCrest.alt ? defaultCrest.alt : 'Podstawowy herb'
  // Fixed only for preview mode, gatsbyImageData is a new feature so use that in my own intention

  return <CommonImage fixed={defaultCrest.picture.fixed} alt={alt} />
}
