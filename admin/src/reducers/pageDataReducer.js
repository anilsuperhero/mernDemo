import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function pageDataReducer(state = initialState.pageData, action) {
  switch (action.type) {
    case types.LOADED_PAGE_DATA_SUCCESS:
      return action.pageData
    default:
      return state
  }
}
