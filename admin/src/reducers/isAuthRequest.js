import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function isAuthRequest(
  state = initialState.isSuperUserAuth,
  action
) {
  switch (action.type) {
    case types.LOADED_USER_AUTH_SUCCESS:
      return action.isSuperUserAuth;
    default:
      return state;
  }
}
