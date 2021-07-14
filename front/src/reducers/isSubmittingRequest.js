import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function isSubmittingRequest(state = initialState.isSubmitting, action) {
  switch (action.type) {
    case types.SUBMITTING_REQUEST_STATUS:
      return action.isSubmitting;
    default:
      return state;
  }
}
