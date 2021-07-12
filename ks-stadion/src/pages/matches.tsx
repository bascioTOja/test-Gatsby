import { CircularProgress } from '@material-ui/core'
import { graphql, PageProps } from 'gatsby'
import React, { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Baner from '../components/common/Baner'
import LayoutTransition from '../components/common/LayoutTransition'
import ColorProvider from '../components/common/Providers/color'
import Seo from '../components/common/Seo'
import { PrismicPageProps } from '../prismic/types'
import { getActiveSeason, getPageTitle } from '../redux/selectors'
import { MainPageProps, MatchesListQueryProps } from '../types'
import { LoadGeneralData } from '../utils'
import * as classes from './style.module.css'

const MatchesTable = lazy(() => import('../components/Match/matchesTable'))

const Matches = ({ data }: PageProps<MatchesListQueryProps & MainPageProps & { page: PrismicPageProps | null }>) => {
  const { t } = useTranslation()

  const baner = data.page?.data.baner.fluid
  const activeSeason = useSelector(getActiveSeason)
  const matches = data.matches.nodes.map((node) => node).filter((match) => match.season && match.season.name === activeSeason)
  const teamsInSeason = data.teams.nodes.filter((team) =>
    team.annual_seasons.some((season) => season.season && season.season.name === activeSeason)
  )

  const types: any = {}
  data.matches.distinct.forEach((type) => {
    types[type] = t(type)
  })

  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <Seo
        description={data.page?.data.description?.text}
        keywords={data.page?.data.keywords?.text}
        imgSrc={data.page?.data.baner.fluid?.srcWebp}
        title={`${data.page ? data.page.data.title.text : t('Matches')} - ${pageTitle}`}
      />
      <Baner alt="Baner meczy" text={t('Matches')} fluid={baner} />
      <div className={classes.paper}>
        {typeof window !== 'undefined' && (
          <Suspense
            fallback={
              <ColorProvider>
                <CircularProgress />
              </ColorProvider>
            }
          >
            <MatchesTable matches={matches} types={types} teams={teamsInSeason} />
          </Suspense>
        )}
      </div>
    </LayoutTransition>
  )
}

export default React.memo(Matches)

export const query = graphql`
  query MatchesList {
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

    page: prismicPage(uid: { eq: "matches" }) {
      data {
        title {
          text
        }

        description {
          text
        }

        keywords {
          text
        }

        baner {
          fluid {
            ...GatsbyPrismicImageFluid_withWebp
          }
        }
      }
    }

    matches: allProtrainupMatch(filter: { own_team: { gt: 0 } }) {
      distinct(field: type)
      nodes {
        date
        type
        name
        host_name
        guest_name
        own_team
        match_id
        result_team_1
        result_team_2

        host_crest {
          childImageSharp {
            fixed(width: 50) {
              srcWebp
            }
          }
        }

        guest_crest {
          childImageSharp {
            fixed(width: 50) {
              srcWebp
            }
          }
        }

        season {
          name
        }

        team {
          team_name
        }
      }
    }
  }
`
