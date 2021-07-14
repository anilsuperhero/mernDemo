import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function selectedDocumentReducer(
  state = initialState.selectedDocument,
  action
) {
  switch (action.type) {
    case types.LOADED_SELECTED_DOCUMENT_DATA_SUCCESS:
      return action.selectedDocument;
    default:
      return state;
  }
}
