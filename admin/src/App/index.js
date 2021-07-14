import React, { Suspense, useEffect } from "react"
import { Switch, Route, Redirect, useLocation } from "react-router-dom"
import Loadable from "react-loadable"
import { useSelector, useDispatch } from "react-redux"
import { loadPathName } from "../actions/baseActions"
import "../../node_modules/font-awesome/scss/font-awesome.scss"
import "./../assets/scss/style.scss"
import "@fortawesome/fontawesome-free/css/all.css"
import Loader from "./layout/Loader"
import Aux from "../hoc/_Aux"
import ScrollToTop from "./layout/ScrollToTop"
import routes from "../Route/auth"
const { REACT_APP_DEFAULT_PATH } = process.env

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
})
const App = () => {
  const dispatch = useDispatch()
  const { isSuperUserAuth } = useSelector((state) => ({
    isSuperUserAuth: state.isSuperUserAuth,
  }))
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname.split("/")
    dispatch(loadPathName(pathname))
  }, [location, dispatch])

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        name={route.name}
        render={(props) =>
          isSuperUserAuth === true ? (
            <Redirect to={REACT_APP_DEFAULT_PATH} />
          ) : (
            <route.component {...props} title={route.title} />
          )
        }
      />
    ) : null
  })

  return (
    <Aux>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Route path="/" component={AdminLayout} />
        </Switch>
      </Suspense>
    </Aux>
  )
}

export default App
