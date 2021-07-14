import * as types from "./actionsTypes"
import { agent } from "../utils/agent"
import * as API from "../utils/apiPath"
import toasterStatusAction from "./toasterStatusAction"
import submittingRequestStatus from "./submittingRequestStatusAction"
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus"

export function loadHomePageDataSuccess(homePageData) {
  return { type: types.LOAD_HOME_PAGE_DATA_SUCCESS, homePageData }
}

export function loadPageDataSuccess(pageData) {
  return { type: types.LOAD_PAGE_DATA_SUCCESS, pageData }
}

export function loadFaqDataSuccess(faqData) {
  return { type: types.LOAD_FAQ_DATA_SUCCESS, faqData }
}

export const loadPageData = (slug) => async (dispatch) => {
  try {
    const response = await agent.get(API.CMS_PAGE + slug)
    dispatch(loadPageDataSuccess(response.data.data))
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

export const submitContactRequest = (params) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true))
    const response = await agent.post(API.SUBMIT_CONTACT_REQUEST, params)
    dispatch(
      toasterStatusAction({ open: true, message: response.data.message })
    )
    dispatch(submittingRequestStatus(false))
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

export function loadFaqData() {
  return async function (dispatch) {
    dispatch(toggleNetworkRequestStatus(true))
    await agent
      .get(API.LOAD_FAQ)
      .then((response) => {
        dispatch(loadFaqDataSuccess(response.data.data))
        dispatch(toggleNetworkRequestStatus(false))
      })
      .catch((error) => {
        dispatch(toggleNetworkRequestStatus(false))
        throw error
      })
  }
}
