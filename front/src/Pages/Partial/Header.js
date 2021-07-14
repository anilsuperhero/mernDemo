import React from "react";
import { Container, Button } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { logo } from "../../assets/img/index";

const Header = () => {
  const { isAuth } = useSelector((state) => ({
    isAuth: state.isAuth,
  }));
  document.getElementById("onscroll").onscroll = function () {
    var element = document.getElementById("navbar_scroll_fixed");
    var scroll = window.scrollY;
    if (scroll <= 20) {
      element.classList.remove("fixed-top");
    } else {
      element.classList.add("fixed-top");
    }
  };

  function headnav() {
    document.getElementById("onscroll").classList.toggle("shownavbar");
  }

  return (
    <header className="App-header" id="navbar_scroll_fixed">
      <Container fixed>
        <div className="header-row">
          <Link to="/" className="App-brand">
            <img src={logo} alt="logo" />
          </Link>

          <div className="headerright">
            <Button className="mobile-nav-btn" onClick={headnav}>
              <span>
                <i className="fas fa-bars"></i>
              </span>
            </Button>
            <nav className="navbar">
              <ul>
                <li>
                  <NavLink
                    className="App-link dark-gray"
                    exact
                    activeClassName="active"
                    to="/about-us"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="App-link dark-gray"
                    exact
                    activeClassName="active"
                    to="/terms-and-conditions"
                  >
                    Terms and Conditions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="App-link dark-gray"
                    exact
                    activeClassName="active"
                    to="/faq"
                  >
                    FAQ's
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="App-link dark-gray"
                    exact
                    activeClassName="active"
                    to="/contact-us"
                  >
                    Contact Us
                  </NavLink>
                </li>
                {isAuth && (
                  <li>
                    <NavLink
                      className="App-link dark-gray"
                      exact
                      activeClassName="active"
                      to="/user/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};
export default Header;
