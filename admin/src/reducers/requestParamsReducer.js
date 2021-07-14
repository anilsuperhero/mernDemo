import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function requestParamsReducer(
  state = initialState.requestParams,
  action
) {
  switch (action.type) {
    case types.LOADED_REQUEST_DATA_SUCCESS:
      return action.requestParams
    default:
      return state
  }
}
