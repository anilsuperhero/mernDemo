import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function dashboardReducer(
  state = initialState.dashboard,
  action
) {
  switch (action.type) {
    case types.LOADED_DASHBORD_INFO_SUCCESS:
      return action.dashboard
    default:
      return state
  }
}
