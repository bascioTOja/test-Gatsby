import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MatchPlayerProps } from 'gatsby-source-protrainup/typescript/types/match'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as classes from './style.module.css'

const SquadItem = ({ player }: { player: MatchPlayerProps }) => {
  const { t } = useTranslation()
  const playerNumber = _.get(player, 'player.number', null)
  const playerName = _.get(player, 'player.user.full_name', null)
  const playerAvatar = _.get(player, 'player.user.avatar.childImageSharp.gatsbyImageData', null)

  return (
    <TableRow>
      <TableCell align="center" variant="body" classes={{ root: classes.table__body }}>
        {playerNumber ? playerNumber : '#'}
      </TableCell>
      <TableCell align="center" variant="body" classes={{ root: classes.table__body }}>
        <div className={classes.player__data__wrapper}>
          {playerAvatar && <GatsbyImage className={classes.table__avatar} image={playerAvatar} alt={`Awatar gracza: ${playerName}`} />}
          <span style={{ flexGrow: 1 }}>{playerName ? playerName : t('no-data')}</span>
        </div>
      </TableCell>
      <TableCell align="center" variant="body" classes={{ root: classes.table__body }}>
        {player.stats.assists !== null && player.stats.assists > 0 && <span>Asysty: {player.stats.assists}</span>}
        {player.stats.scores !== null && player.stats.scores > 0 && <span>Gole: {player.stats.scores}</span>}
      </TableCell>
      <TableCell align="center" variant="body" classes={{ root: classes.table__body }}>
        {player.stats.minutes} {player.stats.minutes !== null ? 'minut' : ''}
      </TableCell>
    </TableRow>
  )
}

export default React.memo(SquadItem)
