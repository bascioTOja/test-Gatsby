import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { PreviewTypes } from '../../prismic/types'
import { PreviewState } from '../types'

const initialState: PreviewState = {
  isPreview: false,
  isInitialized: false,
  pathName: '',
  url: '',
  type: null
}

const previewSlice = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    startPreview: (state) => {
      state.isPreview = true
    },
    setPreview: (state, { payload }: PayloadAction<typeof PreviewTypes[number]>) => {
      if (!state.isInitialized) {
        state.url = window.location.href
        state.type = payload
        state.pathName = window.location.pathname
        state.isInitialized = true
      }
    }
  }
})

export const { setPreview, startPreview } = previewSlice.actions

export default previewSlice.reducer
