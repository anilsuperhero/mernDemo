import * as types from "../actions/actionsTypes"
import initialState from "./initialState"

export default function settingReducer(state = initialState.setting, action) {
  switch (action.type) {
    case types.LOADED_SETTING_INFO_SUCCESS:
      return action.setting
    default:
      return state
  }
}
