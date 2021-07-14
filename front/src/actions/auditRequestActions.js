import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import toasterStatusAction from "./toasterStatusAction";
import * as types from "./actionsTypes";
import submittingRequestStatus from "./submittingRequestStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
import { getNotification } from "./notificationActions";

export const createRequestData = (params, handleClose) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_AUDIT_REQUEST, params);
    dispatch(submittingRequestStatus(false));
    dispatch(
      toasterStatusAction({ open: true, message: response.data.message })
    );
    dispatch(loadData({}));
    dispatch(getNotification());
    handleClose(false);
  } catch (error) {
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
    dispatch(submittingRequestStatus(false));
  }
};

export function loadDataSuccess(auditData) {
  return { type: types.LOADED_AUDIT_DATA_SUCCESS, auditData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_AUDIT_REQUEST, {
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
      dispatch(loadPaginationDataSuccess(response.data.data.pagination));
    }
  } catch (error) {
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const updateKeyPersonalData =
  (params, handleClose) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_KEY_PERSON, params);
      dispatch(submittingRequestStatus(false));
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      );
      dispatch(loadData({}));
      handleClose(false);
    } catch (error) {
      dispatch(
        toasterStatusAction({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
      dispatch(submittingRequestStatus(false));
    }
  };

export const deleteRequestData = (params) => async (dispatch) => {
  try {
    var response = await agent.delete(API.LOAD_AUDIT_REQUEST + "?id=" + params);
    loadData({})(dispatch);
    dispatch(
      toasterStatusAction({ open: true, message: response.data.message })
    );
  } catch (error) {
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};

export function loadRegistrationDataSuccess(registrationGroup) {
  return {
    type: types.LOADED_REGISTRATION_GROUP_DATA_SUCCESS,
    registrationGroup,
  };
}

export const loadRegistrationGroupData = () => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_REGISTRATION_GROUP_REQUEST);
    dispatch(loadRegistrationDataSuccess(response.data.data));
  } catch (error) {
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const uploadSlaDocument =
  (request, closeSpinner, handleClose, handleSlaClose) => async (dispatch) => {
    try {
      const response = await agent.post(API.UPLOAD_SLA_DOCUMENT, request);
      loadData({})(dispatch);
      closeSpinner();
      handleClose();
      handleSlaClose();
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      );
    } catch (error) {
      dispatch(
        toasterStatusAction({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
      closeSpinner();
    }
  };

export const submitPayment =
  (request, setLoading, history) => async (dispatch) => {
    try {
      const response = await agent.post(API.SUBMIT_PAYMENT, request);
      setLoading(false);
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      );
      history.push("/user/transactions");
    } catch (error) {
      dispatch(
        toasterStatusAction({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
      setLoading(false);
    }
  };

export const submitPaymentTransfer =
  (request, setLoading, history) => async (dispatch) => {
    try {
      const response = await agent.post(API.SUBMIT_PAYMENT_TRANSFER, request);
      setLoading(false);
      dispatch(
        toasterStatusAction({ open: true, message: response.data.message })
      );
      history.push("/user/transactions");
    } catch (error) {
      dispatch(
        toasterStatusAction({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
      setLoading(false);
    }
  };

export const submitDocumentSign = (request, history) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.UPLOAD_DOCUSIGN_DOCUMENT, {
      params: request,
    });
    dispatch(toggleNetworkRequestStatus(false));
    dispatch(
      toasterStatusAction({ open: true, message: response.data.message })
    );
    history.push("/audit-request");
  } catch (error) {
    dispatch(toggleNetworkRequestStatus(false));
    dispatch(
      toasterStatusAction({
        open: true,
        message: error.message,
        severity: "error",
      })
    );
  }
};
