import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function isPathNameRequest(
  state = initialState.pathName,
  action
) {
  switch (action.type) {
    case types.LOAD_PATH_NAME:
      return action.pathName;
    default:
      return state;
  }
}
