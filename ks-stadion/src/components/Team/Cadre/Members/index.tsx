import Grid from '@material-ui/core/Grid'
import { MemberProps } from 'gatsby-source-protrainup/typescript/types/member'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../../common/Cards/headerCard'
import Card from './memberCard'
import * as classes from './style.module.css'

const Members = React.forwardRef((props: { members: Array<MemberProps> }, ref: React.Ref<HTMLDivElement>) => {
  const { t } = useTranslation()

  return (
    <div className={classes.wrapper} id="cadre" ref={ref}>
      <HeaderCard text={t('Crew')} rounded={false} />
      <main className={classes.members}>
        <Grid container spacing={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
          {props.members.map((member) => (
            <Fragment key={member.id}>{!member.user ? <h1>{t('no-data')}</h1> : <Card member={member} />}</Fragment>
          ))}
        </Grid>
      </main>
    </div>
  )
})

export default React.memo(Members)
