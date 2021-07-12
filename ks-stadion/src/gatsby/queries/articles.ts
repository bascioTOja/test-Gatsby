import { graphql, useStaticQuery } from 'gatsby'

import { PrismicArticleProps } from '../../prismic/types'

type ArticleQueryProps = {
  allPrismicArticle: {
    nodes: Array<PrismicArticleProps>
  }
}

const ArticlesQuery = (): ArticleQueryProps => {
  const query = graphql`
    {
      allPrismicArticle(
        filter: { data: { title: { text: { ne: "" } } } }
        limit: 3
        sort: { fields: last_publication_date, order: DESC }
        skip: 3
      ) {
        nodes {
          tags
          uid
          data {
            category {
              document {
                ... on PrismicCategory {
                  data {
                    color
                    category_name {
                      text
                    }
                  }
                }
              }
            }
            title {
              text
            }
            caption {
              text
            }
            photo {
              thumbnails {
                thumb {
                  fixed(width: 573, height: 392) {
                    ...GatsbyPrismicImageFixed_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `
  const data: ArticleQueryProps = useStaticQuery(query)
  return data
}

export default ArticlesQuery
