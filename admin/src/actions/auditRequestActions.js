import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import tosterStatusAction from "./tosterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";

export function loadDataSuccess(auditData) {
  return { type: types.LOADED_AUDIT_DATA_SUCCESS, auditData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_AUDIT_REQUEST_LIST, {
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

export const uploadSlaDocument =
  (request, closeSpinner, handleClose) => async (dispatch) => {
    try {
      const response = await agent.post(API.UPLOAD_SLA_DOCUMENT, request);
      loadData({})(dispatch);
      closeSpinner();
      handleClose();
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
      closeSpinner();
    }
  };

export function loadRegistrationDataSuccess(registrationGroupList) {
  return {
    type: types.LOADED_REGISTRATION_GROUP_LIST_SUCCESS,
    registrationGroupList,
  };
}

export function loadCompanyListDataSuccess(companyList) {
  return {
    type: types.LOADED_COMPANY_LIST_SUCCESS,
    companyList,
  };
}

export function loadDocumentListDataSuccess(documentList) {
  return {
    type: types.LOADED_DOCUMENT_List_SUCCESS,
    documentList,
  };
}

export const loadRegistrationGroupData = () => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_REGISTRATION_GROUP_REQUEST);
    dispatch(loadRegistrationDataSuccess(response.data.data.registration));
    dispatch(loadCompanyListDataSuccess(response.data.data.company));
    dispatch(loadDocumentListDataSuccess(response.data.data.documentType));
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

export const createRequestData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.LOAD_AUDIT_REQUEST, params);
      dispatch(submittingRequestStatus(false));
      dispatch(
        tosterStatusAction({ open: true, message: response.data.message })
      );
      dispatch(loadData({}));

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
