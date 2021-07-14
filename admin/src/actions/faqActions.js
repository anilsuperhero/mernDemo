import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import tosterStatusAction from "./tosterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as baseActions from "./baseActions";

export function loadDataSuccess(faqData) {
  return { type: types.LOADED_FAQ_DATA_SUCCESS, faqData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_FAQ, {
      params: request,
    });

    if (response.data.data.data.length <= 0) {
      dispatch(loadNotFoundDataSuccess(false));
    } else {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (Object.keys(request).length !== 0) {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (response.data.data.data) {
      dispatch(loadDataSuccess(response.data.data.data));
      dispatch(loadpaginationDataSuccess(response.data.data.pagination));
    }
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const submitFaqData = (params, goToPreviousPath) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.put(API.LOAD_FAQ, params);
    dispatch(submittingRequestStatus(false));
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    goToPreviousPath();
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};

export const createFaqData = (params, goToPreviousPath) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_FAQ, params);
    dispatch(submittingRequestStatus(false));
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    goToPreviousPath();
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
    dispatch(submittingRequestStatus(false));
  }
};

export const updateFaqData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_FAQ + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};

export function submittingemailParams(requestParams) {
  return { type: types.LOADED_EMAIL_PARAM_SUCCESS, requestParams };
}

export const requestParams = (params) => async (dispatch) => {
  dispatch(submittingemailParams(params));
};

export const deleteFaqData = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_FAQ + "?id=" + params);
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    baseActions.loadFormPop(false)(dispatch);
    loadData({})(dispatch);
  } catch (error) {
    dispatch(
      tosterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};
