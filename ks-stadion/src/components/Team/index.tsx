import Container from '@material-ui/core/Container'
import _ from 'lodash'
import React, { useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import { getActiveSeason } from '../../redux/selectors'
import { TeamTemplateQueryProps } from '../../types'
import Members from './Cadre/Members'
import Players from './Cadre/Players'
import Calendar from './Calendar'
import TeamProfile from './TeamProfile'
import * as classes from './style.module.css'
import Tabs from './tabs'

const TeamIndex = ({ team, club, players, lastMatch, trainings, members }: TeamTemplateQueryProps) => {
  const activeSeason = useSelector(getActiveSeason)

  const playersInSeason = useMemo(() => players.nodes.filter((player) => player.season?.name === activeSeason), [])
  const membersInSeason = useMemo(() => members.nodes.filter((member) => member.season?.name === activeSeason), [])

  const teamRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const calendarRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const membersRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const playersRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  return (
    <>
      <Tabs
        teamRef={teamRef}
        calendarRef={calendarRef}
        membersRef={membersInSeason.length > 0 ? membersRef : null}
        playersRef={playersInSeason.length > 0 ? playersRef : null}
      />
      <Container className={classes.container}>
        <TeamProfile
          ref={teamRef}
          team={team}
          club={club}
          numberOfPlayers={players.totalCount}
          lastMatch={lastMatch.nodes.length > 0 ? lastMatch.nodes[0] : null}
        />
        <Calendar ref={calendarRef} teamName={team.team_name} trainings={trainings.nodes} />
        {membersInSeason.length > 0 && <Members ref={membersRef} members={membersInSeason} />}
        {playersInSeason.length > 0 && <Players ref={playersRef} players={playersInSeason} />}
      </Container>
    </>
  )
}

export default React.memo(TeamIndex)
