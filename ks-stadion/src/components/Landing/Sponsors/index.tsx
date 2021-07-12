import { Paper } from '@material-ui/core'
import Img from 'gatsby-image'
import _ from 'lodash'
import React from 'react'
import Slider, { Settings } from 'react-slick'

import GetNotImageAvailablePNG from '../../../gatsby/queries/getNotImageAvailablePNG'
import { PrismicSponsorProps } from '../../../prismic/types'
import HeaderCard from '../../common/Cards/headerCard'
import * as classes from './style.module.css'

const Sponsors = ({ sponsors }: { sponsors: Array<PrismicSponsorProps> }) => {
  if (sponsors.length === 0) return null

  const settings: Settings = {
    infinite: true,
    arrows: false,
    speed: 3000,
    autoplaySpeed: 1,
    centerMode: true,
    slidesToShow: 4,
    swipeToSlide: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  return (
    <div className={classes.sponsors__wrapper}>
      <HeaderCard text="Nasi sponsorzy" rounded={false} />
      <Paper square={true} className={classes.sponsors}>
        <Slider {...settings} className={classes.sponsors__slider}>
          {sponsors.map((sponsor) => (
            <div key={sponsor.link.url} style={{ height: '100%', padding: '0 2rem' }}>
              <a href={sponsor.link.url} className={classes.sponsor__link} target={sponsor.link.target}>
                <Img
                  className={classes.sponsor__img}
                  fixed={_.get(sponsor, 'photo.fixed', GetNotImageAvailablePNG()) || GetNotImageAvailablePNG()}
                  alt={_.get(sponsor, 'photo.alt', 'Sponsor drużyny') || 'Sponsor drużyny'}
                />
              </a>
            </div>
          ))}
        </Slider>
      </Paper>
    </div>
  )
}

export default React.memo(Sponsors)
