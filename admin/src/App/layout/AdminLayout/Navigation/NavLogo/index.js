import React from "react"
import DEMO from "./../../../../../config"
import Aux from "../../../../../hoc/_Aux"
import logo from "../../../../../assets/images/sort_logo.svg"
const { REACT_APP_APP_NAME } = process.env
const navLogo = (props) => {
  let toggleClass = ["mobile-menu"]
  if (props.collapseMenu) {
    toggleClass = [...toggleClass, "on"]
  }

  return (
    <Aux>
      <div className="navbar-brand header-logo">
        <a href={DEMO.BLANK_LINK} className="b-brand">
          <div className="b-bg">
            <img src={logo} alt="logo" />
          </div>
          <span className="b-title">{REACT_APP_APP_NAME}</span>
        </a>
        <a
          href={DEMO.BLANK_LINK}
          className={toggleClass.join(" ")}
          id="mobile-collapse"
          onClick={props.onToggleNavigation}
        >
          <span />
        </a>
      </div>
    </Aux>
  )
}

export default navLogo
