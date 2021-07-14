import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CurrencyFormat from "react-currency-format";
import Button from "@material-ui/core/Button";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import VisibilityIcon from "@material-ui/icons/Visibility";
import InsertDriveFileRoundedIcon from "@material-ui/icons/InsertDriveFileRounded";
import { makeStyles } from "@material-ui/core/styles";
import PDFView from "./pdfViewer";
import ViewSignature from "./viewSignature";
import { useSelector, useDispatch } from "react-redux";
import { showLoader } from "../../actions/baseActions";
const { REACT_APP_CURRENCY, REACT_APP_DOCUSING } = process.env;

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function View(props) {
  const handleClose = () => {
    props.handleClose({});
  };

  const handlePaymentClick = () => {
    item.paymentView = true;
    props.handleClose(item);
  };
  const { open, keyItem } = props;
  const dispatch = useDispatch();
  const [item] = useState(keyItem);
  const classes = useStyles();
  const [pdfUrl, setPdfUrl] = useState();
  const [viewPdf, setPdfViewer] = useState(false);
  const [viewSignature, setSignature] = useState(false);
  const [pdfTitle, setTitle] = useState("");
  const user = useSelector((state) => state.userInfo);

  const slaViewUpload = (action) => {
    if (action) {
      setPdfUrl(item.sla_document);
    }
    setPdfViewer(action);
  };

  const downloadFile = (type) => {
    var url = "";
    if (type === "SLA") {
      url = item.sla_document;
    } else {
      url = item.invoice_document;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.sla_document_old);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  const signature = (action) => {
    setSignature(action);
  };

  const viewPdfFile = (type) => {
    var url = "";
    if (type === "SLA") {
      url = item.sla_document;
      setTitle("SLA Document");
    } else {
      setTitle("INVOICE");
      url = item.invoice_document;
    }
    setPdfViewer(true);
    setPdfUrl(url);
  };

  const signatureDocusign = () => {
    const url =
      REACT_APP_DOCUSING +
      "name=" +
      user.first_name +
      " " +
      user.last_name +
      "&email=" +
      user.email +
      "&id=" +
      item.audit_number +
      "&file=" +
      item.sla_document_old;
    props.handleClose({});
    dispatch(showLoader());
    window.location.href = url;
  };
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
          SLA & INVOICE (#{item.audit_number})
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <div className="file-outer">
                {/* <img src={PDF} alt="pdf_file" />
                <span>{item.sla_document_name}</span> */}
                <div className="amount">
                  <h5>Amount</h5>
                  <span className="amount-value">
                    <CurrencyFormat
                      value={item.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={REACT_APP_CURRENCY}
                    />
                  </span>
                </div>
                {item.type === "Certification" && (
                  <div className="remark-advance">
                    <div className="remark">
                      <strong>Deposit (Payable Now)</strong>
                      <CurrencyFormat
                        value={item.advance_payment}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={REACT_APP_CURRENCY}
                      />
                    </div>

                    <div className="advance">
                      <strong>Final Payment</strong>
                      <CurrencyFormat
                        value={item.final_payment}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={REACT_APP_CURRENCY}
                      />
                    </div>
                  </div>
                )}

                <div className="remarkonly">
                  <strong>Remarks</strong>
                  {item.remarks ? item.remarks : "N/A"}
                </div>
              </div>
              <div>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="default"
                      fullWidth
                      style={{ textAlign: "left" }}
                      className={classes.button}
                      startIcon={<VisibilityIcon />}
                      onClick={() => viewPdfFile("SLA")}
                    >
                      View SLA
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => downloadFile("SLA")}
                      color="primary"
                      className={classes.button}
                      startIcon={<CloudDownloadIcon />}
                    >
                      Download SLA
                    </Button>
                    {item.type === "Verification" &&
                      item.is_advance === false &&
                      item.is_final === false && (
                        <>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => signature(true)}
                            className={classes.button}
                            startIcon={<InsertDriveFileRoundedIcon />}
                          >
                            Signature by self
                          </Button>
                          <Button
                            fullWidth
                            variant="contained"
                            color="default"
                            onClick={() => signatureDocusign(true)}
                            className={classes.button}
                            startIcon={<InsertDriveFileRoundedIcon />}
                          >
                            Signature by docusign
                          </Button>
                        </>
                      )}
                    {item.type === "Certification" &&
                      item.is_advance === false && (
                        <>
                          <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            onClick={() => signature(true)}
                            className={classes.button}
                            startIcon={<InsertDriveFileRoundedIcon />}
                          >
                            Signature by self
                          </Button>
                          <Button
                            fullWidth
                            variant="contained"
                            color="default"
                            className={classes.button}
                            onClick={() => signatureDocusign(true)}
                            startIcon={<InsertDriveFileRoundedIcon />}
                          >
                            Signature by docusign
                          </Button>
                        </>
                      )}
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="default"
                      fullWidth
                      className={classes.button}
                      startIcon={<VisibilityIcon />}
                      onClick={() => viewPdfFile("INVOICE")}
                    >
                      View Invoice
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => downloadFile("INVOICE")}
                      color="primary"
                      className={classes.button}
                      startIcon={<CloudDownloadIcon />}
                    >
                      Download Invoice
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      {viewPdf && (
        <PDFView
          open={viewPdf}
          handleClose={slaViewUpload}
          detail={pdfUrl}
          title={pdfTitle}
        />
      )}
      {viewSignature && (
        <ViewSignature
          open={viewSignature}
          handleClose={signature}
          handleSlaClose={handlePaymentClick}
          detail={item}
        />
      )}
    </div>
  );
}
