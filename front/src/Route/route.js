// CMS Page Routes
import FaqPage from "../Pages/Faq";
import cmsPage from "../Pages/Cms";
import ContactUs from "../Pages/ContactUs";
import NotFoundPage from "../Pages/NotFound";
import DocuSign from "../Pages/Docusign";

// Auth Page Routes
import LoginPage from "../Pages/Authentication/SignIn";
import ForgotPasswordPage from "../Pages/Authentication/ForgotPassword";
import ResetPasswordPage from "../Pages/Authentication/RestPassword";

// After login Page Routes
import DashboardPage from "../Pages/Dashboard";
import ProfilePage from "../Pages/Profile";
import ChangePasswordPage from "../Pages/ChangePassword";
import KeyPerson from "../Pages/keyPerson";
import AuditRequest from "../Pages/auditRequest";
import Notification from "../Pages/Notification";
import Transaction from "../Pages/Transaction";

export const RoutesPage = [
  { path: "/faq", component: FaqPage, title: "FAQ's" },
  { path: "/about-us", component: cmsPage, title: "About Us" },
  {
    path: "/terms-and-conditions",
    component: cmsPage,
    title: "Terms & Conditons",
  },
  { path: "/contact-us", component: ContactUs, title: "Contact Us" },
  { path: "/404", component: NotFoundPage, title: "404" },
];

export const RoutesAuth = [
  { path: "/", component: LoginPage, title: "Login" },
  {
    path: "/forgot-password",
    component: ForgotPasswordPage,
    title: "Forgot Password",
  },
  {
    path: "/reset-password",
    component: ResetPasswordPage,
    title: "Reset Password",
  },
];

export const RoutesUser = [
  { path: "/user/dashboard", component: DashboardPage, title: "Dashboard" },
  { path: "/user/profile", component: ProfilePage, title: "Update profile" },
  {
    path: "/user/change-password",
    component: ChangePasswordPage,
    title: "Change Password",
  },
  {
    path: "/user/key-person",
    component: KeyPerson,
    title: "Key Personnel",
  },
  {
    path: "/audit-request",
    component: AuditRequest,
    title: "Audit Request",
  },
  {
    path: "/user/notification",
    component: Notification,
    title: "Notification",
  },
  {
    path: "/user/transactions",
    component: Transaction,
    title: "Transactions",
  },
  {
    path: "/docusign",
    component: DocuSign,
    title: "DocuSign",
  },
  {
    path: "/audit-request/document-update",
    component: DocuSign,
    title: "Document Upload",
  },
];
