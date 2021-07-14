import * as types from "./actionsTypes"
import { agent } from "../utils/agent"
import * as API from "../utils/apiPath"
import tosterStatusAction from "./tosterStatusAction"
import * as baseActions from "./baseActions"

export function loadDataSuccess(contactData) {
  return { type: types.LOADED_CONTACT_DATA_SUCCESS, contactData }
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData }
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination }
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_CONTACT_US, {
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

export const deleteData = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_CONTACT_US + "?id=" + params)
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
