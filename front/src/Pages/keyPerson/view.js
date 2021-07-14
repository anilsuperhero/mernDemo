import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { date } from "../../utils/helpers";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function ViewKey(props) {
  const handleClose = () => {
    props.handleClose();
  };
  const { open, keyItem } = props;
  const [item] = useState(keyItem);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {item.first_name} &nbsp;{item.last_name} (
          {item.type === "PERSONNEL" ? "Key Personnel" : "Key Staff"})
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="First Name"
                    secondary={item.first_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Middle Name"
                    secondary={item.middle_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Name"
                    secondary={item.last_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email Address"
                    secondary={item.email}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Mobile Number"
                    secondary={item.mobile_number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Position Held"
                    secondary={item.positionHeld}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Date of Brith"
                    secondary={date(item.dob)}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
