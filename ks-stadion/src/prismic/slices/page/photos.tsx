import FsLightbox from 'fslightbox-react'
import Img from 'gatsby-image'
import _ from 'lodash'
import React, { useState } from 'react'

import { PrismicPhotosSlice } from '../../types/contentSlices'
import * as classes from './style.module.css'

const PhotosSlice = ({ slice }: { slice: PrismicPhotosSlice }) => {
  const [toggler, setToggler] = useState<boolean>(false)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const imagesSource: Array<string> = _.compact(_.map(slice.items, 'photo.fluid.srcWebp'))

  const lightboxToggler = (index: number) => {
    setCurrentSlide(index)
    setToggler(!toggler)
  }

  console.log(slice)

  return (
    <div className={classes.photos__wrapper}>
      {slice.items.map((photo, index) => {
        if (!photo.photo.fixed) return null
        
        return (
          <div className={classes.photo__wrapper} key={index} onClick={() => lightboxToggler(index + 1)}>
            <Img
              className={classes.photo__image}
              fixed={photo.photo.fixed}
              alt={photo.photo.alt ? photo.photo.alt : 'Zagnieżdżone zdjęcie'}
            />
          </div>
        )
      })}
      <FsLightbox slide={currentSlide} toggler={toggler} sources={imagesSource} />
    </div>
  )
}

export default React.memo(PhotosSlice)
