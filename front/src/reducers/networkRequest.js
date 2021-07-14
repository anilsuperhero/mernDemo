import * as types from '../actions/actionsTypes'
import initialState from './initialState'


export default function networkRequest(state = initialState.isFetching, action) {
  switch (action.type) {
    case types.NETWORK_REQUEST_STATUS:
      return action.isFetching
    default:
      return state
  }
}
