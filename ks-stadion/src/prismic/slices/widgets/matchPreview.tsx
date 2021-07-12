import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import React from 'react'
import { useTranslation } from 'react-i18next'

import CommonLink from '../../../components/common/Link'
import MatchResult from '../../../components/common/Match/matchResult'
import More from './more'
import * as classes from './style.module.css'

const MatchPreview = ({ match }: { match: MatchProps }) => {
  const { t } = useTranslation()
  return (
    <Paper className={classes.paper}>
      <header className={classes.header}>
        <div className={classes.match__type}>
          <span>{t(match.type)}</span>
        </div>
        <div className={classes.match__date}>
          <span>{dayjs(match.date).format('HH:mm YYYY-MM-DD')}</span>
        </div>
      </header>
      <MatchResult match={match} />
      <CommonLink to={`/matches/${match.match_id}`}>
        <More />
      </CommonLink>
    </Paper>
  )
}

export default React.memo(MatchPreview)
