import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TeamProps } from 'gatsby-source-protrainup/typescript/types/team'

import { PrismicGeneralProps } from '../../prismic/types'
import processMenu from '../../utils/processMenu'
import { GeneralState } from '../types'

const initialState: GeneralState = {
  isLoaded: false,
  mainColor: null,
  secondaryColor: null,
  widgets: [],
  data: {
    active_season: '',
    flip_card: true,
    title: '',
    description: '',
    keywords: [],
    logo: {
      alt: null,
      picture: {
        fixed: null
      }
    },
    default_crest: {
      alt: null,
      picture: {
        fixed: null
      }
    },

    navigation: []
  }
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setGeneralState: (
      state,
      {
        payload: {
          prismicGeneral: { data: generalData },
          teams
        }
      }: PayloadAction<PrismicGeneralProps & { teams: Array<TeamProps> }>
    ) => {
      if (state.isLoaded) return state
      const processedMenu = processMenu(generalData, teams).slice(0, 9)

      state.widgets = generalData.widgets
      state.mainColor = generalData.main_color
      state.secondaryColor = generalData.secondary_color

      state.data = {
        flip_card: generalData.flip_card,
        active_season: generalData.active_season.document ? generalData.active_season.document.data.season_name.text : '2020/2021',
        title: generalData.title.text,
        description: generalData.description.text,
        keywords: generalData.keywords.map((keyword) => keyword.keyword),
        logo: {
          alt: generalData.logo.alt,
          picture: {
            fixed: generalData.logo.fixed
          }
        },
        default_crest: {
          alt: generalData.default_crest.alt,
          picture: {
            fixed: generalData.default_crest.fixed
          }
        },
        navigation: processedMenu
      }

      state.isLoaded = true
    }
  }
})

export const { setGeneralState } = generalSlice.actions

export default generalSlice.reducer
