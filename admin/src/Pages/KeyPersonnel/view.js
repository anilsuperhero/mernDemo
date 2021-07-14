import React from "react";
import { Modal } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { date } from "../../utils/helpers";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

const View = (props) => {
  const { detail } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {detail.first_name}&nbsp;{detail.last_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Key Personnel Details</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="First Name"
                  secondary={detail.first_name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Middle Name"
                  secondary={detail.middle_name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Last Name"
                  secondary={detail.last_name}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email Address"
                  secondary={detail.email}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">&nbsp;</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Mobile Number"
                  secondary={detail.mobile_number}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Position Held"
                  secondary={detail.positionHeld}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Date of Brith"
                  secondary={date(detail.dob)}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Company Details</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={detail.company.name} />
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">&nbsp;</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Abn Number"
                  secondary={detail.company.abn_number}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Modal.Body>
    </Modal>
  );
};

export default View;
