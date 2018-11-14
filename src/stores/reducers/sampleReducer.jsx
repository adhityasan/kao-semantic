import * as _act from '@constants/actionType'
import { updateObject } from '@utils/utility'

const initialState = {
  location: '/'
}

const changeLocation = (state, action) => {
  return updateObject(state, {location: action.directTo})
}

export const reducer = (state=initialState, action) => {
  switch (action.type) {
    case _act.MOVE: return changeLocation(state, action)
    default: return state
  }
}

export default reducer