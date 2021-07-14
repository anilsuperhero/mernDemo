import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function idDocumentDataReducer(
  state = initialState.idDocument,
  action
) {
  switch (action.type) {
    case types.LOADED_ID_DOCUMENT_SUCCESS:
      return action.idDocument
    default:
      return state
  }
}
