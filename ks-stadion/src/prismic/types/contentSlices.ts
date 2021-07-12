import { FixedObject, FluidObject } from 'gatsby-image'
import { RichTextBlock } from 'prismic-reactjs'

import { PrismicAlbumProps, PrismicDocumentLink } from '.'

export const prismicPageSliceTypes = ['content', 'album', 'photos', 'localization', 'grid_content', 'emote_separator'] as const
export const separatorEmotes = ['users', 'books'] as const

export interface PrismicPageSlice<T extends typeof prismicPageSliceTypes[number]> {
  slice_type: T
  id: string
}

export interface PrismicPhotosSlice extends PrismicPageSlice<'photos'> {
  items: Array<{
    photo: {
      url: string | null
      alt: string | null
      fluid: FluidObject | null
      fixed: FixedObject | null
    }
  }>
}

// Link to the album type
export interface PrismicAlbumSlice extends PrismicPageSlice<'album'> {
  items: Array<{
    album_link: PrismicDocumentLink<PrismicAlbumProps>
  }>
}

export interface PrismicContentSlice extends PrismicPageSlice<'content'> {
  primary: {
    show_separator: boolean
    separator_text: { text: string }
    content: {
      html: string
      text: string
      raw: Array<RichTextBlock>
    }
  }
}

export interface PrismicLocalizationSlice extends PrismicPageSlice<'localization'> {
  primary: {
    localization: {
      latitude: number | null
      longitude: number | null
    }
  }
}

export interface PrismicGridContentSlice extends PrismicPageSlice<'grid_content'> {
  items: Array<{
    left_column: {
      text: string
      raw: Array<RichTextBlock>
    }
    right_column: {
      text: string
      raw: Array<RichTextBlock>
    }
  }>
}

export interface PrismicEmoteSeparatorSlice extends PrismicPageSlice<'emote_separator'> {
  primary: {
    emote_name: typeof separatorEmotes[number]
    separator_text: {
      text: string
    }
  }
}

export type PrismicArticleSlice = PrismicContentSlice | PrismicPhotosSlice | PrismicLocalizationSlice

export type PrismicPageContentSlice =
  | PrismicEmoteSeparatorSlice
  | PrismicGridContentSlice
  | PrismicLocalizationSlice
  | PrismicContentSlice
  | PrismicAlbumSlice
  | PrismicPhotosSlice
