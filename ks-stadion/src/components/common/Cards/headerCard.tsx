import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'

import { getMainColor } from '../../../redux/selectors'
import { HeaderCardProps } from '../../../types'
import * as classes from './style.module.css'

const useStyles = makeStyles({
  main__color: (props: React.CSSProperties) => ({
    '&::before': {
      backgroundColor: props.backgroundColor
    }
  })
})

const HeaderCard = ({ text, subText, rounded = true, styles }: HeaderCardProps) => {
  const mainColor = useSelector(getMainColor)
  const dynamicStyles = useStyles({ backgroundColor: mainColor ? mainColor : '#FFCF40' })

  return (
    <Paper className={`${classes.card} ${dynamicStyles.main__color}`} square={!rounded} elevation={0} style={styles}>
      <h4>{text}</h4>
      {subText && <h4 style={{ textAlign: 'right' }}>{subText}</h4>}
    </Paper>
  )
}

export default React.memo(HeaderCard)
