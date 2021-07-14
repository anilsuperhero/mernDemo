import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function documentListDataReducer(
  state = initialState.documentList,
  action
) {
  switch (action.type) {
    case types.LOADED_DOCUMENT_List_SUCCESS:
      return action.documentList;
    default:
      return state;
  }
}
