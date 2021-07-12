import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Modal from '@material-ui/core/Modal'
import chroma from 'chroma-js'
import dayjs from 'dayjs'
import { GatsbyImage } from 'gatsby-plugin-image'
import { TrainingProps } from 'gatsby-source-protrainup/typescript/types/training'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getSecondaryColor } from '../../../redux/selectors'
import StaffTree from './staffTree'
import * as classes from './style.module.css'

type Props = {
  isOpen: boolean
  onClose: () => void
  teamName: string
  training: TrainingProps
}

const EventModal = ({ isOpen, onClose, teamName, training }: Props) => {
  const { t } = useTranslation()
  const secondaryColor = useSelector(getSecondaryColor)

  return (
    <Modal
      disableAutoFocus
      disableEnforceFocus
      disableRestoreFocus
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      closeAfterTransition
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      open={isOpen}
      onClose={() => onClose()}
    >
      <Fade in={isOpen}>
        <div
          className={classes.paper}
          style={{
            borderTop: `0.4rem solid ${secondaryColor ? chroma(secondaryColor).alpha(0.6).css() : 'transparent'}`,
            borderRadius: '1rem'
          }}
        >
          <div className={classes.team__logo}>
            {training.team?.system_club?.crest?.childImageSharp.gatsbyImageData && (
              <GatsbyImage
                className={classes.team__crest}
                image={training.team?.system_club?.crest?.childImageSharp.gatsbyImageData}
                alt="Herb drużyny"
              />
            )}
          </div>
          <div className={classes.event}>
            <header>
              <h4 className={classes.header__text} style={{ fontWeight: 'bold', textAlign: 'center' }}>
                {teamName}
              </h4>
            </header>
            <section>
              <header className={classes.details__header}>
                <h4 className={classes.header__text} style={{ fontWeight: 'lighter' }}>
                  {t('training-details')}:
                </h4>
              </header>
              <main className={classes.details__main}>
                <div className={classes.details__item}>
                  <p>
                    <span>
                      <b>{t('Description')}</b>:
                    </span>
                    {training.description !== '' ? training.description : '-'}
                  </p>
                </div>
                <div className={classes.details__item}>
                  <p>
                    <span>
                      <b>{t('Date')}</b>:
                    </span>
                    {dayjs(training.date).format('YYYY-MM-DD')}({training.hour})
                  </p>
                </div>
                {training.location !== '' && (
                  <div className={classes.details__item}>
                    <p>
                      <span>{t('Place')}: </span>
                      {training.location}
                    </p>
                  </div>
                )}
                <div className={classes.details__item}>
                  <StaffTree staff={training.staff} />
                </div>
              </main>
            </section>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default React.memo(EventModal)
