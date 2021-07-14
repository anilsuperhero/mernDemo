import React from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  function show() {
    document.getElementById("onscroll").classList.toggle("showsidebar");
  }
  return (
    <>
      <Button onClick={show} className="navtoggle">
        <i className="fas fa-arrow-right"></i>
      </Button>
      <div className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              className="App-link dark-gray"
              exact
              activeClassName="active"
              to="/user/dashboard"
            >
              <i className="fas fa-tachometer-alt"></i> <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="App-link dark-gray"
              exact
              activeClassName="active"
              to="/user/profile"
            >
              <i className="far fa-user"></i>
              <span>My Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="App-link dark-gray"
              exact
              activeClassName="active"
              to="/user/key-person"
            >
              <i className="fas fa-users"></i>
              <span>Key Personnel</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="App-link dark-gray"
              exact
              activeClassName="active"
              to="/audit-request"
            >
              <i className="fas fa-book-open"></i>
              <span>Audit Request</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              className="App-link dark-gray"
              exact
              activeClassName="active"
              to="/user/transactions"
            >
              <i className="fas fa-file-alt"></i> <span>Transactions </span>
            </NavLink>
          </li>
          <li>
            <a href="#!">
              <i className="far fa-envelope"></i>
              <span>Messages</span>
            </a>
          </li>
          <li>
            <NavLink
              className="App-link dark-gray"
              exact
              activeClassName="active"
              to="/user/notification"
            >
              <i className="far fa-bell"></i>
              <span>Notification</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
