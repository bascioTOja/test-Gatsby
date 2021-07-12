import { graphql, useStaticQuery } from 'gatsby'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'

const FetchAllMatches = (): { matches: { edges: Array<{ node: MatchProps }> } } => {
  const query = graphql`
    {
      matches: allProtrainupMatch(filter: { own_team: { gt: 0 } }) {
        edges {
          node {
            date
            name
            host_name
            guest_name
            result_team_1
            result_team_2

            representation {
              team_name
            }

            host_crest {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 70, height: 70, placeholder: BLURRED)
              }
            }

            guest_crest {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 70, height: 70, placeholder: BLURRED)
              }
            }
          }
        }
      }
    }
  `
  const data: { matches: { edges: Array<{ node: MatchProps }> } } = useStaticQuery(query)

  return data
}

export default FetchAllMatches
