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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

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
      <ErrorBoundary>
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
      </ErrorBoundary>
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
