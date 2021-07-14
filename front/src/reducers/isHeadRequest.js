import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function isAuthRequest(
  state = initialState.isHead,
  action
) {
  switch (action.type) {
    case types.TABLE_HEAD_REQUEST_STATUS:
      return action.isHead;
    default:
      return state;
  }
}
