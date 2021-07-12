import { graphql, PageProps } from 'gatsby'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import LeagueTables from '../components/LeagueTables'
import Baner from '../components/common/Baner'
import LayoutTransition from '../components/common/LayoutTransition'
import Seo from '../components/common/Seo'
import { PrismicPageProps } from '../prismic/types'
import { getActiveSeason, getPageTitle } from '../redux/selectors'
import { LeaguePageProps, MainPageProps } from '../types'
import { LoadGeneralData } from '../utils'

const LeagueTable = ({ data }: PageProps<LeaguePageProps & MainPageProps & { page: PrismicPageProps | null }>) => {
  const baner = data.page?.data.baner.fluid
  const { t } = useTranslation()

  LoadGeneralData(data)
  const activeSeason = useSelector(getActiveSeason)
  const pageTitle = useSelector(getPageTitle)

  const leaguesInSeason = data.leaguesData.nodes.filter((league) => league.game.season.name === activeSeason)

  const banerAlt = data.page?.data.baner.alt ? data.page?.data.baner.alt : 'Baner tabeli ligowej'

  // Show only leagues which occurs we are searching for in the league
  return (
    <LayoutTransition>
      <Seo
        description={data.page && data.page.data.description ? data.page.data.description.text : 'Tabla ligowa dla strony internetowej'}
        imgSrc={baner && !!baner.srcWebp ? baner.srcWebp : undefined}
        keywords={data.page && data.page.data.keywords ? data.page.data.keywords.text : undefined}
        title={`${data.page ? data.page.data.title.text : t('league-table')} - ${pageTitle}`}
      />
      <Baner text={t('league-table')} alt={banerAlt} fluid={baner} />
      <LeagueTables teams={data.teams.nodes} leaguesData={leaguesInSeason} />
    </LayoutTransition>
  )
}

export const PageQuery = graphql`
  {
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

    page: prismicPage(uid: { eq: "330-2" }) {
      data {
        title {
          text
        }

        keywords {
          text
        }

        description {
          text
        }

        baner {
          alt
          fluid {
            ...GatsbyPrismicImageFluid_withWebp
          }
        }
      }
    }

    leaguesData: allProtrainupLeagueStats {
      nodes {
        game_id
        club_name
        crest_url

        game {
          name
          season {
            name
          }
        }

        team {
          team_name
        }

        leagueStats {
          draws
          goalDifference
          loseGoals
          losses
          matches
          scores
          wins
          points
          position
        }
      }
    }
  }
`

export default React.memo(LeagueTable)
