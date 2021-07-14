import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import tosterStatusAction from "./tosterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as baseActions from "./baseActions";

export function loadDataSuccess(adminData) {
  return { type: types.LOADED_ADMIN_DATA_SUCCESS, adminData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_ADMIN, {
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

export const submitadminData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_ADMIN, params);
      dispatch(submittingRequestStatus(false));
      goToPreviousPath();
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
      const response = await agent.put(API.LOAD_ADMIN_PASSWORD, params);
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

export const createadminData = (params, push) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_ADMIN, params);
    dispatch(submittingRequestStatus(false));
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    push(`/users/admin`);
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

export const updateadminData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_ADMIN + "?id=" + params._id + "&status=" + status,
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

export const deleteadminData = (params) => async (dispatch) => {
  try {
    var response = await agent.delete(API.LOAD_ADMIN + "?id=" + params);
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
