import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function customerDataReducer(
  state = initialState.customerData,
  action
) {
  switch (action.type) {
    case types.LOADED_CUSTOMER_DATA_SUCCESS:
      return action.customerData
    default:
      return state
  }
}
