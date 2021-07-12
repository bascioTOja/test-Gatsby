import { FixedObject, FluidObject } from 'gatsby-image'
import { RichTextBlock, Link } from 'prismic-reactjs'

import { PrismicArticleSlice, PrismicPageContentSlice, PrismicPhotosSlice } from './contentSlices'
import { SliderSlices } from './sliderSlices'
import { PrismicWidgets } from './widgets'

export const PreviewTypes = ['article', 'page', 'common', 'album'] as const

export interface AlternateLanguage {
  id: string
  uid?: string
  type: string
  lang: string
}

export interface Document {
  id: string
  uid?: string
  url?: string
  type: string
  href: string
  tags: Array<string>
  slugs: Array<string>
  lang?: string
  alternate_languages: Array<AlternateLanguage>
  first_publication_date: string | null
  last_publication_date: string | null
  data: any
  dataRaw: any
}

export interface PrismicDocumentLink<T> extends Link {
  document: T | null
}

export interface PrismicCategoryProps extends Document {
  data: {
    color: string
    category_name: {
      text: string
    }
  }
}

export interface PrismicLandingpageProps extends Document {
  data: {
    slider: Array<SliderSlices>
  }
}

export type SEOProps = {
  description: {
    text: string
    raw: Array<RichTextBlock>
  } | null
  keywords: {
    text: string
    raw: Array<RichTextBlock>
  } | null
}

export type PrismicSeasonYearProps = {
  data: {
    season_name: {
      text: string
    }
  }
}

export interface PrismicArticleProps extends Document {
  data: {
    category?: { type: 'category' } & PrismicDocumentLink<PrismicCategoryProps>
    body: Array<PrismicArticleSlice>
    caption: {
      text: string
      raw: Array<RichTextBlock>
    }
    content: {
      html: string
      raw: Array<RichTextBlock>
      text: string
    }
    photo: {
      url?: string
      alt: string | null
      fixed: FixedObject | null
      fluid: FluidObject | null
      // localFile: RemoteFileProps | null
      thumbnails: {
        thumb: {
          url?: string
          alt: string | null
          fixed: FixedObject | null
          // localFile: RemoteFileProps | null
        }
      }
    }
    title: {
      text: string
    }
  } & SEOProps
  dataRaw: {
    photo: {
      url: string
      alt: string
    }
    title: Array<RichTextBlock>
  }
}

export interface PrismicAlbumProps extends Document {
  data: {
    body: Array<PrismicPhotosSlice>
    title: {
      text: string
    }
    picture?: {
      url?: string
      alt: string | null
      fluid: FluidObject | null
      fixed: FixedObject | null
      thumbnails: {
        thumb: {
          fixed: FixedObject | null
        }
      }
    }
    thumb: {
      alt: string | null
      fixed: FixedObject | null
    }
  } & SEOProps
}

export interface PrismicPageProps extends Document {
  data: {
    title: {
      text: string
    }
    caption: {
      text: string
      raw: Array<RichTextBlock>
    }
    body: Array<PrismicPageContentSlice>
    baner: {
      url?: string
      alt: string | null
      fluid: FluidObject | null
      fixed: FixedObject | null
      thumbnails: {
        thumb: {
          fixed: FixedObject | null
        }
      }
    }
  } & SEOProps
}

export interface PrismicNavLink extends Link {
  document: Document | null
}

export type PrismicMenuLinkProps = {
  id: string
  link: PrismicNavLink
  link_name: {
    text: string
  }
}

export type PrismicMenuProps = {
  id: string
  primary: PrismicMenuLinkProps
  items: Array<PrismicMenuLinkProps>
}

export type PTUProps = {
  menu_teams_position: number
  menu_show_teams: boolean
  year_as_label: boolean
  active_season: PrismicDocumentLink<PrismicSeasonYearProps>
  flip_card: boolean
}

export type GeneralProps = {
  main_color: string | null
  secondary_color: string | null
  title: {
    text: string
  }
  description: { text: string }
  keywords: Array<{ keyword: string }>
  logo: {
    alt: string | null
    fixed: FixedObject | null
  }
  default_crest: {
    alt: string | null
    // localFile: RemoteFileProps | null
    fixed: FixedObject | null
  }
}

export type PrismicSponsorProps = {
  link: { link_type: 'Web' } & Link
  photo: {
    alt: string | null
    fixed: FixedObject | null
  }
}

export interface PrismicGeneralProps {
  prismicGeneral: {
    dataRaw: {
      navigation: Array<PrismicMenuProps>
      widgets: Array<PrismicWidgets>
    }
    data: {
      navigation: Array<PrismicMenuProps>
      widgets: Array<PrismicWidgets>
      sponsors: Array<PrismicSponsorProps>
    } & PTUProps &
      GeneralProps
  }
}
