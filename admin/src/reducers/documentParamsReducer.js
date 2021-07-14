import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function documentParamsReducer(
  state = initialState.documentParams,
  action
) {
  switch (action.type) {
    case types.LOADED_DOCUMENT_PARAM_SUCCESS:
      return action.documentParams
    default:
      return state
  }
}
