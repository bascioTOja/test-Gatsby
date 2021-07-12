import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../../components/common/Cards/headerCard'
import NextMatches from '../../../gatsby/queries/nextMatches'
import MatchPreview from './matchPreview'
import * as classes from './style.module.css'

const NextMatch = ({ styles }: { styles?: React.CSSProperties }) => {
  dayjs.extend(isSameOrBefore)
  const { t } = useTranslation()
  const [nextMatch, setNextMatch] = useState<MatchProps | undefined>(undefined)
  const { nextMatches } = NextMatches()

  useEffect(() => {
    const nextMatchTemp = nextMatches.find((match) => dayjs().isSameOrBefore(match.date))
    setNextMatch(nextMatchTemp)
  }, [])

  return (
    <Box style={styles}>
      <HeaderCard text={t('next-match')} rounded={false} />
      <Box>
        {nextMatch ? (
          <MatchPreview match={nextMatch} />
        ) : (
          <Paper square={true} style={{ border: 'none' }} elevation={0} className={classes.content}>
            <span className={classes.not__planed}>Następny mecz jest niezaplanowany</span>
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default React.memo(NextMatch)
