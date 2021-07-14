import * as types from "./actionsTypes"

// action creator
const tosterStatusAction = (toaster) => ({
  type: types.LOADED_TOSTER_INFO_SUCCESS,
  toaster,
})

export default tosterStatusAction
