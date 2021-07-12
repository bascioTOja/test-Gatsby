import Grid from '@material-ui/core/Grid'
import { StatsProps, StatTypes } from 'gatsby-source-protrainup/typescript/types/match'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as classes from './style.module.css'

const StatisticRow = ({
  hostStats,
  guestStats,
  type
}: {
  hostStats: StatsProps | null
  guestStats: StatsProps | null
  type: typeof StatTypes[number]
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Grid item xs={3} className={classes.grid__item}>
        <span className={classes.grid__value}>{hostStats && hostStats[type] ? hostStats[type] : 'B/D'}</span>
      </Grid>
      <Grid item xs={6} className={classes.grid__item}>
        {t(type)}
      </Grid>
      <Grid item xs={3} className={classes.grid__item}>
        <span className={classes.grid__value}>{guestStats && guestStats[type] ? guestStats[type] : 'B/D'}</span>
      </Grid>
    </>
  )
}

export default React.memo(StatisticRow)
