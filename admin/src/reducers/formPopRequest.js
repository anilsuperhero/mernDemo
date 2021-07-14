import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function formPopRequest(state = initialState.formPop, action) {
  switch (action.type) {
    case types.LOAD_FORM_POP:
      return action.formPop;
    default:
      return state;
  }
}
