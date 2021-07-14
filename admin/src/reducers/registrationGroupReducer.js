import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function registrationGroupReducer(
  state = initialState.registrationGroupList,
  action
) {
  switch (action.type) {
    case types.LOADED_REGISTRATION_GROUP_LIST_SUCCESS:
      return action.registrationGroupList;
    default:
      return state;
  }
}
