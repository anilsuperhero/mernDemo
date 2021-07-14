import * as types from "./actionsTypes"
import { agent } from "../utils/agent"
import * as API from "../utils/apiPath"
import tosterStatusAction from "./tosterStatusAction"
import submittingRequestStatus from "./submittingRequestStatusAction"
import * as baseActions from "./baseActions"

export function loadPageDataSuccess(pageData) {
  return { type: types.LOADED_PAGE_DATA_SUCCESS, pageData }
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData }
}

export function loadNotDataSuccess(isLoad) {
  return { type: types.LOAD_REQUEST_STATUS, isLoad }
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination }
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_PAGE, {
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
      dispatch(loadPageDataSuccess(response.data.data.data))
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

export const submitPageData = (params, push) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.put(API.LOAD_PAGE, params)
    dispatch(submittingRequestStatus(false))
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
    push("/cms")
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

export const createPageData = (params, push) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.post(API.LOAD_PAGE, params)
    dispatch(submittingRequestStatus(false))
    loadData({ type: true })(dispatch)
    baseActions.loadFormPop(false)(dispatch)
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
    push("/cms")
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

export function submittingemailParams(requestParams) {
  return { type: types.LOADED_EMAIL_PARAM_SUCCESS, requestParams }
}

export const emailParams = (params) => async (dispatch) => {
  dispatch(submittingemailParams(params))
}
