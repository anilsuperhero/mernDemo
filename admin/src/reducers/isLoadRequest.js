import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function isLoadRequest(state = initialState.isLoad, action) {
  switch (action.type) {
    case types.LOAD_REQUEST_STATUS:
      return action.isLoad
    default:
      return state
  }
}
