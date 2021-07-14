import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { loadPageData } from "../../actions/homePageActions";

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

export default function CustomizedDialogs(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = () => {
      dispatch(loadPageData("/terms-and-conditions"));
    };
    fetchData();
  }, [dispatch]);

  const { pageData } = useSelector((state) => ({
    pageData: state.pageData,
  }));

  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" };
    }
    return { __html: "" };
  };

  const handleClose = () => {
    props.handleClose();
  };
  const { open } = props;

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
          Terms and Conditions
        </DialogTitle>
        <DialogContent dividers>
          <div
            className="about-page-text"
            dangerouslySetInnerHTML={prepareHtml(pageData.content)}
          ></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
