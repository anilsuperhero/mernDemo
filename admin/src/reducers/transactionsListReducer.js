import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function transactionsListReducer(
  state = initialState.transactionsList,
  action
) {
  switch (action.type) {
    case types.LOADED_TRANSACTION_LIST_SUCCESS:
      return action.transactionsList;
    default:
      return state;
  }
}
