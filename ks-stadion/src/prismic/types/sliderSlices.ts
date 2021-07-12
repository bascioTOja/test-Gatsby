import { FluidObject } from 'gatsby-image'

import { PrismicArticleProps, PrismicDocumentLink, PrismicPageProps } from '.'

export const prismicSliderSliceTypes = ['slide', 'document_link'] as const

export interface PrismicPageSlice<T extends typeof prismicSliderSliceTypes[number]> {
  slice_type: T
  id: string
}

export interface SlideSlice extends PrismicPageSlice<'slide'> {
  primary: {
    caption: {
      text: string
    }
    photo: {
      alt: string | null
      fluid: FluidObject | null
    }
    title: {
      text: string
    }
  }
}

export interface DocumentLinkSlice extends PrismicPageSlice<'document_link'> {
  primary:
    | {
        link: { type: 'page' } & PrismicDocumentLink<PrismicPageProps>
      }
    | {
        link: { type: 'article' } & PrismicDocumentLink<PrismicArticleProps>
      }
}

export type SliderSlices = SlideSlice | DocumentLinkSlice
