import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function transactionReducer(
  state = initialState.transactionData,
  action
) {
  switch (action.type) {
    case types.LOAD_TRANSACTION_DATA_SUCCESS:
      return action.transactionData;
    default:
      return state;
  }
}
