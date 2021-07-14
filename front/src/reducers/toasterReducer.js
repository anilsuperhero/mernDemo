import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function toasterReducer(state = initialState.toaster, action) {
  switch (action.type) {
    case types.LOADED_TOASTER_INFO_SUCCESS:
      return action.toaster
    default:
      return state
  }
}
