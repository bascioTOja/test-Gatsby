import Grid from '@material-ui/core/Grid'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import _ from 'lodash'
import React from 'react'

import GetNotImageAvailablePNG from '../../../gatsby/queries/getNotImageAvailablePNG'
import * as classes from './style.module.css'

const Result = ({ match }: { match: MatchProps }) => {
  const guestCrest = _.get(match, 'guest_crest.childImageSharp.gatsbyImageData', GetNotImageAvailablePNG())
  const hostCrest = _.get(match, 'host_crest.childImageSharp.gatsbyImageData', GetNotImageAvailablePNG())

  return (
    <Grid container className={classes.result__grid}>
      <Grid item xs={12} sm={5} className={classes.result__item}>
        <div className={classes.team}>
          <div>
            <GatsbyImage image={hostCrest ? hostCrest : GetNotImageAvailablePNG()} alt="Herb drużyny gospodarzy" />
          </div>
          <div className={classes.team__name}>
            <span>{match.host_name}</span>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={2} className={classes.result__item}>
        <div className={classes.score}>
          <span>
            {match.result_team_1 !== null ? match.result_team_1 : '-'} : {match.result_team_2 !== null ? match.result_team_2 : '-'}
          </span>
        </div>
      </Grid>
      <Grid item xs={12} sm={5} className={classes.result__item}>
        <div className={`${classes.team} ${classes.opponent_team}`}>
          <div className={classes.team__name}>
            <span>{match.guest_name}</span>
          </div>
          <div>
            <GatsbyImage alt="Herb drużyny gości" image={guestCrest ? guestCrest : GetNotImageAvailablePNG()} />
          </div>
        </div>
      </Grid>
    </Grid>
  )
}

export default React.memo(Result)
