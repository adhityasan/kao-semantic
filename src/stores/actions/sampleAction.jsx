import * as _act from '@constants/actionType'

export const onMove = (link) => {
  return {
    type: _act.MOVE,
    directTo: link
  }
}