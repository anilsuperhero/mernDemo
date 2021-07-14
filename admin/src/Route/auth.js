import Login from "../Pages/Authentication/SignIn"
import ForgotPassword from "../Pages/Authentication/ForgotPassword"
import RestPassword from "../Pages/Authentication/RestPassword"

const route = [
  { path: "/", exact: true, name: "Login", component: Login, title: "Login" },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    title: "Login",
  },
  {
    path: "/forgot-password",
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
    title: "Forgot Password",
  },
  {
    path: "/reset-password",
    exact: true,
    name: "Rest Password",
    component: RestPassword,
    title: "Rest Password",
  },
]

export default route
