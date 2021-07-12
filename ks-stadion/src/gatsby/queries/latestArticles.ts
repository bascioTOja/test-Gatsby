import { graphql, useStaticQuery } from 'gatsby'

import { PrismicArticleProps } from '../../prismic/types'

const FetchLatestArticles = (): { allPrismicArticle: { nodes: Array<PrismicArticleProps> } } => {
  const query = graphql`
    {
      allPrismicArticle(filter: { data: { title: { text: { ne: "" } } } }, limit: 3, sort: { fields: last_publication_date, order: DESC }) {
        nodes {
          _previewable
          uid
          data {
            title {
              text
            }
            photo {
              thumbnails {
                thumb {
                  fixed(width: 400, height: 230) {
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
  const data: { allPrismicArticle: { nodes: Array<PrismicArticleProps> } } = useStaticQuery(query)
  return data
}

export default FetchLatestArticles
