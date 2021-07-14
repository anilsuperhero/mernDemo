import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Aux from "../../hoc/_Aux"
import Breadcrum from "../../Component/Breadcrum"
import { datefromNow } from "../../utils/helpers"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Avatar from "@material-ui/core/Avatar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import Delete from "../../Component/Delete"
import Button from "@material-ui/core/Button"
import { loadDialogData } from "../../actions/baseActions"
import {
  deleteData,
  updateNotification,
  clearAllNotification,
} from "../../actions/notificationActions"
import logo from "../../assets/images/notification.svg"
const Index = (props) => {
  const { title } = props
  const { superUserInfo, notificationList, dialogOpen } = useSelector(
    (state) => ({
      superUserInfo: state.superUserInfo,
      notificationList: state.notificationList,
      dialogOpen: state.dialogOpen,
    })
  )
  const [dialog, setDialog] = useState({})
  const dispatch = useDispatch()
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateNotification())
    }, 6000)
  }, [dispatch])

  const handleDeleteClick = (data) => {
    if (data._id) {
      if (data.action) {
        dispatch(deleteData(data._id))
      } else {
        data.message = "Are you sure, you want to delete "
        data.dialogTitle = "Delete Notification"
        data.open = true
        setDialog(data)
        dispatch(loadDialogData(true))
      }
    } else {
      if (data.action) {
        dispatch(clearAllNotification())
      } else {
        data.message = "Are you sure, you want to clear all notification"
        data.dialogTitle = "Clear Notification"
        data.open = true
        setDialog(data)
        dispatch(loadDialogData(true))
      }
    }
  }

  return (
    <>
      <Breadcrum title={title} />
      <Aux>
        <Row>
          <Col>
            <Row className="pt-3">
              <Col md={3}>
                <Card>
                  <div className="card-block">
                    <div className="text-center project-main">
                      <img
                        className="img-fluid rounded-circle"
                        src={superUserInfo.image}
                        alt="dashboard-user"
                      />
                      <h5 className="mt-4">
                        {superUserInfo.first_name.charAt(0).toUpperCase() +
                          superUserInfo.first_name.slice(1) +
                          " " +
                          superUserInfo.last_name.charAt(0).toUpperCase() +
                          superUserInfo.last_name.slice(1)}
                      </h5>
                      <span className="d-block">Last Login</span>
                      <span className="d-block">
                        {superUserInfo.last_login_at}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col md={9}>
                {notificationList.length > 0 && (
                  <div className="pb-3 text-right">
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick({})}
                    >
                      Clear All
                    </Button>
                  </div>
                )}
                {notificationList.length > 0 &&
                  notificationList.map((item, key) => (
                    <div className="pb-3" key={key}>
                      <Card
                        className={item.status === 0 ? "card_header" : "header"}
                      >
                        <CardHeader
                          avatar={
                            <Avatar aria-label="recipe">
                              {item.title[0].toUpperCase()}
                            </Avatar>
                          }
                          action={
                            <IconButton
                              aria-label="settings"
                              onClick={() => handleDeleteClick(item)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                          title={item.title}
                          subheader={datefromNow(item.created_at)}
                        />
                        <CardContent>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className="pl-5 pt-0"
                          >
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                {notificationList.length === 0 && (
                  <Card>
                    <div className="text-center">
                      <img
                        src={logo}
                        alt="notfound"
                        className="p-5"
                        height="200px"
                      />
                      <h3>Sorry we couldn't find any data</h3>
                      <Row className="text-center">
                        <Col md={2} className="mt-3 mx-auto"></Col>
                      </Row>
                    </div>
                  </Card>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Aux>
      {dialogOpen && (
        <Delete dialog={dialog} handleDeleteClick={handleDeleteClick} />
      )}
    </>
  )
}

export default Index
