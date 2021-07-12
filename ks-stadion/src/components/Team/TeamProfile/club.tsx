import { GatsbyImage } from 'gatsby-plugin-image'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import { DefaultCrest } from '../../common/CrestDefault'
import * as classes from './style.module.css'

const Club = ({ crest, name, alt }: { crest?: IGatsbyImageData | null; name: string | null; alt: string }) => {
  return (
    <div className={classes.club}>
      <div>{crest ? <GatsbyImage alt={alt} image={crest} /> : <DefaultCrest />}</div>
      <div className={classes.club__name}>
        <span>{name ? name : '-'}</span>
      </div>
    </div>
  )
}

export default React.memo(Club)
