import { makeStyles } from '@material-ui/core'
import { RichText } from 'prismic-reactjs'
import React from 'react'
import { useSelector } from 'react-redux'

import { getMainColor } from '../../../redux/selectors'
import { linkResolver } from '../../../utils/linkResolver'
import { PrismicContentSlice } from '../../types/contentSlices'
import * as classes from './style.module.css'

const useStyles = makeStyles({
  main__color: (props: React.CSSProperties) => ({
    '&::after': {
      backgroundColor: props.backgroundColor
    }
  })
})

const ContentSlice = ({ slice }: { slice: PrismicContentSlice }) => {
  const {
    primary: {
      show_separator,
      separator_text,
      content: { raw }
    }
  } = slice

  const mainColor = useSelector(getMainColor)
  const dynamicStyle = useStyles({ backgroundColor: mainColor ? mainColor : '#FFCF40' })
  return (
    <div className={classes.slice__content}>
      {show_separator && (
        <div className={`${classes.separator} ${dynamicStyle.main__color}`}>
          <h3>{separator_text.text}</h3>
        </div>
      )}
      <RichText render={raw} linkResolver={linkResolver} />
    </div>
  )
}

export default React.memo(ContentSlice)
