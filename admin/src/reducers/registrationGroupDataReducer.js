import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function registrationGroupDataReducer(
  state = initialState.registrationgroupData,
  action
) {
  switch (action.type) {
    case types.LOADED_REGISTRATION_GROUP_DATA_SUCCESS:
      return action.registrationgroupData
    default:
      return state
  }
}
