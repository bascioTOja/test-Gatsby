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

const IndexTemplate = (
  props: { transitionStatus: typeof TransitionStatutes[number] } & PageProps<TeamTemplateQueryProps & MainPageProps>
) => {
  const { data } = props

  const teamBaner = data.team.annual_seasons.find((season) => season.season?.name === data.prismicGeneral.data.active_season.document?.data.season_name.text)?.season
    ?.team_image?.childImageSharp.gatsbyImageData

  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <ErrorBoundary>
        <Seo
          imgSrc={data.team.system_club?.crest_url}
          title={`${data.team.team_name} - ${pageTitle}`}
          description={`Drużyna ${data.team.team_name}`}
        />
        <Baner
          banerHeight={teamBaner && teamBaner.width > teamBaner.height ? 'max(60vh, 40rem)' : undefined}
          alt={`Zdjęcie nagłówkowe drużyny ${data.team.team_name}`}
          gatsbyImage={teamBaner}
          text={data.team.team_name}
        />
        <MainContent {...data} />
      </ErrorBoundary>
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

      annual_seasons {
        season {
          name
          team_image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
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
