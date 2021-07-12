import { FixedObject } from 'gatsby-image'
import Img from 'gatsby-image'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as classes from './style.module.css'

type Props = {
  alt: string | null
  className?: string
  imgStyle?: React.CSSProperties
  style?: React.CSSProperties
  fixed: FixedObject | null
  width?: number
  height?: number
}

const Image = ({ alt, fixed, className, imgStyle, style}: Props) => {
  const { t } = useTranslation()

  const alternativeText = alt ? alt : t('no-data')

  if (fixed) {
    return <Img style={style} imgStyle={imgStyle} className={className} fixed={fixed} alt={alternativeText} />
  } else {
    return (
      <StaticImage
        imgStyle={imgStyle}
        placeholder="blurred"
        className={className}
        imgClassName={classes.placeholder__image}
        layout="fixed"
        src="../../../images/no-image-available.png"
        alt={alternativeText}
      />
    )
  }
}

export default React.memo(Image)
