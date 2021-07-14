import { agent } from "../utils/agent"
import * as API from "../utils/apiPath"
import toasterStatusAction from "./toasterStatusAction"
import * as types from "./actionsTypes"
import submittingRequestStatus from "./submittingRequestStatusAction"

export const createKeyPersonalData =
  (params, handleClose) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true))
      const response = await agent.post(API.LOAD_KEY_PERSON, params)
      dispatch(submittingRequestStatus(false))
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      )
      dispatch(loadData({}))
      handleClose(false)
    } catch (error) {
      dispatch(
        toasterStatusAction({
          open: true,
          message: error.message,
          severity: "error",
        })
      )
      dispatch(submittingRequestStatus(false))
    }
  }
export function loadDataSuccess(keyPerson) {
  return { type: types.LOAD_KEY_PERSON_DATA_SUCCESS, keyPerson }
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData }
}

export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination }
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_KEY_PERSON, {
      params: request,
    })
    if (response.data.data.data.length <= 0) {
      dispatch(loadNotFoundDataSuccess(false))
    } else {
      dispatch(loadNotFoundDataSuccess(true))
    }
    if (Object.keys(request).length !== 0) {
      dispatch(loadNotFoundDataSuccess(true))
    }
    if (response.data.data.data) {
      dispatch(loadDataSuccess(response.data.data.data))
      dispatch(loadPaginationDataSuccess(response.data.data.pagination))
    }
  } catch (error) {
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
    dispatch(loadNotFoundDataSuccess(false))
  }
}

export const updateKeyPersonalData =
  (params, handleClose) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true))
      const response = await agent.put(API.LOAD_KEY_PERSON, params)
      dispatch(submittingRequestStatus(false))
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      )
      dispatch(loadData({}))
      handleClose(false)
    } catch (error) {
      dispatch(
        toasterStatusAction({
          open: true,
          message: error.message,
          severity: "error",
        })
      )
      dispatch(submittingRequestStatus(false))
    }
  }

export const deleteKeyPersonnelData = (params) => async (dispatch) => {
  try {
    var response = await agent.delete(API.LOAD_KEY_PERSON + "?id=" + params)
    loadData({})(dispatch)
    dispatch(
      toasterStatusAction({ open: true, message: response.data.message })
    )
  } catch (error) {
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
  }
}
