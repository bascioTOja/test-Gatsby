import Container from '@material-ui/core/Container'
import { FluidObject } from 'gatsby-image'
import Img from 'gatsby-image/withIEPolyfill'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import GetCommonBaner from '../../../gatsby/queries/getCommonBanner'
import * as classes from './style.module.css'

type Props = {
  fluid?: FluidObject | null
  text?: string
  alt?: string
  gatsbyImage?: IGatsbyImageData | null
  banerHeight?: string
}

const Baner = ({ fluid, text, alt, gatsbyImage, banerHeight }: Props) => {
  if (fluid && gatsbyImage) throw Error('You cannot declare gatsby image and fluid together')

  const photoAlt = alt ? alt : 'Zdjęcie banerowe'
  return (
    <div className={classes.wrapper} style={{ height: banerHeight }}>
      <Container>
        <div className={classes.background} style={{ height: banerHeight }}>
          {fluid ? (
            <Img style={{ height: banerHeight }} objectPosition="top" fluid={fluid} alt={photoAlt} />
          ) : (
            <GatsbyImage
              style={{ height: banerHeight }}
              imgStyle={{ height: banerHeight }}
              objectPosition="top"
              image={gatsbyImage ? gatsbyImage : GetCommonBaner()}
              alt={photoAlt}
            />
          )}
        </div>
        {text && (
          <div className={classes.text} style={{ height: banerHeight }}>
            <h1>{text}</h1>
          </div>
        )}
      </Container>
    </div>
  )
}

export default React.memo(Baner)
