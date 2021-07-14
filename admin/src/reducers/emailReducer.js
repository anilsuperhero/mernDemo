import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function emailReducer(state = initialState.emailData, action) {
  switch (action.type) {
    case types.LOADED_EMAIL_PARAM_SUCCESS:
      return action.emailData
    default:
      return state
  }
}
