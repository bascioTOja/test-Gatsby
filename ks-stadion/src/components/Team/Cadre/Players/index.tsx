import Grid from '@material-ui/core/Grid'
import GroupByPosition, { groupedPositionNames } from 'gatsby-source-protrainup/services/groupByPosition'
import { PlayerProps } from 'gatsby-source-protrainup/typescript/types/player'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../../common/Cards/headerCard'
import PlayerCard from './playerCard'
import * as classes from './style.module.css'

const Players = React.forwardRef((props: { players: Array<PlayerProps> }, ref: React.Ref<HTMLDivElement>) => {
  const groupedPlayers = GroupByPosition(props.players)
  const { t } = useTranslation()

  const selectedPlayers = Object.keys(groupedPlayers).map((groupKey) => {
    if (groupedPlayers[groupKey as typeof groupedPositionNames[number]].length === 0) {
      return null
    }
    const playersInGroup = groupedPlayers[groupKey as typeof groupedPositionNames[number]]

    return (
      <div key={groupKey}>
        <header className={classes.team__header}>
          <h5>{t(groupKey)}</h5>
        </header>
        <main className={classes.players}>
          <Grid container spacing={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
            {playersInGroup.map((player) => (
              <Grid key={player.id} item xs={12} sm={6} md={4}>
                <PlayerCard player={player} />
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    )
  })

  return (
    <div className={classes.wrapper} id="roster" ref={ref}>
      <HeaderCard text={t('Roster')} rounded={false} />
      {selectedPlayers}
    </div>
  )
})

export default React.memo(Players)
