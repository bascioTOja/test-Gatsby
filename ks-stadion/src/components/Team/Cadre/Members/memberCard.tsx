import Grid from '@material-ui/core/Grid'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MemberProps } from 'gatsby-source-protrainup/typescript/types/member'
import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import GetNotImageAvailablePNG from '../../../../gatsby/queries/getNotImageAvailablePNG'
import Badge from '../../../common/Badge'
import FlipCard from '../../../common/FlipCard'
import * as classes from './style.module.css'

const Card = ({ member }: { member: MemberProps }) => {
  const { t } = useTranslation()

  const header = (
    <header className={classes.image__wrapper}>
      <GatsbyImage
        className={classes.avatar}
        alt={`Avatar członka kadry ${member.user?.name ? member.user?.name : '' }`}
        image={_.get(member, 'user.avatar.childImageSharp.gatsbyImageData', GetNotImageAvailablePNG())}
      />
    </header>
  )

  const frontCard = (
    <>
      {header}
      <div className={classes.card__main}>
        <span className={classes.member__name}>{member.user ? member.user.full_name : t('no-data')}</span>
        <Badge text={t(member.type)} />
      </div>
    </>
  )

  const backCard = (
    <>
      {header}
      <div className={classes.card__main}>
        <span className={classes.member__name}>{member.user ? member.user.full_name : t('no-data')}</span>
        <span className={classes.phone}>{member.user && member.user.profile.telephone ? member.user.profile.telephone : '-'}</span>
        <span className={classes.email}>{member.user ? member.user.email : '-'}</span>
      </div>
    </>
  )

  return (
    <Grid item xs={12} sm={6} md={4}>
      <FlipCard frontCard={frontCard} backCard={backCard} />
    </Grid>
  )
}

export default React.memo(Card)
