import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function isForgotRequest(state = initialState.isFrogot, action) {
  switch (action.type) {
    case types.LOADED_USER_FORGOT_SUCCESS:
      return action.isFrogot;
    default:
      return state;
  }
}
