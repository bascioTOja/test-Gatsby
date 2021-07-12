import { createStore } from 'redux'

import rootReducer from './slices'

export default (preloadedState: any) => createStore(rootReducer, preloadedState)
