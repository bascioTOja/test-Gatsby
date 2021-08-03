import Container from '@material-ui/core/Container'
import { graphql, PageProps } from 'gatsby'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import TeamsList from '../components/Team/TeamsList'
import Baner from '../components/common/Baner'
import LayoutTransition from '../components/common/LayoutTransition'
import Seo from '../components/common/Seo'
import { PrismicPageProps } from '../prismic/types'
import { getActiveSeason, getPageTitle } from '../redux/selectors'
import { MainPageProps } from '../types'
import { LoadGeneralData } from '../utils'
import * as classes from './style.module.css'

const Teams = ({ data }: PageProps<MainPageProps & { page: PrismicPageProps | null }>) => {
  const baner = data.page?.data.baner.fluid
  const { t } = useTranslation()

  LoadGeneralData(data)
  const activeSeason = useSelector(getActiveSeason)
  const pageTitle = useSelector(getPageTitle)

  const teamsInSeason = useMemo(
    () => data.teams.nodes.filter((team) => team.annual_seasons.some((season) => season.season?.name === activeSeason)),
    [data]
  )

  return (
    <LayoutTransition>
      <Seo
        description={data.page?.data.description?.text}
        keywords={data.page?.data.keywords?.text}
        imgSrc={data.page?.data.baner.fluid?.srcWebp}
        title={`${data.page ? data.page.data.title.text : t('current-teams')} - ${pageTitle}`}
      />
      <Baner text={`Baner strony z drużynami w sezonie - ${activeSeason}`} alt={t('current-teams')} fluid={baner} />
      {teamsInSeason.length > 0 ? (
        <TeamsList teams={teamsInSeason} />
      ) : (
        <Container className={classes.list__empty}>
          <h1>Brak drużyn w tym sezonie</h1>
        </Container>
      )}
    </LayoutTransition>
  )
}

export const query = graphql`
  query Teams {
    prismicGeneral {
      ...PrismicGeneralFragment
    }

    page: prismicPage(uid: { eq: "teams" }) {
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
          fluid {
            ...GatsbyPrismicImageFluid_withWebp
          }
        }
      }
    }

    teams: allProtrainupTeam(filter: { hidden_at: { eq: null } }) {
      nodes {
        slug
        team_id
        team_name
        name
        color
        club_name
        country
        age_group

        annual_seasons {
          season {
            name
            team_image {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 600, placeholder: BLURRED)
              }
            }
          }
        }

        main_coach {
          user {
            full_name
          }
        }
        system_club {
          crest {
            childImageSharp {
              gatsbyImageData(layout: FIXED, width: 200, height: 200, placeholder: BLURRED)
            }
          }
        }
      }
    }
  }
`

export default React.memo(Teams)
