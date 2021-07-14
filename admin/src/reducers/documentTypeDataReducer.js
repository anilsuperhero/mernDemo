import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function documentTypeDataReducer(
  state = initialState.documentTypeData,
  action
) {
  switch (action.type) {
    case types.LOADED_DOCUMENT_TYPE_DATA_SUCCESS:
      return action.documentTypeData
    default:
      return state
  }
}
