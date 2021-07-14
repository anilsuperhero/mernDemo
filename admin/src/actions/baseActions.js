import * as types from "./actionsTypes";
import tosterStatusAction from "./tosterStatusAction";
import dialogStatusAction from "./dialogStatusAction";

export function loadpopSuccess(formPop) {
  return { type: types.LOAD_FORM_POP, formPop };
}

export function loadheadSuccess(isHead) {
  return { type: types.TABLE_HEAD_REQUEST_STATUS, isHead };
}

export function loadPathSuccess(pathName) {
  return { type: types.LOAD_PATH_NAME, pathName };
}

export function loadRequestDataSuccess(requestParams) {
  return { type: types.LOADED_REQUEST_DATA_SUCCESS, requestParams };
}

export function loadDocumentData(documentParams) {
  return { type: types.LOADED_DOCUMENT_PARAM_SUCCESS, documentParams };
}

export const loadFormPop = (params) => async (dispatch) => {
  try {
    dispatch(loadpopSuccess(params));
  } catch (error) {
    throw error;
  }
};

export const loadTableHeader = (params) => async (dispatch) => {
  try {
    dispatch(loadheadSuccess(params));
  } catch (error) {
    throw error;
  }
};

export const loadPathName = (name) => async (dispatch) => {
  try {
    dispatch(loadPathSuccess(name));
  } catch (error) {
    throw error;
  }
};

export const loadRequestData = (name) => async (dispatch) => {
  try {
    dispatch(loadRequestDataSuccess(name));
  } catch (error) {
    throw error;
  }
};

export const loadDocumentRequestData = (name) => async (dispatch) => {
  try {
    dispatch(loadDocumentData(name));
  } catch (error) {
    throw error;
  }
};

export const loadTosterData = (data) => async (dispatch) => {
  try {
    dispatch(tosterStatusAction(data));
  } catch (error) {
    throw error;
  }
};

export const loadDialogData = (data) => async (dispatch) => {
  try {
    dispatch(dialogStatusAction(data));
  } catch (error) {
    throw error;
  }
};

export function loadDocumentDataSuc(selectedDocument) {
  return {
    type: types.LOADED_SELECTED_DOCUMENT_DATA_SUCCESS,
    selectedDocument,
  };
}

export const loadSelectedDocument = (data) => async (dispatch) => {
  try {
    dispatch(loadDocumentDataSuc(data));
  } catch (error) {
    throw error;
  }
};
