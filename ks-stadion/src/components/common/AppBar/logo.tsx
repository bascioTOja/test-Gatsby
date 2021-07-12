import React from 'react'
import { useSelector } from 'react-redux'

import { getLogo, getPageTitle } from '../../../redux/selectors'
import CommonImage from '../Image'
import CommonLink from '../Link'
import * as classes from './style.module.css'

const Logo = () => {
  const logoImage = useSelector(getLogo)
  const pageTitle = useSelector(getPageTitle);

  return (
    <div className={classes.logo}>
      <CommonLink className={classes.logo__link} to="/">
        <CommonImage
          className={classes.logo__image}
          fixed={logoImage ? logoImage.picture.fixed : null}
          alt={logoImage ? logoImage.alt : `Logo strony ${pageTitle}`}
        />
      </CommonLink>
    </div>
  )
}

export default React.memo(Logo)
