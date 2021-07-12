import Grid from '@material-ui/core/Grid'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import { SortEventByMinute } from 'gatsby-source-protrainup/services/sortByEvent'
import { ParticipantStatsProps } from 'gatsby-source-protrainup/typescript/types'
import React, { useMemo } from 'react'

import * as classes from './style.module.css'

const ScoresInfo = ({ hostStats, guestStats }: { hostStats: ParticipantStatsProps | null; guestStats: ParticipantStatsProps | null }) => {
  const sortedHostEvent = hostStats ? useMemo(() => SortEventByMinute(hostStats, 'score'), []) : null
  const sortedGuestEvent = guestStats ? useMemo(() => SortEventByMinute(guestStats, 'score'), []) : null

  return (
    <section className={classes.scores__section}>
      <Grid container>
        <Grid xs={6} item className={classes.scores__team}>
          {sortedHostEvent &&
            sortedHostEvent.map((score) => (
              <div key={score.id} className={classes.scores__score}>
                <span>
                  {score.player && score.player.player && score.player.player.user ? score.player.player.user.full_name : '-'} (
                  {score.minute})
                </span>
                <SportsSoccerIcon />
              </div>
            ))}
        </Grid>
        <Grid xs={6} item className={classes.scores__team}>
          {sortedGuestEvent &&
            sortedGuestEvent.map((score, index) => (
              <div key={index} className={classes.scores__score}>
                <span>
                  {score.player && score.player.player && score.player.player.user ? score.player.player.user.full_name : '-'}(
                  {score.minute})
                </span>
                <SportsSoccerIcon />
              </div>
            ))}
        </Grid>
      </Grid>
    </section>
  )
}

export default React.memo(ScoresInfo)
