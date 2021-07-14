import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function collapseMenuRequest(
  state = initialState.collapseMenu,
  action
) {
  switch (action.type) {
    case types.COLLAPSE_MENU:
      return !state;
    default:
      return state;
  }
}
