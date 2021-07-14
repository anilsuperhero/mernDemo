import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function companyListReducer(
  state = initialState.companyList,
  action
) {
  switch (action.type) {
    case types.LOADED_COMPANY_LIST_SUCCESS:
      return action.companyList;
    default:
      return state;
  }
}
