import { graphql, PageProps } from 'gatsby'
import React from 'react'
import { useSelector } from 'react-redux'

import NewsComponent from '../components/News'
import Baner from '../components/common/Baner'
import LayoutTransition from '../components/common/LayoutTransition'
import { PrismicArticleProps, PrismicPageProps } from '../prismic/types'
import { getPageTitle } from '../redux/selectors'
import { MainPageProps } from '../types'
import { LoadGeneralData } from '../utils'
import Seo from '../components/common/Seo'

type Props = {
  page: PrismicPageProps | null
  articles: {
    tags: Array<string>
    nodes: Array<PrismicArticleProps>
  }
}

const News = ({ data }: PageProps<MainPageProps & Props>) => {
  const baner = data.page?.data.baner.fluid
  LoadGeneralData(data)
  const pageTitle = useSelector(getPageTitle)

  return (
    <LayoutTransition>
      <Seo
        description={data.page?.data.description?.text}
        keywords={data.page?.data.keywords?.text}
        imgSrc={data.page?.data.baner.fluid?.srcWebp}
        title={`${data.page ? data.page.data.title.text : 'Aktualności'} - ${pageTitle}`}
      />
      <Baner text="Aktualności" fluid={baner} />
      <NewsComponent tags={data.articles.tags} articles={data.articles.nodes} />
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

    page: prismicPage(uid: { eq: "news" }) {
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

    articles: allPrismicArticle(sort: { fields: last_publication_date, order: DESC }) {
      tags: distinct(field: tags)
      nodes {
        last_publication_date
        uid
        tags
        data {
          title {
            text
          }
          caption {
            text
          }
          photo {
            thumbnails {
              thumb {
                fixed(width: 400) {
                  ...GatsbyPrismicImageFixed_withWebp
                }
              }
            }
          }

          category {
            document {
              ... on PrismicCategory {
                data {
                  category_name {
                    text
                  }
                  color
                }
              }
            }
          }
        }
      }
    }
  }
`

export default React.memo(News)
