import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import { MatchPlayerProps } from 'gatsby-source-protrainup/typescript/types/match'
import React from 'react'

import HeaderCard from '../../../common/Cards/headerCard'
import SquadHeader from './squadHeader'
import SquadItem from './squadRow'
import * as classes from './style.module.css'

const Squad = React.forwardRef(
  ({ players, headerText }: { players: Array<MatchPlayerProps>; headerText: string }, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} style={{ marginTop: '3rem' }}>
        <HeaderCard rounded={false} text={headerText} />
        <Paper square={true}>
          <TableContainer>
            <Table>
              <SquadHeader />
              <TableBody>
                {players.length > 0 ? (
                  players.filter((player) => player.player).map((player) => <SquadItem key={player.player?.id} player={player} />)
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" variant="body" classes={{ root: classes.table__body }}>
                      <span style={{ padding: '1rem 0', display: 'block' }}>Brak zawodników do wyświetlenia :(</span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    )
  }
)

export default React.memo(Squad)
