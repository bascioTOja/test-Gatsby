import { graphql, PageProps } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ArticleComponent from '../../components/Article'
import LayoutTransition from '../../components/common/LayoutTransition'
import Seo from '../../components/common/Seo'
import { PrismicArticleProps } from '../../prismic/types'
import { isPreview } from '../../redux/selectors'
import { setPreview } from '../../redux/slices/preview'
import { MainPageProps } from '../../types'
import { LoadGeneralData } from '../../utils'

interface QueryProps {
  prismicArticle: PrismicArticleProps
}

const Article = ({ data }: PageProps<QueryProps & MainPageProps>) => {
  const dispatch = useDispatch()
  const article = data.prismicArticle
  const isPreviewMode = useSelector(isPreview)

  useEffect(() => {
    isPreviewMode && dispatch(setPreview('article'))
  }, [])

  LoadGeneralData(data)

  return (
    <LayoutTransition>
      <Seo
        imgSrc={article.data.photo.fixed?.srcWebp}
        title={`${article.data.title.text} - ${data.prismicGeneral.data.title.text}`}
        keywords={article.data.keywords?.text}
        description={article.data.description?.text}
      />
      <ArticleComponent article={article} />
    </LayoutTransition>
  )
}

export const query = graphql`
  query Article($uid: String!) {
    prismicArticle(uid: { eq: $uid }) {
      ...PrismicArticleFragment
    }

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

export default withPreview(React.memo(Article))
