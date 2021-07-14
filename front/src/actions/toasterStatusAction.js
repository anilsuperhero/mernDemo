import * as types from "./actionsTypes"

// action creator
const toasterStatusAction = (toaster) => ({
  type: types.LOADED_TOASTER_INFO_SUCCESS,
  toaster,
})

export default toasterStatusAction
