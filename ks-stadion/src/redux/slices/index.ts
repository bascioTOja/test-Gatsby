import { combineReducers, Reducer } from 'redux'

import { RootState } from '../types'
import general from './general'
import preview from './preview'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  general,
  preview
})

export default rootReducer
