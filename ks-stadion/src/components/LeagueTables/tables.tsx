import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { LeagueGameProps } from 'gatsby-source-protrainup/typescript/types/game'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../common/Cards/headerCard'
import * as classes from './style.module.css'

const LeagueTable = ({ allTeams, leagueId }: { allTeams: Array<LeagueGameProps>; leagueId: number }) => {
  const { t } = useTranslation()
  const allTeamsInLeague = allTeams
    .filter((team) => team.game_id === leagueId)
    .sort((a, b) => a.leagueStats.position - b.leagueStats.position)

  return (
    <div className={classes.table__wrapper}>
      <HeaderCard text={t('league-table')} subText={allTeamsInLeague[0].game.name} />
      <TableContainer component={Paper}>
        <Table aria-label="League">
          <TableHead>
            <TableRow>
              <TableCell className={classes.table__cell} align="center">
                POZ
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                Drużyna
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                M
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                Z
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                R
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                L
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                B+
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                B-
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                RG
              </TableCell>
              <TableCell className={classes.table__cell} align="center">
                PKT
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTeamsInLeague.map((team, index) => (
              <TableRow key={team.club_name}>
                <TableCell className={classes.table__cell} align="center">
                  {index + 1}
                </TableCell>
                <TableCell className={classes.table__cell} align="left">
                  <div className={classes.team__info}>
                    {team.crest_url && (
                      <img loading="lazy" className={classes.table__crest} src={team.crest_url} alt={`Herb drużyny gospodarzy - ${team.club_name}`} />
                    )}
                    <span className={classes.team__club__name}>{team.club_name}</span>
                  </div>
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.matches}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.wins}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.draws}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.losses}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.scores}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.loseGoals}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.goalDifference}
                </TableCell>
                <TableCell className={classes.table__cell} align="center">
                  {team.leagueStats.points}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default React.memo(LeagueTable)
