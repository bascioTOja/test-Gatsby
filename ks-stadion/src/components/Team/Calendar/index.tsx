import plLocale from '@fullcalendar/core/locales/pl'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Paper from '@material-ui/core/Paper'
import dayjs from 'dayjs'
import { TrainingProps } from 'gatsby-source-protrainup/typescript/types/training'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import HeaderCard from '../../common/Cards/headerCard'
import EventModal from './eventModal'
import * as classes from './style.module.css'

const Calendar = React.forwardRef((props: { trainings: Array<TrainingProps>; teamName: string }, ref: React.Ref<HTMLDivElement>) => {
  const { t } = useTranslation()
  const [selectedTraining, selectTraining] = useState<TrainingProps>({} as TrainingProps)
  const [isModalOpen, setModalState] = useState<boolean>(false)

  const eventsData = props.trainings.map((training) => ({
    trainingDetails: training,
    title: training.title,
    time: training.hour,
    date: dayjs(training.date).format('YYYY-MM-DD')
  }))

  const openModal = (training: TrainingProps) => {
    // Remove reference
    const trainingCopy: TrainingProps = JSON.parse(JSON.stringify(training))
    selectTraining(trainingCopy)
    setModalState(true)
  }

  const renderEventContent = (eventInfo: any) => {
    return (
      <div className={classes.fc__content} onClick={() => openModal(eventInfo.event.extendedProps.trainingDetails)}>
        <span className="fc-time">{eventInfo.event.extendedProps.time}</span>
        <span
          className="fc-title"
          style={{
            whiteSpace: 'break-spaces',
            textAlign: 'center',
            padding: '5px 0'
          }}
        >
          {eventInfo.event.title}
        </span>
      </div>
    )
  }

  return (
    <div className={classes.wrapper} id="schedule" ref={ref}>
      <HeaderCard text={t('training-schedule')} rounded={false} />
      <Paper className={classes.calendar} style={{ borderRadius: 0, margin: '0 1px' }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView={'dayGridWeek'}
          locale={plLocale}
          events={eventsData}
          views={{
            dayGridWeek: {
              duration: {days: typeof window !== 'undefined' && window.innerWidth > 960 ? 7 : 1}
            }
          }}
          eventContent={renderEventContent}
          eventBorderColor="#274e13"
          eventBackgroundColor="#274e13"
          height={250}
        />
      </Paper>
      <EventModal teamName={props.teamName} training={selectedTraining} isOpen={isModalOpen} onClose={() => setModalState(false)} />
    </div>
  )
})

export default React.memo(Calendar)
