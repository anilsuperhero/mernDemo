import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function auditorDataReducer(
  state = initialState.auditorData,
  action
) {
  switch (action.type) {
    case types.LOADED_AUDITOR_DATA_SUCCESS:
      return action.auditorData
    default:
      return state
  }
}
