import * as types from '../actions/actionsTypes'
import initialState from './initialState'

export default function homePageReducer(state = initialState.homePageData, action) {
  switch (action.type) {
    case types.LOAD_HOME_PAGE_DATA_SUCCESS:
      return action.homePageData
    default:
      return state
  }
}
