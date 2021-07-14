import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { printPlugin } from "@react-pdf-viewer/print";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/print/lib/styles/index.css";

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

export default function View(props) {
  const handleClose = () => {
    props.handleClose();
  };

  const printPluginInstance = printPlugin();
  const { PrintButton } = printPluginInstance;
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
  const { open, detail, title } = props;

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.4.456/build/pdf.worker.min.js">
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    flexDirection: "column",
                    height: "750px",
                  }}
                >
                  <div
                    style={{
                      alignItems: "center",
                      backgroundColor: "#eeeeee",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      justifyContent: "center",
                      padding: "4px",
                    }}
                  >
                    <PrintButton />
                    <ZoomOutButton />
                    <ZoomPopover />
                    <ZoomInButton />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      overflow: "hidden",
                    }}
                  >
                    <Viewer
                      fileUrl={detail}
                      plugins={[printPluginInstance, zoomPluginInstance]}
                    />
                  </div>
                </div>
              </Worker>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
