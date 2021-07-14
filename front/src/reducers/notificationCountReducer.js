import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function notificationCountReducer(
  state = initialState.notificationCount,
  action
) {
  switch (action.type) {
    case types.LOADED_NOTIFICATION_COUNT_SUCCESS:
      return action.notificationCount
    default:
      return state
  }
}
