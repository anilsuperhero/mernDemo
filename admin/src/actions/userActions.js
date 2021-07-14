import * as types from "./actionsTypes"
import submittingRequestStatus from "./submittingRequestStatusAction"
import * as API from "../utils/apiPath"
import { agent } from "../utils/agent"
import tosterStatusAction from "./tosterStatusAction"

export function loginDataSuccess(superUserInfo) {
  return { type: types.LOADED_USER_INFO_SUCCESS, superUserInfo }
}

export function loginUserLoginSuccess(isSuperUserAuth) {
  return { type: types.LOADED_USER_AUTH_SUCCESS, isSuperUserAuth }
}

export function ParamsDataSuccess(superUserParams) {
  return { type: types.LOADED_USER_PARAM_SUCCESS, superUserParams }
}

export function userLoginData(params) {
  return async function (dispatch) {
    dispatch(submittingRequestStatus(true))
    await agent
      .post(API.LOGIN, params)
      .then((response) => {
        dispatch(
          tosterStatusAction({ open: true, message: response.data.message })
        )
        if (response.status === 200) {
          dispatch(submittingRequestStatus(false))
          dispatch(loginDataSuccess(response.data.data))
          localStorage.setItem("authToken", response.data.data.api_token)
          dispatch(loginUserLoginSuccess(true))
          if (params.remember_me) {
            dispatch(ParamsDataSuccess(params))
          } else {
            dispatch(ParamsDataSuccess({}))
          }
        }
      })
      .catch((error) => {
        dispatch(
          tosterStatusAction({
            open: true,
            message: error.message,
            severity: "error",
          })
        )
        dispatch(submittingRequestStatus(false))
      })
  }
}

export function forgotPasswordEmail(params, push) {
  return async function (dispatch) {
    dispatch(submittingRequestStatus(true))
    await agent
      .post(API.FORGOT_PASSWORD_EMAIL, params)
      .then((response) => {
        if (response.status === 200) {
          push({
            pathname: "/reset-password",
          })
          dispatch(ParamsDataSuccess(params))
          dispatch(submittingRequestStatus(false))
          dispatch(
            tosterStatusAction({ open: true, message: response.data.message })
          )
        }
      })
      .catch((error) => {
        dispatch(
          tosterStatusAction({
            open: true,
            message: error.message,
            severity: "error",
          })
        )
        dispatch(submittingRequestStatus(false))
      })
  }
}

export function updatePasswordWithOTP(params, push) {
  return async function (dispatch) {
    dispatch(submittingRequestStatus(true))
    await agent
      .post(API.UPDATEPASSWORDWITHOTP, params)
      .then((response) => {
        if (response.status === 200) {
          push({
            pathname: "/login",
          })
          dispatch(submittingRequestStatus(false))
          dispatch(
            tosterStatusAction({ open: true, message: response.data.message })
          )
        }
      })
      .catch((error) => {
        dispatch(
          tosterStatusAction({
            open: true,
            message: error.message,
            severity: "error",
          })
        )
        dispatch(submittingRequestStatus(false))
      })
  }
}

export function resendOTPEmail(params) {
  return async function (dispatch) {
    await agent
      .post(API.FORGOT_PASSWORD_EMAIL, params)
      .then((response) => {
        dispatch(
          tosterStatusAction({ open: true, message: response.data.message })
        )
      })
      .catch((error) => {
        dispatch(
          tosterStatusAction({
            open: true,
            message: error.message,
            severity: "error",
          })
        )
      })
  }
}

export function userLogout(params) {
  return async function (dispatch) {
    dispatch(loginUserLoginSuccess(false))
    dispatch(loginDataSuccess({}))
    localStorage.removeItem("authToken")
  }
}

export const updatePasswordData = (params) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.put(API.UPDATE_PASSWORD, params)
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

export const updateProfileData = (params) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.post(API.UPDATE_PROFILE, params)
    dispatch(submittingRequestStatus(false))
    dispatch(tosterStatusAction({ open: true, message: response.data.message }))
    dispatch(loginDataSuccess(response.data.data))
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
