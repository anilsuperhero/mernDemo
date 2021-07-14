import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function contactDataReducer(
  state = initialState.contactData,
  action
) {
  switch (action.type) {
    case types.LOADED_CONTACT_DATA_SUCCESS:
      return action.contactData
    default:
      return state
  }
}
