import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import toasterStatusAction from "./toasterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";

export function loadNotificationDataSuccess(notificationList) {
  return {
    type: types.LOADED_USER_NOTIFICATION_DATA_SUCCESS,
    notificationList,
  };
}

export function loadNotificationCountDataSuccess(notificationCount) {
  return {
    type: types.LOADED_NOTIFICATION_COUNT_SUCCESS,
    notificationCount,
  };
}

export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const getNotification = () => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.get(API.GET_NOTIFICATION);
    dispatch(submittingRequestStatus(false));
    dispatch(loadNotificationDataSuccess(response.data.data.item.data));
    dispatch(loadPaginationDataSuccess(response.data.data.item.pagination));
    dispatch(loadNotificationCountDataSuccess(response.data.data.count));
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

export const clearAllNotification = () => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.delete(API.GET_NOTIFICATION);
    dispatch(submittingRequestStatus(false));
    dispatch(loadNotificationDataSuccess([]));
    dispatch(loadNotificationCountDataSuccess(0));
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
    dispatch(submittingRequestStatus(false));
  }
};

export const deleteData = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(
      API.DELETE_NOTIFICATION + "?id=" + params
    );
    dispatch(
      toasterStatusAction({ open: true, message: response.data.message })
    );
    getNotification({})(dispatch);
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

export const updateNotification = () => async (dispatch) => {
  try {
    await agent.put(API.GET_NOTIFICATION);
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
