import dayjs from 'dayjs'
import { graphql, useStaticQuery } from 'gatsby'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import { useSelector } from 'react-redux'

import { getActiveSeason } from '../../redux/selectors'

const NextMatchesQuery = (): { nextMatches: Array<MatchProps> } => {
  const data: {
    nextMatches: { group: Array<{ nodes: Array<MatchProps>; fieldValue: string }> }
  } = useStaticQuery(graphql`
    {
      nextMatches: allProtrainupMatch(filter: { is_future: { eq: true }, own_team: { gt: 0 } }, sort: { order: ASC, fields: date }) {
        group(field: season___name, limit: 3) {
          fieldValue
          nodes {
            season {
              name
            }
            match_id
            date
            name
            host_name
            guest_name
            guest_crest {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 70, height: 70, placeholder: BLURRED)
              }
            }
            host_crest {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 70, height: 70, placeholder: BLURRED)
              }
            }
            type
          }
        }
      }
    }
  `)
  const activeSeason = useSelector(getActiveSeason)
  const nextMatchesInSeason = data.nextMatches.group.find((group) => group.fieldValue === activeSeason)

  const sortedData = nextMatchesInSeason
    ? nextMatchesInSeason.nodes.sort((a, b) => dayjs(a.date).toDate().getTime() - dayjs(b.date).toDate().getTime())
    : []
  return { nextMatches: sortedData }
}

export default NextMatchesQuery
