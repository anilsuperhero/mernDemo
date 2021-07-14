import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dateFromNow } from "../../utils/helpers";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import Delete from "../../Component/Delete";
import Button from "@material-ui/core/Button";
import { loadDialogData } from "../../actions/baseActions";
import { notification } from "../../assets/img/index";
import {
  deleteData,
  updateNotification,
  clearAllNotification,
} from "../../actions/notificationActions";
import NotLoad from "../../Component/Table/NotLoad";

const Index = (props) => {
  const { notificationList, dialogOpen } = useSelector((state) => ({
    notificationList: state.notificationList,
    dialogOpen: state.dialogOpen,
  }));
  const [dialog, setDialog] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(updateNotification());
    }, 6000);
  }, [dispatch]);

  const handleDeleteClick = (data) => {
    if (data._id) {
      if (data.action) {
        dispatch(deleteData(data._id));
      } else {
        data.message = "Are you sure, you want to delete ";
        data.dialogTitle = "Delete Notification";
        data.open = true;
        setDialog(data);
        dispatch(loadDialogData(true));
      }
    } else {
      if (data.action) {
        dispatch(clearAllNotification());
      } else {
        data.message = "Are you sure, you want to clear all notification";
        data.dialogTitle = "Clear Notification";
        data.open = true;
        setDialog(data);
        dispatch(loadDialogData(true));
      }
    }
  };

  return (
    <div className="myaccount-edit-form-notification">
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
            <Card className={item.status === 0 ? "card_header" : "header"}>
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
                subheader={dateFromNow(item.created_at)}
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
      {notificationList.length === 0 && <NotLoad image={notification} />}
      {dialogOpen && (
        <Delete dialog={dialog} handleDeleteClick={handleDeleteClick} />
      )}
    </div>
  );
};

export default Index;
