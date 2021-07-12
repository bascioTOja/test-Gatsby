import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../common/Cards/headerCard'
import * as classes from './style.module.css'
import TeamItem from './team'

const TeamsList = ({ teams }: { teams: Array<TeamProps> }) => {
  const { t } = useTranslation()

  return (
    <Container className={classes.container}>
      <HeaderCard text={t('current-teams')} rounded={false} />
      <div className={classes.teams__list}>
        <Grid container spacing={3}>
          {teams.map((team) => (
            <TeamItem key={team.team_id} team={team} />
          ))}
        </Grid>
      </div>
    </Container>
  )
}

export default React.memo(TeamsList)
