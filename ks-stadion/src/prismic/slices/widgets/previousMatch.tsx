import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../../components/common/Cards/headerCard'
import NextMatches from '../../../gatsby/queries/nextMatches'
import PreviousMatches from '../../../gatsby/queries/previousMatches'
import MatchPreview from './matchPreview'
import * as classes from './style.module.css'

const PreviousMatch = ({ styles }: { styles?: React.CSSProperties }) => {
  const { previousMatches } = PreviousMatches()
  const { nextMatches } = NextMatches()
  const [previousMatch, setPreviousMatch] = useState<MatchProps | undefined>(undefined)
  const { t } = useTranslation()

  dayjs.extend(isSameOrAfter)
  useEffect(() => {
    const previousMatchTemp = nextMatches.reverse().some((edge) => dayjs().isSameOrAfter(edge.date))
      ? nextMatches.reverse().find((edge) => dayjs().isSameOrAfter(edge.date))
      : previousMatches.find((match) => dayjs().isSameOrAfter(match.date))

    setPreviousMatch(previousMatchTemp)
  }, [])
  return (
    <Box style={styles}>
      <HeaderCard text={t('last-match')} rounded={false} />
      <Box>
        {previousMatch ? (
          <MatchPreview match={previousMatch} />
        ) : (
          <Paper className={classes.content} square={true}>
            <span className={classes.not__planed}>Brak poprzedniego meczu</span>
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default React.memo(PreviousMatch)
