import Grid from '@material-ui/core/Grid'
import RemoveIcon from '@material-ui/icons/Remove'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as classes from './style.module.css'

type Props = {
  numberOfPlayers: number
  ageGroup?: number
  discipline: string
  country: string
}

const Info = ({ numberOfPlayers, ageGroup, discipline, country }: Props) => {
  const { t } = useTranslation()

  return (
    <main>
      <div>
        <header className={classes.team__header}>
          <h5>{t('team-information')}</h5>
        </header>
        <main>
          <Grid container className={classes.info}>
            <Grid item xs={12} sm={6} md={3} className={classes.info__item}>
              <h5>{t('number-of-players')}</h5>
              <span>{numberOfPlayers}</span>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.info__item}>
              <h5>{t('age-group')}</h5>
              <span>{ageGroup ? ageGroup : <RemoveIcon />}</span>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.info__item}>
              <h5>{t('Discipline')}</h5>
              <span>{t(discipline)}</span>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={classes.info__item}>
              <h5>{t('nationality')}</h5>
              <span>
                <img loading="lazy" src={`https://protrainup.info/assets/images/flags/${country.toLocaleLowerCase()}.png`} alt={`Kraj pochodzenia - ${country}`} />
              </span>
            </Grid>
          </Grid>
        </main>
      </div>
    </main>
  )
}

export default React.memo(Info)
