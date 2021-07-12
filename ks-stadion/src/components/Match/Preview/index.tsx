import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import extractEvents from 'gatsby-source-protrainup/services/groupByEvent'
import { MatchEventProps, MatchPlayerProps, MatchProps } from 'gatsby-source-protrainup/typescript/types/match'
import React from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../common/Cards/headerCard'
import Squad from './Squad'
import Timeline from './Timeline'
import Result from './result'
import ScoresInfo from './scoresInfo'
import Statistics from './statistics'
import * as classes from './style.module.css'

type Props = {
  mainSquadRef: React.MutableRefObject<HTMLDivElement>
  benchRef: React.MutableRefObject<HTMLDivElement>
  timelineRef: React.MutableRefObject<HTMLDivElement>
  previewRef: React.MutableRefObject<HTMLDivElement>
  match: MatchProps
  events: Array<MatchEventProps>
  mainSquad: Array<MatchPlayerProps>
  bench: Array<MatchPlayerProps>
}

const MatchPreview = ({ match, events, mainSquad, bench, mainSquadRef, benchRef, timelineRef, previewRef }: Props) => {
  const { t } = useTranslation()

  const data = extractEvents(events)

  return (
    <div style={{ marginBottom: '3rem', paddingBottom: '5.9rem' }}>
      <div ref={previewRef}>
        <HeaderCard rounded={false} text={t('match-preview')} />
        <Paper square={true}>
          <main>
            <header className={classes.preview__header}>
              <span>{t(match.type)}</span>
              <time>{dayjs(match.date).format('DD-MM-YYYY HH:mm')}</time>
            </header>
            <Result match={match} />
            {data.hostEvents || data.guestEvents ? <ScoresInfo hostStats={data.hostEvents} guestStats={data.guestEvents} /> : null}

            {match.host_stats || match.guest_stats ? <Statistics hostStats={match.host_stats} guestStats={match.guest_stats} /> : null}

            <Timeline ref={timelineRef} events={events} />
          </main>
        </Paper>
      </div>
      {mainSquad.length > 0 ? <Squad ref={mainSquadRef} players={mainSquad} headerText={t('match-squad')} /> : null}
      {bench.length > 0 ? <Squad ref={benchRef} players={bench} headerText={t('reserve-bench')} /> : null}
    </div>
  )
}

export default React.memo(MatchPreview)
