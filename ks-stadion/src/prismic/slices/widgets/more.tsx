import { makeStyles } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getSecondaryColor } from '../../../redux/selectors'
import * as classes from './style.module.css'

const More = () => {
  const { t } = useTranslation()
  const secondaryColor = useSelector(getSecondaryColor)

  const useStyles = makeStyles({
    hover__secondary__color: {
      '&:hover': {
        backgroundColor: secondaryColor ? secondaryColor : 'transparent'
      }
    }
  })
  const styles = useStyles()
  return <div className={`${classes.more} ${styles.hover__secondary__color}`}>{t('show-more')}</div>
}

export default React.memo(More)
