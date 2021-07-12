import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import React from 'react'

import TwitterIcon from '../../../../assets/twitter.svg'
import { PrismicTwitterSlice } from '../../types/widgets'
import * as classes from './style.module.css'

const Twitter = ({ slice }: { slice: PrismicTwitterSlice }) => {
  const url = slice.primary.link ? slice.primary.link.url : undefined

  if (!url) return null

  const target = slice.primary.link ? slice.primary.link.target : undefined

  return (
    <div className={`${classes.social__wrapper} ${classes.social__twitter}`}>
      <a rel="noopener" href={url} target={target} className={classes.social__anchor}>
        <div className={`${classes.svg__wrapper} ${classes.svg__transparent}`}>
          <TwitterIcon className={classes.social__svg} />
        </div>
        <div className={classes.social__content}>
          <span className={`${classes.caption1} ${classes.caption}`}>Obserwuj nas</span>
          <span className={`${classes.caption2} ${classes.caption}`}>Na twitterze</span>
        </div>
        <div className={classes.plus__icon}>
          <AddCircleOutlineIcon />
        </div>
      </a>
    </div>
  )
}

export default React.memo(Twitter)
