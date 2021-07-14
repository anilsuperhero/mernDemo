import * as types from "./actionsTypes"
import { agent } from "../utils/agent"
import * as API from "../utils/apiPath"
import submittingRequestStatus from "./submittingRequestStatusAction"
import tosterStatusAction from "./tosterStatusAction"

export function loadDataSuccess(setting) {
  return { type: types.LOADED_SETTING_INFO_SUCCESS, setting }
}

export function loadDataDashboardSuccess(dashboard) {
  return { type: types.LOADED_DASHBORD_INFO_SUCCESS, dashboard }
}

export const getSettingData = () => async (dispatch) => {
  try {
    const response = await agent.get(API.SETTING)
    dispatch(loadDataSuccess(response.data.data))
  } catch (error) {
    dispatch(tosterStatusAction({ open: true, message: error.message }))
  }
}

export const updateSettingData = (params) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.put(API.SETTING, params)
    dispatch(submittingRequestStatus(false))
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
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

export const getDashboardData = () => async (dispatch) => {
  try {
    const response = await agent.get(API.DASHBORD)
    dispatch(loadDataDashboardSuccess(response.data.data))
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
