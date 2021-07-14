import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import tosterStatusAction from "./tosterStatusAction";
import submittingRequestStatus from "./submittingRequestStatusAction";

export function loadDataSuccess(userList) {
  return { type: types.LOADED_USER_LIST_DATA_SUCCESS, userList };
}

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
export function loadpaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const getuserData = () => async (dispatch) => {
  try {
    const response = await agent.get(API.GET_USER_LIST);
    dispatch(loadDataSuccess(response.data.data));
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

export const sendNotification = (params) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.SEND_NOTIFICATION, params);
    dispatch(submittingRequestStatus(false));
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
    dispatch(submittingRequestStatus(false));
  }
};

export const getNotification = () => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.get(API.GET_NOTIFICATION);
    dispatch(submittingRequestStatus(false));
    dispatch(loadNotificationDataSuccess(response.data.data.item.data));
    //dispatch(loadpaginationDataSuccess(response.data.data.item.pagination))
    dispatch(loadNotificationCountDataSuccess(response.data.data.count));
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

export const clearAllNotification = () => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.delete(API.GET_NOTIFICATION);
    dispatch(submittingRequestStatus(false));
    dispatch(loadNotificationDataSuccess([]));
    dispatch(loadNotificationCountDataSuccess(0));
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
    dispatch(submittingRequestStatus(false));
  }
};

export const deleteData = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(
      API.DELETE_NOTIFICATION + "?id=" + params
    );
    dispatch(
      tosterStatusAction({ open: true, message: response.data.message })
    );
    getNotification({})(dispatch);
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

export const updateNotification = () => async (dispatch) => {
  try {
    await agent.put(API.GET_NOTIFICATION);
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
