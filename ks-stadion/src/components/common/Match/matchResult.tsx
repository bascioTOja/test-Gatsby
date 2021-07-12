import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import React from 'react'

import ResultTeam from './resultTeam'
import * as classes from './style.module.css'

const MatchResult = ({ match }: { match: MatchProps }) => {
  return (
    <main>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <ResultTeam alt="Herb gospodarzy" crest={match.host_crest ? match.host_crest.childImageSharp.gatsbyImageData : null} clubName={match.host_name} />
        </Grid>
        <Grid item xs={12} sm={2} className={classes.match__vs}>
          {match.result_team_1 && match.result_team_2 ? (
            <Box>
              <span>
                {match.result_team_1} : {match.result_team_2}
              </span>
            </Box>
          ) : (
            <span>VS</span>
          )}
        </Grid>
        <Grid item xs={12} sm={5}>
          <ResultTeam alt="Herb gościa" crest={match.guest_crest?.childImageSharp.gatsbyImageData} clubName={match.guest_name} />
        </Grid>
      </Grid>
    </main>
  )
}

export default React.memo(MatchResult)
