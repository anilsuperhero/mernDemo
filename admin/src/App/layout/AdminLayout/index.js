import React, { Component, Suspense } from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { connect } from "react-redux"
import Fullscreen from "react-full-screen"
import windowSize from "react-window-size"
import Loading from "../../../Component/Loader"
import Navigation from "./Navigation"
import NavBar from "./NavBar"
import Loader from "../Loader"
import Alert from "../../../Component/Alert"
import routes from "../../../Route/admin"
import Aux from "../../../hoc/_Aux"
import * as actionTypes from "../../../actions/actions"
import "./app.scss"
const { REACT_APP_LOGIN_PATH, REACT_APP_DEFAULT_PATH } = process.env

class AdminLayout extends Component {
  fullScreenExitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      this.props.onFullScreenExit()
    }
  }

  UNSAFE_componentWillMount() {
    if (
      this.props.windowWidth > 992 &&
      this.props.windowWidth <= 1024 &&
      this.props.layout !== "horizontal"
    ) {
      this.props.onComponentWillMount()
    }
  }

  mobileOutClickHandler() {
    if (this.props.windowWidth < 992 && this.props.collapseMenu) {
      this.props.onComponentWillMount()
    }
  }

  render() {
    /* full screen exit call */
    document.addEventListener("fullscreenchange", this.fullScreenExitHandler)
    document.addEventListener(
      "webkitfullscreenchange",
      this.fullScreenExitHandler
    )
    document.addEventListener("mozfullscreenchange", this.fullScreenExitHandler)
    document.addEventListener("MSFullscreenChange", this.fullScreenExitHandler)

    const menu = routes.map((route, index) => {
      return route.component ? (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          render={(props) =>
            this.props.isSuperUserAuth ? (
              <route.component {...props} title={route.title} />
            ) : (
              <Redirect to={REACT_APP_LOGIN_PATH} />
            )
          }
        />
      ) : null
    })

    return (
      <Aux>
        {this.props.isFetching && <Loading />}
        <Alert />
        <Fullscreen enabled={this.props.isFullScreen}>
          <Navigation />
          <NavBar />
          <div
            className="pcoded-main-container"
            onClick={() => this.mobileOutClickHandler}
          >
            <div className="pcoded-wrapper">
              <div className="pcoded-content">
                <div className="pcoded-inner-content">
                  <div className="main-body">
                    <div className="page-wrapper">
                      <Suspense fallback={<Loader />}>
                        <Switch>
                          {menu}
                          <Redirect from="/" to={REACT_APP_DEFAULT_PATH} />
                        </Switch>
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fullscreen>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    defaultPath: state.defaultPath,
    isFullScreen: state.isFullScreen,
    collapseMenu: state.collapseMenu,
    configBlock: state.configBlock,
    layout: state.layout,
    isSuperUserAuth: state.isSuperUserAuth,
    isFetching: state.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFullScreenExit: () => dispatch({ type: actionTypes.FULL_SCREEN_EXIT }),
    onComponentWillMount: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(windowSize(AdminLayout))
