import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import chroma from 'chroma-js'
import Img from 'gatsby-image'
import React from 'react'
import { useSelector } from 'react-redux'

import { getSecondaryColor } from '../../../redux/selectors'
import { PrismicCustomButtonSlice } from '../../types/widgets'
import * as classes from './style.module.css'

const CustomButton = ({
  slice: {
    primary: {
      color,
      caption,
      link: { url, target },
      photo: { alt, fixed }
    }
  }
}: {
  slice: PrismicCustomButtonSlice
}) => {
  // If title is a array, it is a preview, so get first element of array
  const text = caption.text
  const secondaryColor = useSelector(getSecondaryColor)

  if (!url && !text) return null

  const alternativeText = alt ? alt : "Zdjęcie miniaturkowe przycisku"

  const textColor = chroma.contrast(color ? color : secondaryColor || '#FFF', 'white') > 2 ? 'white' : 'black'

  return (
    <div className={`${classes.custom__button}`} style={{ backgroundColor: color && color !== '' ? color : secondaryColor || '#FFF' }}>
      <a rel="noopener" href={url !== '' ? url : '#'} target={target} className={classes.custom__button__anchor}>
        <div className={classes.custom__button_prefix__img}>
          {fixed && (
            <Img
              className={classes.custom__button__image__wrapper}
              imgStyle={{ width: '100%', height: '100%' }}
              fixed={fixed}
              alt={alternativeText}
            />
          )}
        </div>

        <div className={classes.button__content}>
          <span style={{ marginTop: '.8rem', color: textColor }} className={`${classes.caption} ${classes.caption1}`}>
            {text}
          </span>
        </div>
        <div className={classes.plus__icon}>
          <AddCircleOutlineIcon />
        </div>
      </a>
    </div>
  )
}

export default React.memo(CustomButton)
