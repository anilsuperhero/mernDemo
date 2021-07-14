import * as types from "./actionsTypes"

// action creator
const dialogStatusAction = (dialogOpen) => ({
  type: types.LOADED_DIALOGOPEN_SUCCESS,
  dialogOpen,
})

export default dialogStatusAction
