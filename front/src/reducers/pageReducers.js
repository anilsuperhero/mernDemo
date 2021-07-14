import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function pageReducers(state = initialState.pageData, action) {
  switch (action.type) {
    case types.LOAD_PAGE_DATA_SUCCESS:
      return action.pageData
    default:
      return state
  }
}
