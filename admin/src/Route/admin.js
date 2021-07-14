import Dashboard from "../Pages/Dashboard";
import Setting from "../Pages/Setting";
import Profile from "../Pages/Profile";
import Password from "../Pages/Password";
import Notification from "../Pages/Notification";

import Email from "../Pages/Email";
import EmailEdit from "../Pages/Email/edit";
import EmailAdd from "../Pages/Email/add";

import CMS from "../Pages/CMS";
import PageEdit from "../Pages/CMS/edit";
import PageAdd from "../Pages/CMS/add";

import Faq from "../Pages/Faq";
import FaqEdit from "../Pages/Faq/edit";
import FaqAdd from "../Pages/Faq/add";

import Customer from "../Pages/Customer";
import CustomerEdit from "../Pages/Customer/edit";
import CustomerAdd from "../Pages/Customer/add";
import CustomerChangePassword from "../Pages/Customer/changePassword";

import Admin from "../Pages/Admin";
import AdminEdit from "../Pages/Admin/edit";
import AdminAdd from "../Pages/Admin/add";
import AdminChangePassword from "../Pages/Admin/changePassword";

import Auditor from "../Pages/Auditor";
import AuditorEdit from "../Pages/Auditor/edit";
import AuditorAdd from "../Pages/Auditor/add";
import AuditorChangePassword from "../Pages/Auditor/changePassword";

import Group from "../Pages/Group";
import GroupEdit from "../Pages/Group/edit";
import GroupAdd from "../Pages/Group/add";

import DocumentType from "../Pages/DocumentType";
import DocumentTypeEdit from "../Pages/DocumentType/edit";
import DocumentTypeAdd from "../Pages/DocumentType/add";

import OtherDocument from "../Pages/OtherDocument";
import OtherDocumentEdit from "../Pages/OtherDocument/edit";
import OtherDocumentAdd from "../Pages/OtherDocument/add";

import IDDocument from "../Pages/IDDocument";
import IDDocumentEdit from "../Pages/IDDocument/edit";
import IDDocumentAdd from "../Pages/IDDocument/add";

import Contact from "../Pages/ContactUs";
import KeyPersonnel from "../Pages/KeyPersonnel";
import AuditRequest from "../Pages/AuditRequest";
import CreateAuditRequest from "../Pages/AuditRequest/add";

import Transactions from "../Pages/Transactions";

const route = [
  {
    path: "/dashboard",
    exact: true,
    name: "Dashboard",
    component: Dashboard,
    title: "Dashboard",
  },
  {
    path: "/account/setting",
    exact: true,
    name: "Platform  Settings",
    component: Setting,
    title: "Platform  Settings",
  },
  {
    path: "/account/profile",
    exact: true,
    name: "My Profile",
    component: Profile,
    title: "My Profile",
  },
  {
    path: "/account/password",
    exact: true,
    name: "Change Password",
    component: Password,
    title: "Change Password",
  },
  {
    path: "/account/notification",
    exact: true,
    name: "Notification",
    component: Notification,
    title: "Notification",
  },
  {
    path: "/email",
    exact: true,
    name: "Email Template Management",
    component: Email,
    title: "Email Template Management",
  },
  {
    path: "/email/edit/:id",
    exact: true,
    name: "Edit Email Template",
    component: EmailEdit,
    title: "Edit Email Template",
  },
  {
    path: "/email/add",
    exact: true,
    name: "Create Email Template",
    component: EmailAdd,
    title: "Create Email Template",
  },
  {
    path: "/cms",
    exact: true,
    name: "Page Management",
    component: CMS,
    title: "Page Management",
  },
  {
    path: "/cms/edit/:id",
    exact: true,
    name: "Edit Page",
    component: PageEdit,
    title: "Edit Page",
  },
  {
    path: "/cms/add",
    exact: true,
    name: "Create New Page",
    component: PageAdd,
    title: "Create New Page",
  },
  {
    path: "/faq",
    exact: true,
    name: "FAQ's Management",
    component: Faq,
    title: "FAQ's Management",
  },
  {
    path: "/faq/edit/:id",
    exact: true,
    name: "Edit Faq",
    component: FaqEdit,
    title: "Edit Faq",
  },
  {
    path: "/faq/create",
    exact: true,
    name: "Create New FAQ",
    component: FaqAdd,
    title: "Create New FAQ",
  },
  {
    path: "/users/customer",
    exact: true,
    name: "Company Management",
    component: Customer,
    title: "Company Management",
  },
  {
    path: "/users/customer/edit/:id",
    exact: true,
    name: "Edit Company",
    component: CustomerEdit,
    title: "Edit Company",
  },
  {
    path: "/users/customer/create",
    exact: true,
    name: "Create New Company",
    component: CustomerAdd,
    title: "Create New Company",
  },
  {
    path: "/users/customer/change-password/:id",
    exact: true,
    name: "Change Password",
    component: CustomerChangePassword,
    title: "Change Password",
  },
  {
    path: "/users/admin",
    exact: true,
    name: "Admin Management",
    component: Admin,
    title: "Admin Management",
  },
  {
    path: "/users/admin/edit/:id",
    exact: true,
    name: "Edit Admin",
    component: AdminEdit,
    title: "Edit Admin",
  },
  {
    path: "/users/admin/create",
    exact: true,
    name: "Create New Admin",
    component: AdminAdd,
    title: "Create New Admin",
  },
  {
    path: "/users/admin/change-password/:id",
    exact: true,
    name: "Change Password",
    component: AdminChangePassword,
    title: "Change Password",
  },
  {
    path: "/users/auditor",
    exact: true,
    name: "Auditor Management",
    component: Auditor,
    title: "Auditor Management",
  },
  {
    path: "/users/auditor/edit/:id",
    exact: true,
    name: "Edit Auditor",
    component: AuditorEdit,
    title: "Edit Auditor",
  },
  {
    path: "/users/auditor/create",
    exact: true,
    name: "Create New Auditor",
    component: AuditorAdd,
    title: "Create New Auditor",
  },
  {
    path: "/users/auditor/change-password/:id",
    exact: true,
    name: "Change Password",
    component: AuditorChangePassword,
    title: "Change Password",
  },
  {
    path: "/documents/registration-group",
    exact: true,
    name: "Registration Groups Management",
    component: Group,
    title: "Registration Groups Management",
  },
  {
    path: "/documents/registration-group/edit/:id",
    exact: true,
    name: "Registration Group",
    component: GroupEdit,
    title: "Edit Registration Group",
  },
  {
    path: "/documents/registration-group/create",
    exact: true,
    name: "Create Registration Group",
    component: GroupAdd,
    title: "Create Registration Group",
  },
  {
    path: "/documents/registration-group/document-type",
    exact: true,
    name: "Document type for ",
    component: DocumentType,
    title: "Document type for ",
  },
  {
    path: "/documents/registration-group/document-type/edit/:id",
    exact: true,
    name: "Document type",
    component: DocumentTypeEdit,
    title: "Document type for ",
  },
  {
    path: "/documents/registration-group/document-type/create",
    exact: true,
    name: "Create Document type",
    component: DocumentTypeAdd,
    title: "Document type for ",
  },
  {
    path: "/documents/others",
    exact: true,
    name: "Others Documents",
    component: OtherDocument,
    title: "Others Documents",
  },
  {
    path: "/documents/others/edit/:id",
    exact: true,
    name: "Edit Document",
    component: OtherDocumentEdit,
    title: "Edit Document",
  },
  {
    path: "/documents/others/create",
    exact: true,
    name: "Create Document",
    component: OtherDocumentAdd,
    title: "Create Document",
  },
  {
    path: "/contact-us",
    exact: true,
    name: "Contact Us",
    component: Contact,
    title: "Contact Us",
  },
  {
    path: "/documents/id-document",
    exact: true,
    name: "Id Documents",
    component: IDDocument,
    title: "ID Documents",
  },
  {
    path: "/documents/id-document/edit/:id",
    exact: true,
    name: "Edit id document",
    component: IDDocumentEdit,
    title: "Edit id document",
  },
  {
    path: "/documents/id-document/create",
    exact: true,
    name: "Create id document",
    component: IDDocumentAdd,
    title: "Create id document",
  },
  {
    path: "/key-personnel",
    exact: true,
    name: "Key Personnel",
    component: KeyPersonnel,
    title: "Key Personnel",
  },
  {
    path: "/audit-request",
    exact: true,
    name: "Audit Request",
    component: AuditRequest,
    title: "Audit Request",
  },
  {
    path: "/audit-request/create",
    exact: true,
    name: "Create New Audit Request",
    component: CreateAuditRequest,
    title: "Create New Audit Request",
  },
  {
    path: "/transaction",
    exact: true,
    name: "Transactions",
    component: Transactions,
    title: "Transactions",
  },
];

export default route;
