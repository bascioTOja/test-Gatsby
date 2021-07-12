import { FixedObject } from 'gatsby-image'
import { Link, RichTextBlock } from 'prismic-reactjs'

import { PrismicArticleProps, PrismicDocumentLink, PrismicPageProps } from '.'

export const prismicWidgetSliceTypes = [
  'next_match',
  'previous_match',
  'facebook',
  'instagram',
  'twitter',
  'youtube',
  'custom_button',
  'highlight',
  'partner',
  'protrainup'
] as const

export interface PrismicWidgetSlice<T extends typeof prismicWidgetSliceTypes[number]> {
  slice_type: T
  id: string
}

export interface PrismicProtrainupSlice extends PrismicWidgetSlice<'protrainup'> {
  primary: {
    link: { link_type: 'Web' } & Link
  }
}

export interface PrismicPartnerSlice extends PrismicWidgetSlice<'partner'> {
  primary: {
    link: { link_type: 'Web' } & Link
    photo: {
      alt: string | null
      fixed: FixedObject | null
    }
  }
}

export interface PrismicHiglightSlice extends PrismicWidgetSlice<'highlight'> {
  primary: {
    encourage_text: { raw: Array<RichTextBlock>; text: string }
    link: ({ type: 'article' } & PrismicDocumentLink<PrismicArticleProps>) | ({ type: 'page' } & PrismicDocumentLink<PrismicPageProps>)
  }
}

export interface PrismicCustomButtonSlice extends PrismicWidgetSlice<'custom_button'> {
  primary: {
    color: string | null
    caption: {
      text: string
    }

    photo: {
      url?: string
      alt: string | null
      fixed: FixedObject | null
    }
    link: { link_type: 'Web' } & Link
  }
}

export interface PrismicFacebookSlice extends PrismicWidgetSlice<'facebook'> {
  primary: {
    link: { link_type: 'Web' } & Link
  }
}

export interface PrismicInstagramSlice extends PrismicWidgetSlice<'instagram'> {
  primary: {
    link: { link_type: 'Web' } & Link
  }
}

export interface PrismicYoutubeSlice extends PrismicWidgetSlice<'youtube'> {
  primary: {
    link: { link_type: 'Web' } & Link
  }
}

export interface PrismicTwitterSlice extends PrismicWidgetSlice<'twitter'> {
  primary: {
    link: { link_type: 'Web' } & Link
  }
}

export interface PrismicNextMatchSlice extends PrismicWidgetSlice<'next_match'> {}

export interface PrismicPreviousMatchSlice extends PrismicWidgetSlice<'previous_match'> {}

export type PrismicWidgets =
  | PrismicTwitterSlice
  | PrismicYoutubeSlice
  | PrismicNextMatchSlice
  | PrismicPreviousMatchSlice
  | PrismicFacebookSlice
  | PrismicInstagramSlice
  | PrismicCustomButtonSlice
  | PrismicHiglightSlice
  | PrismicPartnerSlice
  | PrismicProtrainupSlice
