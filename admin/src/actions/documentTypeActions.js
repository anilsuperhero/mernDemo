import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import tosterStatusAction from "./tosterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";
import * as baseActions from "./baseActions";

export function loadDataSuccess(documentTypeData) {
  return {
    type: types.LOADED_DOCUMENT_TYPE_DATA_SUCCESS,
    documentTypeData,
  };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_DOCUMENT_TYPE, {
      params: request,
    });

    if (response.data.data.data.length <= 0) {
      dispatch(loadNotFoundDataSuccess(false));
    } else {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (Object.keys(request).length !== 1) {
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

export const submitDocumentTypeData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_DOCUMENT_TYPE, params);
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

export const createDocumentTypeData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.LOAD_DOCUMENT_TYPE, params);
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

export const updateDocumentTypeData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_DOCUMENT_TYPE + "?id=" + params._id + "&status=" + status,
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

export const deleteDocumentTypeData = (params, groupId) => async (dispatch) => {
  try {
    const response = await agent.delete(
      API.LOAD_DOCUMENT_TYPE + "?id=" + params
    );
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    baseActions.loadFormPop(false)(dispatch);
    loadData({ groupId: groupId })(dispatch);
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
