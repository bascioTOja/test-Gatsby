import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useTranslation } from 'react-i18next'

import * as classes from './style.module.css'

const SquadHeader = () => {
  const { t } = useTranslation()

  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ lineHeight: '2.2rem' }} align="center" variant="head" classes={{ head: classes.table__header }}>
          {t('number')}
        </TableCell>
        <TableCell style={{ lineHeight: '2.2rem' }} align="center" variant="head" classes={{ head: classes.table__header }}>
          {t('first-and-last-name')}
        </TableCell>
        <TableCell style={{ lineHeight: '2.2rem' }} align="center" variant="head" classes={{ head: classes.table__header }}>
          {t('Actions')}
        </TableCell>
        <TableCell style={{ lineHeight: '2.2rem' }} align="center" variant="head" classes={{ head: classes.table__header }}>
          {t('time-on-field')}
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default React.memo(SquadHeader)
