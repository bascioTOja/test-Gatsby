import { GatsbyImage } from 'gatsby-plugin-image'
import { PlayerProps } from 'gatsby-source-protrainup/typescript/types/player'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Shirt from '../../../../../assets/tShirt.svg'
import GetNotImageAvailablePNG from '../../../../gatsby/queries/getNotImageAvailablePNG'
import { areStatsCardFlipping } from '../../../../redux/selectors'
import Badge from '../../../common/Badge'
import FlipCard from '../../../common/FlipCard'
import ProgressBar from '../../../common/ProgressBar'
import * as classes from './style.module.css'

const PlayerCard = ({ player }: { player: PlayerProps }) => {
  const { t } = useTranslation()
  const flipCard = useSelector(areStatsCardFlipping);
  const playerHeader = (
    <header className={classes.player__header}>
      <span className={classes.player__name}>{player.user ? player.user.full_name : t('no-data')}</span>
      <Shirt className={classes.fa__shirt} />
      <span className={classes.player__number}>{player.number ? player.number : '#'}</span>
    </header>
  )

  const playerAvatar = (
    <div className={classes.image__wrapper}>
      <GatsbyImage
        className={classes.avatar}
        alt={`Avatar gracza drużyny ${player.user?.name ? player.user?.name : '' }`}
        image={_.get(player, 'user.avatar.childImageSharp.gatsbyImageData', GetNotImageAvailablePNG())}
      />
    </div>
  )

  const frontCard = (
    <>
      {playerHeader}
      <div className={classes.player__details}>
        {playerAvatar}
        <div className={classes.player__badge}>
          <Badge text={player.position ? t(player.position) : t('no-data')} />
        </div>
      </div>
    </>
  )

  const playerStats = player.match_stats_summary ? player.match_stats_summary : null
  const { scores, matches, minutes, assists, red_cards, yellow_cards } = playerStats || {}
  const backCard = (
    <>
      {playerHeader}
      <div className={classes.player__stats}>
        <div className={classes.stats__row}>
          <div className={classes.stats__cell}>{t('matches-played')}</div>
          <div className={classes.stats__cell}>
            <ProgressBar text={matches ? matches.toString() : '0'} progressValue={matches ? matches : 0} />
          </div>
        </div>
        <div className={classes.stats__row}>
          <div className={classes.stats__cell}>{t('time-on-field')}</div>
          <div className={classes.stats__cell}>
            <ProgressBar text={minutes ? minutes.toString() : '0'} progressValue={minutes ? minutes : 0} />
          </div>
        </div>
        <div className={classes.stats__row}>
          <div className={classes.stats__cell}>{t('score-goals')}</div>
          <div className={classes.stats__cell}>
            <ProgressBar text={scores ? scores.toString() : '0'} progressValue={scores ? scores : 0} />
          </div>
        </div>
        <div className={classes.stats__row}>
          <div className={classes.stats__cell}>{t('Assists')}</div>
          <div className={classes.stats__cell}>
            <ProgressBar text={assists ? assists.toString() : '0'} progressValue={assists ? assists : 0} />
          </div>
        </div>
        <div className={classes.stats__row}>
          <div className={classes.stats__cell}>{t('red-yellow-cards')}</div>
          <div className={classes.stats__cell}>
            <span className={classes.red__cards}>{red_cards ? red_cards : '0'}</span>/
            <span className={classes.yellow__cards}>{yellow_cards ? yellow_cards : '0'}</span>
          </div>
        </div>
      </div>
    </>
  )

  return <FlipCard flip={flipCard} frontCard={frontCard} backCard={backCard} />
}

export default React.memo(PlayerCard)
