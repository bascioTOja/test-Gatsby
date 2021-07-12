import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import Img from 'gatsby-image'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState, useRef, Fragment } from 'react'
import { useSelector } from 'react-redux'
import ReactSlider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import GetCommonBaner from '../../../gatsby/queries/getCommonBanner'
import { getMainColor } from '../../../redux/selectors'
import { SlideProps } from '../../../types'
import CommonLink from '../../common/Link'
import * as classes from './slider.module.css'

const Slider = ({ slides }: { slides: Array<SlideProps> }) => {
  const [canSlide, setCanSlide] = useState<boolean>(true)
  const customSlider = useRef<ReactSlider | null>(null)
  const SLIDETIME = 1000

  const mainColor = useSelector(getMainColor)

  const disallowSlide = () => {
    setCanSlide(false)
    const tHandler = setTimeout(() => {
      setCanSlide(true)
    }, SLIDETIME + 100)
    return () => clearTimeout(tHandler)
  }

  const goNextHandler = () => {
    if (customSlider.current && canSlide) {
      disallowSlide()
      customSlider.current.slickNext()
    }
  }

  const goPrevHandler = () => {
    if (customSlider.current && canSlide) {
      disallowSlide()
      customSlider.current.slickPrev()
    }
  }

  const settings: Settings = {
    arrows: false,
    dots: false,
    infinite: true,
    draggable: false,
    autoplay: false,
    adaptiveHeight: true,
    speed: SLIDETIME,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <div className={classes.wrapper}>
      <span onClick={() => goPrevHandler()} className={classes.arrow}>
        <KeyboardArrowLeftIcon style={{ color: mainColor ? mainColor : '#FFCF40' }} />
      </span>
      <span onClick={() => goNextHandler()} className={[classes.right__arrow, classes.arrow].join(' ')}>
        <KeyboardArrowRightIcon style={{ color: mainColor ? mainColor : '#FFCF40' }} />
      </span>
      <ReactSlider ref={(slider) => (customSlider.current = slider)} {...settings} className={classes.slider}>
        {slides.map((slide) => (
          <Fragment key={slide.id}>
            {slide.isDocument ? (
              <CommonLink to={slide.url ? slide.url : '#'}>
                <div style={{ position: 'relative', height: '100%' }}>
                  <div className={classes.text__wrapper}>
                    <div className={classes.text__content}>
                      <h2 className={classes.text__title}>
                        {slide.title.text.slice(0, 30)}
                        {slide.title.text.length > 30 && '...'}
                      </h2>
                      <span className={classes.text__caption}>
                        {slide.caption.text.slice(0, 200)}
                        {slide.caption.text.length > 200 && '...'}
                      </span>
                    </div>
                  </div>
                  <div className={classes.background}>
                    {slide.picture.fluid ? (
                      <Img
                        style={{ minHeight: '100%' }}
                        fluid={slide.picture.fluid}
                        alt={slide.picture.alt ? slide.picture.alt : 'Zdjęcie slidera'}
                      />
                    ) : (
                      <GatsbyImage image={GetCommonBaner()} alt={slide.picture.alt ? slide.picture.alt : 'Zdjęcie slidera'} />
                    )}
                  </div>
                </div>
              </CommonLink>
            ) : (
              <div style={{ position: 'relative', height: '100%' }}>
                <div className={classes.text__wrapper}>
                  <div className={classes.text__content}>
                    <h2 className={classes.text__title}>
                      {slide.title.text.slice(0, 30)}
                      {slide.title.text.length > 30 && '...'}
                    </h2>
                    <span className={classes.text__caption}>
                      {slide.caption.text.slice(0, 200)}
                      {slide.caption.text.length > 200 && '...'}
                    </span>
                  </div>
                </div>
                <div className={classes.background}>
                  {slide.picture.fluid ? (
                    <Img
                      style={{ minHeight: '100%' }}
                      fluid={slide.picture.fluid}
                      alt={slide.picture.alt ? slide.picture.alt : 'Zdjęcie slidera'}
                    />
                  ) : (
                    <GatsbyImage image={GetCommonBaner()} alt={slide.picture.alt ? slide.picture.alt : 'Zdjęcie slidera'} />
                  )}
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </ReactSlider>
    </div>
  )
}

export default React.memo(Slider)
