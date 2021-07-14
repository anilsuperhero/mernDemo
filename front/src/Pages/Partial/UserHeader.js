import React, { useState, useRef } from "react";
import { Container } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { logo } from "../../assets/img/index";
import { userLogout } from "../../actions/userActions";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const Header = () => {
  document.getElementById("onscroll").onscroll = function () {
    var element = document.getElementById("navbar_scroll_fixed");
    var scroll = window.scrollY;
    if (element) {
      if (scroll <= 100) {
        element.classList.remove("fixed-top");
      } else {
        element.classList.add("fixed-top");
      }
    }

    element = document.getElementById("onscroll");
    scroll = window.scrollY;
    if (element) {
      if (scroll <= 100) {
        element.classList.remove("gototop");
      } else {
        element.classList.add("gototop");
      }
    }
  };

  const { userInfo, notificationCount } = useSelector((state) => ({
    userInfo: state.userInfo,
    notificationCount: state.notificationCount,
  }));

  const [dialog, setDialog] = useState(false);
  const handleLogoutClick = () => {
    setDialog(true);
  };
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const { push } = useHistory();
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleCloseAction = (action) => {
    if (action) {
      dispatch(userLogout(push));
    }
    setDialog(action);
  };

  const handlenNotificationClick = () => {
    push("/user/notification");
  };

  return (
    <header className="App-header dashboard-header" id="navbar_scroll_fixed">
      <Container>
        <div className="header-row">
          <Link to="/" className="App-brand">
            <img src={logo} className="App-logo" alt="logo" />
          </Link>
          <div className="headerright after-login" id="header-rightbar-navitem">
            <div className="notification">
              <Badge
                badgeContent={notificationCount}
                color="error"
                onClick={handlenNotificationClick}
              >
                <NotificationsIcon />
              </Badge>
            </div>

            <div
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              className="profile black-text"
            >
              <small>Welcome</small>
              {userInfo.company_name}
              <i
                className={
                  open ? "fas fa-chevron-down" : "fas fa-chevron-right"
                }
              ></i>
            </div>

            <div className="top-space">
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={handleClose}>
                            <NavLink
                              className="App-link"
                              exact
                              to="/user/profile"
                            >
                              <i className="fas fa-user"></i>&nbsp;Profile
                            </NavLink>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <NavLink
                              className="App-link"
                              exact
                              to="/user/change-password"
                            >
                              <i className="fas fa-key"></i>&nbsp;Change
                              Password
                            </NavLink>
                          </MenuItem>
                          <MenuItem
                            onClick={handleLogoutClick}
                            className="user_logout"
                          >
                            <i className="fas fa-sign-out-alt"></i>&nbsp; Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        </div>
      </Container>
      <div>
        <Dialog
          open={dialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Account Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure, you want to logout account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleCloseAction(true)}
              color="primary"
              autoFocus
              variant="contained"
            >
              Yes
            </Button>
            <Button
              onClick={() => handleCloseAction(false)}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </header>
  );
};
export default Header;
