import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import { PrismicProtrainupSlice } from '../../types/widgets'
import * as classes from './style.module.css'

const Protrainup = ({ slice }: { slice: PrismicProtrainupSlice }) => {
  const url = slice.primary.link ? slice.primary.link.url : undefined

  if (!url) return null

  const target = slice.primary.link ? slice.primary.link.target : undefined

  return (
    <div className={`${classes.social__wrapper} ${classes.social__protrainup}`}>
      <a rel="noopener" href={url} target={target} className={classes.social__anchor}>
        <div className={`${classes.img__wrapper}`}>
          <StaticImage
            className={classes.custom__button__image__wrapper}
            src="../../../images/ptu-logo.png"
            alt="Zaloguj się do platformy protrainup"
          />
        </div>
        <div className={classes.social__content}>
          <span className={`${classes.caption1} ${classes.caption}`}>PROTRAINUP</span>
          <span className={`${classes.caption2} ${classes.caption}`}>Logowanie</span>
        </div>
        <div className={classes.plus__icon}>
          <AddCircleOutlineIcon />
        </div>
      </a>
    </div>
  )
}

export default React.memo(Protrainup)
