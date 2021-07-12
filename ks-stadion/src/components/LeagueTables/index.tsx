import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { LeagueGameProps } from 'gatsby-source-protrainup/typescript/types/game'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getWidgets } from '../../redux/selectors'
import ColorProvider from '../common/Providers/color'
import TeamSelector from '../common/TeamSelector'
import Widgets from '../common/Widgets'
import * as classes from './style.module.css'
import LeagueTable from './tables'

const isSSR = typeof window === 'undefined'

const LeaguesWrapper = ({ leaguesData, teams }: { leaguesData: Array<LeagueGameProps>; teams: Array<TeamProps> }) => {
  const widgets = useSelector(getWidgets)
  const { t } = useTranslation()
  const [teamLeagues, setTeamLeaguesState] = useState<Array<LeagueGameProps>>([])
  const [selectedTeam, selectTeam] = useState<string>('')
  const [isLoading, setLoadingState] = useState<boolean>(false)
  const [renderLoading, setRenderLoadingState] = useState<boolean>(false)

  useEffect(() => {
    const params = !isSSR ? new URLSearchParams(window.location.search.substring(1)) : null
    const teamName = params ? params.get('team_name') : null
    selectTeam(teamName || '')
  }, [])

  useEffect(() => {
    let nestedTimeout: NodeJS.Timeout | undefined = undefined

    setRenderLoadingState(true)
    setLoadingState(true)
    const tHandler = setTimeout(() => {
      const teamLeagues = leaguesData && leaguesData.filter((league) => league.team && league.team.team_name === selectedTeam)
      setTeamLeaguesState(_.uniqBy(teamLeagues.length === 0 && selectedTeam === '' ? leaguesData : teamLeagues, 'game_id'))
      setLoadingState(false)
      nestedTimeout = setTimeout(() => {
        setRenderLoadingState(false) // After load disappear modal
      }, 505)
    }, 800)

    return () => {
      clearInterval(tHandler)
      nestedTimeout && clearInterval(nestedTimeout)
    }
  }, [selectedTeam])

  // From the graphql we catch all leagues, filter only that where is the team from query
  return (
    <main style={{ paddingBottom: '3rem' }}>
      <Container>
        <TeamSelector className={classes.team__selector} value={selectedTeam} onChange={selectTeam} teams={teams} />
        <Grid container spacing={3} style={{ marginTop: '3rem', position: 'relative' }}>
          <Grid item xs={12} md={widgets.length > 0 ? 8 : 12} style={{ position: 'relative' }}>
            {renderLoading && (
              <div className={`${classes.loading__skeleton} ${isLoading ? classes.loading : ''}`}>
                <ColorProvider>
                  <CircularProgress className={classes.loading__circle} />
                </ColorProvider>
              </div>
            )}

            {!teamLeagues || teamLeagues.length === 0 ? (
              <>
                <div style={{ textAlign: 'center' }}>
                  <h1>{t('no-data')}</h1>
                  {selectedTeam ? (
                    <h4>Niestety, ale dana drużyna nie posiada żadnych rozegranych lig</h4>
                  ) : (
                    <h4>Wybierz drużynę która Cię interesuje!</h4>
                  )}
                </div>
              </>
            ) : (
              teamLeagues.map((team) => <LeagueTable key={team.game_id} leagueId={team.game_id} allTeams={leaguesData} />)
            )}
          </Grid>
          {widgets.length > 0 && (
            <Grid item xs={12} md={4} style={{ position: 'relative' }}>
              <Widgets widgets={widgets} />
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  )
}

export default React.memo(LeaguesWrapper)
