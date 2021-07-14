import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function paginationReducers(
  state = initialState.pagination,
  action
) {
  switch (action.type) {
    case types.LOAD_PAGINATION_DATA_SUCCESS:
      return action.pagination;
    default:
      return state;
  }
}
