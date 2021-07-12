import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { MemberProps } from 'gatsby-source-protrainup/typescript/types/member'
import React from 'react'
import { useSelector } from 'react-redux'

import { getWidgets } from '../../redux/selectors'
import Widgets from '../common/Widgets'
import Members from './members'
import * as classes from './style.module.css'

const Cadre = ({ members }: { members: Array<MemberProps> }) => {
  const widgets = useSelector(getWidgets)

  return (
    <Container className={classes.wrapper}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={widgets.length > 0 ? 8 : 12}>
          <Members members={members} />
        </Grid>
        {widgets.length > 0 && (
          <Grid item xs={12} md={4}>
            <Widgets widgets={widgets} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default React.memo(Cadre)
