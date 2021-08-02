import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { useSelector } from 'react-redux'

import MainContent from '../../components/Team'
import Baner from '../../components/common/Baner'
import LayoutTransition from '../../components/common/LayoutTransition'
import Seo from '../../components/common/Seo'
import { getPageTitle } from '../../redux/selectors'
import { MainPageProps, TeamTemplateQueryProps, TransitionStatutes } from '../../types'
import { LoadGeneralData } from '../../utils'

const IndexTemplate = (
  props: { transitionStatus: typeof TransitionStatutes[number] } & PageProps<TeamTemplateQueryProps & MainPageProps>
) => {
  const { data } = props

  // const teamBaner = data.team.annual_seasons.find((season) => season.season?.name === data.prismicGeneral.data.active_season.document?.data.season_name.text)?.season
  //   ?.team_image?.childImageSharp.gatsbyImageData

  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <Seo
        imgSrc={data.team.system_club?.crest_url}
        title={`${data.team.team_name} - ${pageTitle}`}
        description={`Drużyna ${data.team.team_name}`}
      />
      <Baner
        // banerHeight={teamBaner && teamBaner.width > teamBaner.height ? 'max(60vh, 40rem)' : undefined}
        banerHeight='max(60vh, 40rem)'
        alt={`Zdjęcie nagłówkowe drużyny ${data.team.team_name}`}
        // gatsbyImage={teamBaner}
        text={data.team.team_name}
      />
      <MainContent {...data} />
    </LayoutTransition>
  )
}

export const query = graphql`
  query Team($teamId: Int!, $clubId: Int!) {
    prismicGeneral {
      ...PrismicGeneralFragment
    }

    teams: allProtrainupTeam(filter: { hidden_at: { eq: null } }) {
      nodes {
        slug
        team_id
        team_name
        age_group

        annual_seasons {
          season {
            name
          }
        }
      }
    }

    team: protrainupTeam(team_id: { eq: $teamId }) {
      team_id
      team_name
      age_group
      discipline
      country
      color
    }

    members: allProtrainupMember(filter: { team_id: { eq: $teamId } }) {
      nodes {
        id
        type

        season {
          name
        }

        user {
          full_name
          email
          avatar {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 180, height: 180, placeholder: BLURRED)
            }
          }
          profile {
            telephone
          }
        }
      }
    }

    trainings: allProtrainupTraining(filter: { team_id: { eq: $teamId } }) {
      nodes {
        title
        description
        date
        hour
        location
        staff {
          full_name
          role
        }

        team {
          system_club {
            crest {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 150)
              }
            }
          }
        }
      }
    }

    club: protrainupSystemClub(system_club_id: { eq: $clubId }) {
      name
      crest {
        childImageSharp {
          gatsbyImageData(layout: FIXED, width: 80, height: 80, placeholder: BLURRED)
        }
      }
    }

    lastMatch: allProtrainupMatch(
      filter: { team_id: { eq: $teamId }, is_future: { eq: false }, own_team: { gt: 0 } }
      sort: { fields: date, order: DESC }
      limit: 1
    ) {
      nodes {
        ...ProtrainupMatchFragment
      }
    }

    players: allProtrainupPlayer(filter: { team_id: { eq: $teamId }, position: { ne: null } }) {
      totalCount

      nodes {
        id
        position
        number

        season {
          name
        }

        user {
          full_name
          avatar {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 180, height: 180, placeholder: BLURRED)
            }
          }
        }

        match_stats_summary {
          matches
          red_cards
          yellow_cards
          scores
          assists
          minutes
        }
      }
    }
  }
`

export default React.memo(IndexTemplate)
