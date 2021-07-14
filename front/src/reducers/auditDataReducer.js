import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function auditDataReducer(
  state = initialState.auditData,
  action
) {
  switch (action.type) {
    case types.LOADED_AUDIT_DATA_SUCCESS:
      return action.auditData;
    default:
      return state;
  }
}
