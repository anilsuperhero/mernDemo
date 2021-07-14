import { combineReducers } from "redux";
import initialState from "./initialState";
import isSuperUserAuth from "./isAuthRequest";
import isSubmitting from "./isSubmittingRequest";
import superUserParams from "./userParamsReducer";
import superUserInfo from "./userInfoReducer";
import collapseMenu from "./collapseMenuRequest";
import setting from "./settingReducer";
import isData from "./isDataRequest";
import emailData from "./emailReducer";
import pageData from "./pageDataReducer";
import pagination from "./paginationReducers";
import networkRequest from "./networkRequest";
import isHead from "./isHeadRequest";
import isLoad from "./isLoadRequest";
import faqData from "./faqDataReducer";
import reducer from "./collapseReducer";
import pathName from "./isPathNameRequest";
import customerData from "./customerDataReducer";
import adminData from "./adminDataReducer";
import dashboard from "./dashboardReducer";
import userList from "./userListReducer";
import notificationList from "./notificationDataReducer";
import requestParams from "./requestParamsReducer";
import auditorData from "./auditorDataReducer";
import registrationgroupData from "./registrationGroupDataReducer";
import documentTypeData from "./documentTypeDataReducer";
import documentParams from "./documentParamsReducer";
import otherDocument from "./otherDocumentDataReducer";
import contactData from "./contactDataReducer";
import idDocument from "./idDocumentDataReducer";
import toaster from "./tosterReducer";
import dialogOpen from "./dialogOpenReducer";
import notificationCount from "./notificationCountReducer";
import keyPerson from "./keyPersonReducer";
import auditData from "./auditDataReducer";
import registrationGroupList from "./registrationGroupReducer";
import companyList from "./companyListReducer";
import transactionsList from "./transactionsListReducer";
import documentList from "./documentListDataReducer";
import selectedDocument from "./selectedDocumentReducer";

const rootReducer = combineReducers({
  isSuperUserAuth,
  isSubmitting,
  superUserParams,
  superUserInfo,
  collapseMenu,
  setting,
  isData,
  emailData,
  pagination,
  isFetching: networkRequest,
  isHead,
  pageData,
  isLoad,
  faqData,
  reducer,
  pathName,
  customerData,
  dashboard,
  userList,
  notificationList,
  requestParams,
  adminData,
  auditorData,
  registrationgroupData,
  documentTypeData,
  documentParams,
  otherDocument,
  contactData,
  idDocument,
  toaster,
  dialogOpen,
  notificationCount,
  keyPerson,
  auditData,
  registrationGroupList,
  companyList,
  transactionsList,
  documentList,
  selectedDocument,
});

export default function combinedRootReducer(state, action) {
  return action.type === "LOG_OUT"
    ? rootReducer(initialState, action)
    : rootReducer(state, action);
}
