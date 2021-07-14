import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function keyPersonReducer(
  state = initialState.keyPerson,
  action
) {
  switch (action.type) {
    case types.LOAD_KEY_PERSON_DATA_SUCCESS:
      return action.keyPerson;
    default:
      return state;
  }
}
