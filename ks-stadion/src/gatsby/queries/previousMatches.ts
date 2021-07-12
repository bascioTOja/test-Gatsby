import dayjs from 'dayjs'
import { graphql, useStaticQuery } from 'gatsby'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import { useSelector } from 'react-redux'

import { getActiveSeason } from '../../redux/selectors'

const PreviousMatchesQuery = (): { previousMatches: Array<MatchProps> } => {
  const query = graphql`
    {
      previousMatches: allProtrainupMatch(filter: { is_future: { eq: false }, own_team: { gt: 0 } }, sort: { fields: date, order: DESC }) {
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
  `

  const data: {
    previousMatches: { group: Array<{ nodes: Array<MatchProps>; fieldValue: string }> }
  } = useStaticQuery(query)

  const activeSeason = useSelector(getActiveSeason)
  const previousMatchesInSeason = data.previousMatches.group.find((group) => group.fieldValue === activeSeason)

  const sortedData = previousMatchesInSeason
    ? previousMatchesInSeason.nodes.sort((a, b) => dayjs(a.date).toDate().getTime() + dayjs(b.date).toDate().getTime())
    : []
  return { previousMatches: sortedData }
}

export default PreviousMatchesQuery
