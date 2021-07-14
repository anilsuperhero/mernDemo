import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import tosterStatusAction from "./tosterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as baseActions from "./baseActions";

export function loadDataSuccess(auditorData) {
  return { type: types.LOADED_AUDITOR_DATA_SUCCESS, auditorData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_AUDITOR, {
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

export const submitauditorData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_AUDITOR, params);
      goToPreviousPath();
      dispatch(submittingRequestStatus(false));
      dispatch(
        tosterStatusAction({ open: true, message: response.data.message })
      );
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

export const updatePasswordData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_AUDITOR_PASSWORD, params);
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

export const createauditorData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.LOAD_AUDITOR, params);
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

export const updateauditorData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_AUDITOR + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    baseActions.loadFormPop(false)(dispatch);
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

export const deleteauditorData = (params) => async (dispatch) => {
  try {
    var response = await agent.delete(API.LOAD_AUDITOR + "?id=" + params);
    baseActions.loadFormPop(false)(dispatch);
    loadData({})(dispatch);
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
