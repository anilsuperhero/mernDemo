import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function userParamsReducer(
  state = initialState.userParams,
  action
) {
  switch (action.type) {
    case types.LOADED_USER_PARAM_SUCCESS:
      return action.userParams
    default:
      return state
  }
}
