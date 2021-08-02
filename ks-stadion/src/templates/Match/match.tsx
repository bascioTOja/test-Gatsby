import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { graphql, PageProps } from 'gatsby'
import { MatchPlayerProps } from 'gatsby-source-protrainup/typescript/types/match'
import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import MatchPreview from '../../components/Match/Preview'
import Tabs from '../../components/Match/Preview/tabs'
import LayoutTransition from '../../components/common/LayoutTransition'
import Widgets from '../../components/common/Widgets'
import { getPageTitle, getWidgets } from '../../redux/selectors'
import { MainPageProps, MatchTemplateQueryProps } from '../../types'
import { LoadGeneralData } from '../../utils'
import * as classes from './style.module.css'
import Seo from '../../components/common/Seo'

const Match = ({ data }: PageProps<MatchTemplateQueryProps & MainPageProps>) => {
  const mainSquadRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const benchRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const timelineRef = useRef<HTMLDivElement>({} as HTMLDivElement)
  const previewRef = useRef<HTMLDivElement>({} as HTMLDivElement)

  const [firstSquadPlayers, setFirstSquad] = useState<Array<MatchPlayerProps>>([])
  const [reservePlayers, setBench] = useState<Array<MatchPlayerProps>>([])

  const players = useMemo(() => data.matchPlayers.edges.map((edge) => edge.node), [])

  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)
  // Cannot get data from coming props, because i want to make widgets common if the preview is enabled
  const widgets = useSelector(getWidgets)

  useEffect(() => {
    const firstSquadPlayers: Array<MatchPlayerProps> = [],
      reservePlayers: Array<MatchPlayerProps> = []

    players.forEach((player) => {
      if (player.stats.first_squad && player.player) {
        if (player.stats.first_squad) {
          firstSquadPlayers.push(player)
        } else {
          reservePlayers.push(player)
        }
      }
    })
    setFirstSquad(firstSquadPlayers)
    setBench(reservePlayers)
  }, [])

  return (
    <LayoutTransition>
      <Seo description={`Mecz dnia - ${data.match.date}, ${data.match.host_name} przeciwko ${data.match.guest_name} `} title={`${data.match.host_name} vs ${data.match.guest_name} - ${pageTitle}`}/>
      <Helmet>
        <title>{`${data.match.host_name} vs ${data.match.guest_name} - ${pageTitle}`}</title>
      </Helmet>
      <Tabs
        mainSquadRef={firstSquadPlayers.length > 0 ? mainSquadRef : null}
        benchRef={reservePlayers.length > 0 ? benchRef : null}
        timelineRef={data.events.nodes.length > 0 ? timelineRef : null}
        previewRef={previewRef}
      />

      <Container className={classes.preview__wrapper}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={widgets.length > 0 ? 8 : 12}>
            <MatchPreview
              mainSquadRef={mainSquadRef}
              benchRef={benchRef}
              timelineRef={timelineRef}
              previewRef={previewRef}
              mainSquad={firstSquadPlayers}
              bench={reservePlayers}
              events={data.events.nodes}
              match={data.match}
            />
          </Grid>
          {widgets.length > 0 && (
            <Grid item xs={12} md={4}>
              <Widgets widgets={widgets} />
            </Grid>
          )}
        </Grid>
      </Container>
    </LayoutTransition>
  )
}

export const query = graphql`
  query Match($matchId: Int!) {
    prismicGeneral {
      ...PrismicGeneralFragment
    }

    teams: allProtrainupTeam(filter: { hidden_at: { eq: null } }) {
      nodes {
        slug
        team_id
        team_name
        age_group

      }
    }

    events: allProtrainupMatchEvent(filter: { player: { match_id: { eq: $matchId } } }, sort: { fields: minute }) {
      ...ProtrainupMatchEventConnectionFragment
    }

    matchPlayers: allProtrainupPlayerMatch(filter: { match_id: { eq: $matchId }, player_id: { ne: null } }) {
      ...ProtrainupPlayerMatchConnectionFragment
    }

    match: protrainupMatch(match_id: { eq: $matchId }) {
      ...ProtrainupMatchFragment
    }
  }
`

export default React.memo(Match)
