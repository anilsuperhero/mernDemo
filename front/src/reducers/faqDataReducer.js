import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function faqDataReducer(state = initialState.faqData, action) {
  switch (action.type) {
    case types.LOAD_FAQ_DATA_SUCCESS:
      return action.faqData
    default:
      return state
  }
}
