import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { PrismicSponsorProps } from '../../prismic/types'
import { getWidgets } from '../../redux/selectors'
import HeaderCard from '../common/Cards/headerCard'
import Widgets from '../common/Widgets'
import Articles from './Article'
import Latest from './Latest'
import Sponsors from './Sponsors'
import * as classes from './style.module.css'

const Main = ({ sponsors }: { sponsors: Array<PrismicSponsorProps> }) => {
  const widgets = useSelector(getWidgets)
  const { t } = useTranslation()

  return (
    <main className={classes.main}>
      <Container>
        <HeaderCard text={t('news')} />
        <Latest />
        <Grid container spacing={1} style={{ marginTop: '3rem' }}>
          <Grid item xs={12} md={widgets.length > 0 ? 8 : 12}>
            <Articles />
          </Grid>
          {widgets.length > 0 && (
            <Grid item xs={12} md={4}>
              <Widgets widgets={widgets} />
            </Grid>
          )}
        </Grid>
        <Sponsors sponsors={sponsors.filter((sponsor) => !!sponsor.link.url)} />
      </Container>
    </main>
  )
}

export default React.memo(Main)
