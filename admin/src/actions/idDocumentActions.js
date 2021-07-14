import * as types from "./actionsTypes"
import { agent } from "../utils/agent"
import * as API from "../utils/apiPath"
import tosterStatusAction from "./tosterStatusAction"
import submittingRequestStatus from "./submittingRequestStatusAction"
import * as baseActions from "./baseActions"

export function loadDataSuccess(idDocument) {
  return {
    type: types.LOADED_ID_DOCUMENT_SUCCESS,
    idDocument,
  }
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData }
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination }
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_ID_DOCUMENT, {
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
      dispatch(loadpaginationDataSuccess(response.data.data.pagination))
    }
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
    dispatch(loadNotFoundDataSuccess(false))
  }
}

export const submitIDDocument = (params, push) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.put(API.LOAD_ID_DOCUMENT, params)
    dispatch(submittingRequestStatus(false))
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
    push(`/documents/id-document`)
  } catch (error) {
    dispatch(submittingRequestStatus(false))
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
  }
}

export const createIDDocument = (params, push) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.post(API.LOAD_ID_DOCUMENT, params)
    dispatch(submittingRequestStatus(false))
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
    push(`/documents/id-document`)
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
    dispatch(submittingRequestStatus(false))
  }
}

export const updateIDDocument = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0
    const response = await agent.patch(
      API.LOAD_ID_DOCUMENT + "?id=" + params._id + "&status=" + status,
      params
    )
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
  }
}

export function submittingemailParams(requestParams) {
  return { type: types.LOADED_EMAIL_PARAM_SUCCESS, requestParams }
}

export const requestParams = (params) => async (dispatch) => {
  dispatch(submittingemailParams(params))
}

export const deleteIDDocument = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_ID_DOCUMENT + "?id=" + params)
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
    baseActions.loadFormPop(false)(dispatch)
    loadData({})(dispatch)
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    )
  }
}
