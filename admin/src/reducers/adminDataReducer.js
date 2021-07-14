import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function adminDataReducer(
  state = initialState.adminData,
  action
) {
  switch (action.type) {
    case types.LOADED_ADMIN_DATA_SUCCESS:
      return action.adminData
    default:
      return state
  }
}
