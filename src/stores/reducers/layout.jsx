import { updateObject } from '@utils/utility'
import * as _act from '@constants/actionType'

const initialState = {
  navigationStretched: true
}

export const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case _act.STRETCH_NAVIGATION: return updateObject(state, {navigationStretched: true})
    case _act.SHRINK_NAVIGATION: return updateObject(state, {navigationStretched: false})
    default: return state
  }
}

export default layoutReducer