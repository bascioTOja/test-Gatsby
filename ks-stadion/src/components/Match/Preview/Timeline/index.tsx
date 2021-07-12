import Grid from '@material-ui/core/Grid'
import ArrowLeftAltIcon from '@material-ui/icons/ArrowBack'
import ArrowRightAltIcon from '@material-ui/icons/ArrowForward'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import { MatchEventProps } from 'gatsby-source-protrainup/typescript/types/match'
import _ from 'lodash'
import React, {  Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import * as classes from './style.module.css'

const Timeline = React.forwardRef(({ events }: { events: Array<MatchEventProps> }, ref: React.Ref<HTMLDivElement>) => {
  if (events.length === 0) return null
  const { t } = useTranslation()

  const renderEventData = (event: MatchEventProps) => {
    switch (event.type) {
      case 'yellow_card':
        return (
          <div className={`${classes.event__data} ${event.participant_match.host ? classes.event__host : classes.event__guest}`}>
            <span className={`${classes.event__card} ${classes.yellow}`}></span>
            <span className={classes.event__player__name}>{_.get(event, 'player.player.user.full_name', '-')}</span>
          </div>
        )
      case 'red_card':
        return (
          <div className={`${classes.event__data} ${event.participant_match.host ? classes.event__host : classes.event__guest}`}>
            <span className={`${classes.event__card} ${classes.red}`}></span>
            <span className={classes.event__player__name}>{_.get(event, 'player.player.user.full_name', t('no-data'))}</span>
          </div>
        )
      case 'score':
        return (
          <div className={`${classes.event__data} ${event.participant_match.host ? classes.event__host : classes.event__guest}`}>
            <SportsSoccerIcon style={{ fontSize: '2.4285rem' }} />
            <span className={classes.event__player__name}>{_.get(event, 'player.player.user.full_name', t('no-data'))}</span>
          </div>
        )
      case 'substitution':
        return (
          <div className={`${classes.event__data} ${event.participant_match.host ? classes.event__host : classes.event__guest}`}>
            <div className={classes.substitution}>
              <div className={classes.substitution__names}>
                <span className={classes.event__player__name}>{_.get(event, 'second_player.player.user.full_name', t('no-data'))}</span>
                <span className={classes.event__player__name}>{_.get(event, 'player.player.user.full_name', t('no-data'))}</span>
              </div>
              <div className={classes.substitution__arrows}>
                <ArrowRightAltIcon style={{ fontSize: '2.4285rem', color: 'rgba(0,255,0,.8)' }} />
                <ArrowLeftAltIcon style={{ fontSize: '2.4285rem', color: 'rgba(255,0,0,.8)' }} />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div ref={ref}>
      <header className={classes.header} style={{ margin: '0 auto' }}>
        <span>{t('time-line')}</span>
      </header>
      <div>
        <Grid className={classes.events} container>
          {events.map((event) => (
            <Fragment key={event.id}>
              <Grid item xs={5} className={classes.event__grid__item}>
                {event.participant_match.host && renderEventData(event)}
              </Grid>
              <Grid item xs={2}>
                <span className={classes.time}>
                  {event.minute}
                  <b className={classes.time__symbol}>`</b>
                </span>
              </Grid>
              <Grid item xs={5} className={classes.event__grid__item}>
                {!event.participant_match.host && renderEventData(event)}
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </div>
    </div>
  )
})

export default React.memo(Timeline)
