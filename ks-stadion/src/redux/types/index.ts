import { FixedObject } from 'gatsby-image'

import { PreviewTypes } from '../../prismic/types'
import { PrismicWidgets } from '../../prismic/types/widgets'
import { NavMainItemProps } from '../../types'

export type SeoProps = {
  title: string
  description: string
  keywords: Array<string>
}

export type GeneralState = {
  isLoaded: boolean
  secondaryColor: string | null
  mainColor: string | null
  widgets: Array<PrismicWidgets>
  data: {
    active_season: string
    flip_card: boolean,
    logo: {
      alt: string | null
      picture: {
        fixed: FixedObject | null
      }
    }
    default_crest: {
      alt: string | null
      picture: {
        fixed: FixedObject | null
      }
    }

    // Navigation
    navigation: Array<NavMainItemProps>
  } & SeoProps
}

export type PreviewState = {
  isPreview: boolean
  isInitialized: boolean
  url: string
  pathName: string
  type: typeof PreviewTypes[number] | null
} 

export interface RootState {
  general: GeneralState
  preview: PreviewState
}
