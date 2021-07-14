import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function tosterReducer(state = initialState.toaster, action) {
  switch (action.type) {
    case types.LOADED_TOSTER_INFO_SUCCESS:
      return action.toaster
    default:
      return state
  }
}
