import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function registrationGroupReducer(
  state = initialState.registrationGroup,
  action
) {
  switch (action.type) {
    case types.LOADED_REGISTRATION_GROUP_DATA_SUCCESS:
      return action.registrationGroup;
    default:
      return state;
  }
}
