import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function otherDocumentDataReducer(
  state = initialState.otherDocument,
  action
) {
  switch (action.type) {
    case types.LOADED_OTHER_DOCUMENT_SUCCESS:
      return action.otherDocument
    default:
      return state
  }
}
