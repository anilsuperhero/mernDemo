import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function dialogOpenReducer(
  state = initialState.dialogOpen,
  action
) {
  switch (action.type) {
    case types.LOADED_DIALOGOPEN_SUCCESS:
      return action.dialogOpen
    default:
      return state
  }
}
