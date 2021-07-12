import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import chroma from 'chroma-js'
import dayjs from 'dayjs'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getSecondaryColor } from '../../../redux/selectors'
import CommonLink from '../../common/Link'
import Club from './club'
import * as classes from './style.module.css'

const LastMatch = ({ lastMatch }: { lastMatch: MatchProps | null }) => {
  const { t } = useTranslation()
  const secondaryColor = useSelector(getSecondaryColor)
  const buttonColor = secondaryColor ? (chroma.contrast(chroma(secondaryColor), 'white') > 2 ? 'white' : 'black') : 'black'

  if (lastMatch === null) {
    return (
      <section>
        <Typography variant="h5" style={{ textAlign: 'center' }}>
          {t('no-matches-to-display')}
        </Typography>
      </section>
    )
  }

  return (
    <section>
      <header className={classes.team__header}>
        <h5>{t('last-match')}</h5>
      </header>
      <main>
        <div className={classes.profile__date}>
          <span>{dayjs(lastMatch.date).format('DD-MM-YYYY')}</span>
        </div>
        <Grid container className={classes.last__match}>
          <Grid item xs={12} md={4}>
            <Club
              alt="Herb drużyny gospodarzy"
              crest={_.get(lastMatch, 'host_crest.childImageSharp.gatsbyImageData', undefined)}
              name={lastMatch.host_name}
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.score}>
            <h3>
              {lastMatch.result_team_1 ? lastMatch.result_team_1 : '?'} - {lastMatch.result_team_2 ? lastMatch.result_team_2 : '?'}
            </h3>
            <span>{t('final-score')}</span>
          </Grid>
          <Grid item xs={12} md={4}>
            <Club
              alt="Herb drużyny gości"
              crest={_.get(lastMatch, 'guest_crest.childImageSharp.gatsbyImageData', undefined)}
              name={lastMatch.guest_name}
            />
          </Grid>
        </Grid>
      </main>
      <footer className={classes.footer}>
        <CommonLink to={`/matches?team_id=${lastMatch.team_id}`}>
          <Button
            variant="contained"
            className={classes.footer__button}
            style={{ backgroundColor: secondaryColor ? secondaryColor : 'transparent', color: buttonColor }}
          >
            {t('view-all-matches')}
          </Button>
        </CommonLink>
        <CommonLink to={`/matches/${lastMatch.match_id}`}>
          <Button
            variant="contained"
            className={classes.footer__button}
            style={{ backgroundColor: secondaryColor ? secondaryColor : 'transparent', color: buttonColor }}
          >
            {t('match-preview')}
          </Button>
        </CommonLink>
      </footer>
    </section>
  )
}

export default React.memo(LastMatch)
