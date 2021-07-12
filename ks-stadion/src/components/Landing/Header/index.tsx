import _ from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { PrismicLandingpageProps } from '../../../prismic/types'
import { SlideProps } from '../../../types'
import Slider from './slider'

const Header = ({ landingPageProps }: { landingPageProps: PrismicLandingpageProps }) => {
  const { t } = useTranslation()

  const slides: Array<SlideProps> = []

  landingPageProps.data.slider.forEach((slice) => {
    switch (slice.slice_type) {
      case 'slide':
        slides.push({
          id: slice.id,
          caption: slice.primary.caption,
          title: slice.primary.title,
          picture: {
            alt: slice.primary.photo.alt,
            fluid: slice.primary.photo.fluid
          }
        })
        break
      case 'document_link':
        {
          if (slice.primary.link.type === 'article') {
            slides.push({
              id: slice.id,
              isDocument: true,
              url: `/articles/${_.get(slice, 'primary.link.document.uid', '#')}`,
              caption: { text: _.get(slice, 'primary.link.document.data.caption.text', '') },
              title: { text: _.get(slice, 'primary.link.document.data.title.text', '') },
              picture: {
                alt: _.get(slice, 'primary.link.document.data.photo.alt', t('no-data')),
                fluid: _.get(slice, 'primary.link.document.data.photo.fluid', null)
              }
            })
          } else if (slice.primary.link.type === 'page') {
            slides.push({
              id: slice.id,
              url: `/${_.get(slice, 'primary.link.document.uid', '#')}`,
              isDocument: true,
              caption: { text: _.get(slice, 'primary.link.document.data.caption.text', '') },
              title: { text: _.get(slice, 'primary.link.document.data.title.text', '') },
              picture: {
                alt: _.get(slice, 'primary.link.document.data.baner.alt', t('no-data')),
                fluid: _.get(slice, 'primary.link.document.data.baner.fluid', null)
              }
            })
          }
        }
        break
    }
  })

  if (slides.length === 0) {
    return null
  }

  return (
    <header>
      <Slider slides={slides} />
    </header>
  )
}

export default React.memo(Header)
