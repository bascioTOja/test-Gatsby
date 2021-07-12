import { RootState, SeoProps } from '../types'

export const isLoaded = (state: RootState) => {
  return state.general.isLoaded
}
export const isPreview = (state: RootState) => state.preview.isPreview
export const getPreviewData = (state: RootState) => state.preview

export const getMainColor = (state: RootState) => state.general.mainColor
export const getSecondaryColor = (state: RootState) => state.general.secondaryColor
export const getWidgets = (state: RootState) => state.general.widgets

export const getPageTitle = (state: RootState) => state.general.data.title
export const getNavigation = (state: RootState) => state.general.data.navigation
export const getSEOData = ({
  general: {
    data: { title, description, keywords }
  }
}: RootState): SeoProps => ({
  title,
  description,
  keywords
})

export const getLogo = (state: RootState) => state.general.data.logo
export const getDefaultCrest = (state: RootState) => state.general.data.default_crest

export const getActiveSeason = (state: RootState) => state.general.data.active_season
export const areStatsCardFlipping = (state: RootState) => state.general.data.flip_card
