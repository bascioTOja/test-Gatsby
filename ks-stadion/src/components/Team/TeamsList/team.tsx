import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { GatsbyImage } from 'gatsby-plugin-image'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import GetNotImageAvailablePNG from '../../../gatsby/queries/getNotImageAvailablePNG'
import { getActiveSeason, getSecondaryColor } from '../../../redux/selectors'
import CommonLink from '../../common/Link'
import * as classes from './style.module.css'

const TeamItem = ({ team }: { team: TeamProps }) => {
  const { t } = useTranslation()
  const activeSeason = useSelector(getActiveSeason)
  const secondaryColor = useSelector(getSecondaryColor)

  const teamCrest = _.get(team, 'system_club.crest.childImageSharp.gatsbyImageData', GetNotImageAvailablePNG())
  const teamImage = team.annual_seasons.find((season) => season.season?.name === activeSeason)?.season?.team_image?.childImageSharp
    .gatsbyImageData

  const useStyles = makeStyles({
    hover__secondary__color: {
      '&:hover': {
        backgroundColor: secondaryColor ? secondaryColor : 'transparent'
      }
    }
  })
  const styles = useStyles()

  return (
    <Grid item xs={12} md={6}>
      <div className={classes.team__card}>
        <section className={classes.extended__informations}>
          <div className={classes.card__color} style={{ backgroundColor: team.color }} />
          <h5 style={{ padding: '0 1rem', display: 'inline-block' }}>{team.team_name}</h5>
          {team.country && (
            <div>
              <img
                loading="lazy"
                src={`https://protrainup.info/assets/images/flags/${team.country.toLocaleLowerCase()}.png`}
                alt={`Kraj pochodzenia - ${team.country}`}
              />
            </div>
          )}
        </section>
        <header className={classes.crest}>
          <CommonLink to={`/teams/${team.slug}`}>
            <GatsbyImage image={teamImage ? teamImage : teamCrest} alt="Club crest" />
          </CommonLink>
        </header>
        <main className={classes.content}>
          <div>
            <b>{t('coach')}:</b> {team.main_coach && team.main_coach.user ? team.main_coach.user.full_name : t('no-data')}
          </div>
          <div>
            <b>{t('age-group')}:</b> {team.age_group ? team.age_group : '-'}
          </div>
        </main>
        <CommonLink to={`/teams/${team.slug}`} className={`${classes.more} ${styles.hover__secondary__color}`}>
          {t('more-information')}
        </CommonLink>
      </div>
    </Grid>
  )
}

export default React.memo(TeamItem)
