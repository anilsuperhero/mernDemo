import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function userListReducer(state = initialState.userList, action) {
  switch (action.type) {
    case types.LOADED_USER_LIST_DATA_SUCCESS:
      return action.userList
    default:
      return state
  }
}
