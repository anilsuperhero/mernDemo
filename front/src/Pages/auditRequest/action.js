import React from "react";
import { Fab } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DescriptionIcon from "@material-ui/icons/Description";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { useHistory } from "react-router-dom";

export default function SimpleDialog(props) {
  const {
    onClose,
    open,
    handleViewClick,
    handleDeleteClick,
    item,
    handleSlaView,
    handlePaymentClick,
  } = props;
  let history = useHistory();
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
    if (value === "VIEW") {
      handleViewClick(item);
    }
    if (value === "DELETE") {
      handleDeleteClick(item);
    }
    if (value === "SLAUPLOAD") {
      handleSlaView(item);
    }
    if (value === "PAYMENT") {
      handlePaymentClick(item);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Audit request actions</DialogTitle>
      <List>
        {/* <ListItem button onClick={() => handleListItemClick("DELETE")}>
          <ListItemAvatar>
            <Fab variant="extended" size="small" color="secondary">
              <DeleteIcon fontSize="small" />
            </Fab>
          </ListItemAvatar>
          <ListItemText primary="Delete request" />
        </ListItem> */}
        <ListItem button onClick={() => handleListItemClick("VIEW")}>
          <ListItemAvatar>
            <Fab variant="extended" size="small" color="primary">
              <VisibilityIcon fontSize="small" />
            </Fab>
          </ListItemAvatar>
          <ListItemText primary="View request" />
        </ListItem>
        {item.sla_document && (
          <ListItem button onClick={() => handleListItemClick("SLAUPLOAD")}>
            <ListItemAvatar>
              <Fab variant="extended" size="small" color="inherit">
                <DescriptionIcon fontSize="small" />
              </Fab>
            </ListItemAvatar>
            <ListItemText primary="View SLA Document" />
          </ListItem>
        )}
        {item.status === "SLASIGNED" &&
          item.type === "Verification" &&
          item.is_advance === false &&
          item.is_final === false && (
            <ListItem button onClick={() => handleListItemClick("PAYMENT")}>
              <ListItemAvatar>
                <Fab variant="extended" size="small" color="inherit">
                  <MonetizationOnIcon fontSize="small" />
                </Fab>
              </ListItemAvatar>
              <ListItemText primary="Deposit Payment" />
            </ListItem>
          )}

        {item.status === "SLASIGNED" &&
          item.type === "Certification" &&
          item.is_advance === false && (
            <ListItem button onClick={() => handleListItemClick("PAYMENT")}>
              <ListItemAvatar>
                <Fab variant="extended" size="small" color="inherit">
                  <MonetizationOnIcon fontSize="small" />
                </Fab>
              </ListItemAvatar>
              <ListItemText primary="Deposit Payment" />
            </ListItem>
          )}
        {item.is_advance && (
          <ListItem
            button
            onClick={() => history.push("/audit-request/document-update")}
          >
            <ListItemAvatar>
              <Fab variant="extended" size="small" color="inherit">
                <NoteAddIcon fontSize="small" />
              </Fab>
            </ListItemAvatar>
            <ListItemText primary="Upload Documents" />
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}
