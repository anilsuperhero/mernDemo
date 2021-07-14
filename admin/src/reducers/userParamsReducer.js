import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function userParamsReducer(
  state = initialState.superUserParams,
  action
) {
  switch (action.type) {
    case types.LOADED_USER_PARAM_SUCCESS:
      return action.superUserParams;
    default:
      return state;
  }
}
