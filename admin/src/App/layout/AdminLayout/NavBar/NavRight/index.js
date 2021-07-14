import React, { useEffect, useState } from "react"
import { Dropdown } from "react-bootstrap"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as userActions from "../../../../../actions/userActions"
import * as notificationActions from "../../../../../actions/notificationActions"
import Aux from "../../../../../hoc/_Aux"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import Badge from "@material-ui/core/Badge"
import NotificationsIcon from "@material-ui/icons/Notifications"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { Link } from "react-router-dom"

const NavRight = (props) => {
  const { superUserInfo, actions, notificationCount } = props
  const [dialog, setDialog] = useState(false)
  const handleLogoutClick = () => {
    setDialog(true)
  }

  const handleClose = (action) => {
    if (action) {
      let params = {}
      actions.userLogout(params)
    }
    setDialog(action)
  }

  useEffect(() => {
    actions.getNotification()
  }, [actions])

  return (
    <>
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li>
            <Link to="/account/notification">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </Link>
          </li>

          <li>
            <Dropdown className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <i className="icon feather icon-settings" />
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <div className="pro-head">
                  {superUserInfo.first_name && (
                    <span>
                      {superUserInfo.first_name.charAt(0).toUpperCase() +
                        superUserInfo.first_name.slice(1) +
                        " " +
                        superUserInfo.last_name.charAt(0).toUpperCase() +
                        superUserInfo.last_name.slice(1)}
                    </span>
                  )}
                </div>
                <ul className="pro-body">
                  <li>
                    <Link
                      to="/account/setting"
                      title="setting"
                      className="dropdown-item"
                    >
                      <i className="feather icon-settings" /> Settings
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/account/profile"
                      title="setting"
                      className="dropdown-item"
                    >
                      <i className="feather icon-user" /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      title="setting"
                      className="dropdown-item"
                      onClick={handleLogoutClick}
                    >
                      <i className="feather icon-lock" /> Logout
                    </Link>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
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
              Are you sure, you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleClose(true)}
              color="primary"
              autoFocus
              variant="contained"
            >
              Yes
            </Button>
            <Button
              onClick={() => handleClose(false)}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

function mapStateToProps(state) {
  return {
    superUserInfo: state.superUserInfo,
    notificationCount: state.notificationCount,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(userActions, notificationActions),
      dispatch
    ),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NavRight)
