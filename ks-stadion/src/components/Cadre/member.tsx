import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { MemberProps } from 'gatsby-source-protrainup/typescript/types/member'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import GetNotImageAvailablePNG from '../../gatsby/queries/getNotImageAvailablePNG'
import * as classes from './style.module.css'

const Member = ({ member }: { member: MemberProps }) => {
  const { t } = useTranslation()

  const avatar: IGatsbyImageData =
    _.get(member, 'user.avatar.childImageSharp.gatsbyImageData', GetNotImageAvailablePNG()) || GetNotImageAvailablePNG()
  const alt = member.user?.name ? `Avatar użytkownika ${member.user.name}` : 'Avatar użytkownika'; 

  return (
    <Paper>
      <div className={classes.member__card}>
        <div className={classes.card__avatar}>
          <GatsbyImage
            alt={alt}
            image={avatar}
            className={classes.avatar__img}
          />
        </div>
        <div className={classes.card__content}>
          <header className={classes.card__header}>
            <h3>
              {member.user ? member.user.name : '-'} <span className={classes.surname}>{member.user ? member.user.surname : '-'}</span>
            </h3>
          </header>
          <main className={classes.card__main}>
            <Grid container>
              <Grid item xs={6}>
                {t('nationality')}
              </Grid>
              <Grid item xs={6}>
                {member.user ? (
                  <img
                    className={classes.nationality__img}
                    src={`https://protrainup.info/assets/images/flags/${member.user.profile.country.toLocaleLowerCase()}.png`}
                    alt={`Kraj pochodzenia - ${member.user.profile.country}`}
                  />
                ) : (
                  '?'
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}>
                {t('phone')}
              </Grid>
              <Grid item xs={6}>
                <span className={classes.member__phone}>{_.get(member, 'user.profile.telephone', '-') || '-'}</span>
              </Grid>
            </Grid>
          </main>
        </div>
      </div>
    </Paper>
  )
}

export default React.memo(Member)
