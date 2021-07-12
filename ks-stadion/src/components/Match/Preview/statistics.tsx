import Grid from '@material-ui/core/Grid'
import { StatsProps, StatTypes } from 'gatsby-source-protrainup/typescript/types/match'
import React from 'react'
import { useTranslation } from 'react-i18next'

import StatisticRow from './statisticRow'
import * as classes from './style.module.css'

const forbiddenTypes = [
  'formation',
  'inaccurate_passes',
  'field_possession_center',
  'field_possession_attack',
  'field_possession_defense',
  'active_game',
  'possession',
  'tagging'
]

const checkStats = (stats: StatsProps | null): boolean => {
  return stats ? Object.keys(stats).some((key) => !forbiddenTypes.includes(key) && stats[key as typeof StatTypes[number]]) : true
}

const Statistics = ({ hostStats, guestStats }: { hostStats: StatsProps | null; guestStats: StatsProps | null }) => {
  const { t } = useTranslation()

  const areHostStatsEmpty = checkStats(hostStats)
  const areGuestStatsEmpty = checkStats(guestStats)

  if (!areHostStatsEmpty || !areGuestStatsEmpty) return null

  return (
    <section>
      <div className={classes.statistics__header}>
        <header style={{ margin: '0 auto' }}>
          <span>{t('game-stats')}</span>
        </header>
      </div>
      <div className={classes.statistics__expander}>
        <Grid container className={classes.statistics__grid}>
          {StatTypes.map((type) => {
            if (!forbiddenTypes.includes(type) && ((hostStats && hostStats[type]) || (guestStats && guestStats[type]))) {
              return <StatisticRow hostStats={hostStats} guestStats={guestStats} type={type} key={type} />
            }
          })}
        </Grid>
      </div>
    </section>
  )
}

export default React.memo(Statistics)
