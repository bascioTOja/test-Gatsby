import { Container } from '@material-ui/core'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import { graphql, PageProps } from 'gatsby'
import { withUnpublishedPreview } from 'gatsby-source-prismic'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import React from 'react'

import LayoutTransition from '../components/common/LayoutTransition'
import CommonLink from '../components/common/Link'
import Seo from '../components/common/Seo'
import { PrismicGeneralProps } from '../prismic/types'
import AlbumTemplate from '../templates/Album'
import ArticleTemplate from '../templates/Article'
import PageTemplate from '../templates/Page'
import { LoadGeneralData } from '../utils'
import * as classes from './style.module.css'

const NotFoundPage = ({ data }: PageProps<PrismicGeneralProps & { teams: { nodes: Array<TeamProps> } }>) => {
  LoadGeneralData(data)
  const pageTitle = data.prismicGeneral.data.title.text

  return (
    <LayoutTransition>
      <Seo title={`404 - ${pageTitle}`} imgSrc={data.prismicGeneral.data.logo.fixed?.srcWebp} />
      <Container className={classes.page__404}>
        <h1>
          <SentimentVeryDissatisfiedIcon />
        </h1>
        <h2>404</h2>
        <h3>Nie znaleziono strony :(</h3>
        <CommonLink className={classes.link__404} to="/">
          Wróć na stronę główną!
        </CommonLink>
      </Container>
    </LayoutTransition>
  )
}

export const query = graphql`
  query {
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
  }
`

// e.g., If an unpublished `page` document is previewed, PageTemplate will be rendered.
export default withUnpublishedPreview(React.memo(NotFoundPage), {
  templateMap: {
    album: AlbumTemplate,
    prismicAlbum: AlbumTemplate,
    article: ArticleTemplate,
    prismicArticle: ArticleTemplate,
    page: PageTemplate,
    prismicPage: PageTemplate
  }
})
