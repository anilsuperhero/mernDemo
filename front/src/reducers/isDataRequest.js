import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function isDataRequest(state = initialState.isData, action) {
  switch (action.type) {
    case types.LOADED_DATA_SUCCESS:
      return action.isData
    default:
      return state
  }
}
