import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { Form, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import SubmitButton from "../../Component/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { uploadSlaDocument } from "../../actions/auditRequestActions";
import Dropzone from "react-dropzone";
import { formLabelsTheme, checkCharges, checkSpace } from "../../utils/helpers";
import { loadTosterData } from "../../actions/baseActions";
import logo from "../../assets/images/pdf.svg";
import PDFView from "./pdfViewer";
import Spinner from "../../Component/Loader";

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

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50663c",
    },
    "& .Mui-focused": {
      color: "#50663c",
    },
  },
});

export default function View(props) {
  const { open, detail } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [item] = useState(detail);
  const [selectedFile, setSelectedFile] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [spinner, setSpinner] = useState(false);
  const [viewPdf, setPdfViewer] = useState(false);
  const { register, errors, handleSubmit, getValues, setValue } = useForm({
    defaultValues: item,
  });
  const handleClose = () => {
    props.handleClose("SLA");
  };
  const onSubmit = (data) => {
    if (selectedFile.length === 0 && !item.sla_document_old) {
      dispatch(
        loadTosterData({
          open: true,
          message: "Please upload SLA document.",
          severity: "error",
        })
      );
      return false;
    }
    const formData = new FormData();
    formData.append("amount", data.amount);
    formData.append("advance_payment", data.advance_payment);
    formData.append("final_payment", data.final_payment);
    formData.append("sla_document_old", item.sla_document_old);
    formData.append("_id", data._id);
    if (data.remarks) {
      formData.append("remarks", data.remarks);
    }
    if (selectedFile.length !== 0) {
      formData.append("sla_document", selectedFile[0]);
    }
    setSpinner(true);
    dispatch(uploadSlaDocument(formData, closeSpinner, handleClose));
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      dispatch(
        loadTosterData({
          open: true,
          message: "Please select valid file.",
          severity: "error",
        })
      );
      return false;
    }
    setSelectedFile(acceptedFiles);
    var pdfUrl = URL.createObjectURL(acceptedFiles[0]);
    setPdfUrl(pdfUrl);
  };

  const removeImage = () => {
    setSelectedFile([]);
  };
  const handleClosePDFView = () => {
    setPdfViewer(false);
  };
  const fileView = () => {
    setPdfViewer(true);
  };
  const closeSpinner = () => {
    setSpinner(false);
  };
  const fileViewUpload = () => {
    setPdfUrl(item.sla_document);
    setPdfViewer(true);
  };

  const checkPaymentValues = () => {
    var advance_payment = getValues("advance_payment")
      ? getValues("advance_payment")
      : 0;
    var final_payment = getValues("final_payment")
      ? getValues("final_payment")
      : 0;
    var totalAmount = parseFloat(advance_payment) + parseFloat(final_payment);
    setValue("amount", totalAmount);
  };

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
          SLA documents upload for "{item.title}(#{item.audit_number})"
        </DialogTitle>
        <DialogContent dividers>
          <MuiThemeProvider theme={formLabelsTheme}>
            {spinner && <Spinner />}
            <Form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Row className="justify-content-center mx-auto">
                <Col md={6} lg={6}>
                  {item.type === "Certification" && (
                    <Form.Group controlId="formBasicAdvance_payment">
                      <TextField
                        required
                        id="outlined-Advance_payment"
                        label="Advance payment"
                        variant="outlined"
                        fullWidth
                        onChange={checkPaymentValues}
                        onKeyDown={(event) => checkCharges(event)}
                        className={
                          !errors.advance_payment ? classes.root : "w-100"
                        }
                        error={errors.advance_payment ? true : false}
                        name="advance_payment"
                        inputRef={register({
                          required: "Please enter advance payment.",
                        })}
                        helperText={
                          errors.advance_payment &&
                          errors.advance_payment.message
                        }
                      />
                    </Form.Group>
                  )}
                  {item.type === "Certification" && (
                    <Form.Group controlId="formBasicFinal_payment">
                      <TextField
                        required
                        id="outlined-Final_payment"
                        label="Final payment"
                        variant="outlined"
                        fullWidth
                        onChange={checkPaymentValues}
                        onKeyDown={(event) => checkCharges(event)}
                        className={
                          !errors.final_payment ? classes.root : "w-100"
                        }
                        error={errors.final_payment ? true : false}
                        name="final_payment"
                        inputRef={register({
                          required: "Please enter final payment.",
                        })}
                        helperText={
                          errors.final_payment && errors.final_payment.message
                        }
                      />
                    </Form.Group>
                  )}
                  <Form.Group controlId="formBasicAmount">
                    <TextField
                      required
                      id="outlined-amount"
                      label="Charges"
                      variant="outlined"
                      fullWidth
                      onKeyDown={(event) => checkCharges(event)}
                      className={!errors.amount ? classes.root : "w-100"}
                      error={errors.amount ? true : false}
                      name="amount"
                      InputProps={{
                        readOnly: item.type === "Certification" ? true : false,
                      }}
                      inputRef={register({
                        required: "Please enter charges.",
                      })}
                      helperText={errors.amount && errors.amount.message}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicRemarks">
                    <TextField
                      as="textarea"
                      id="outlined-remarks"
                      label="Remarks For Company"
                      variant="outlined"
                      fullWidth
                      className={!errors.remarks ? classes.root : "w-100"}
                      error={errors.remarks ? true : false}
                      name="remarks"
                      multiline
                      rows={8}
                      inputRef={register({
                        maxLength: {
                          value: 500,
                          message: "Remarks should not exceed 500 characters.",
                        },
                        validate: {
                          isSpace: (value) =>
                            checkSpace(value) ||
                            "Remove trailing spaces from remarks.",
                        },
                      })}
                      helperText={
                        errors.copy_right && errors.copy_right.message
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6} lg={6}>
                  <Dropzone onDrop={handleDrop} accept=".pdf" multiple={false}>
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Upload SLA File (You can only able to choose .PDF)
                        </p>
                        <small>Click to select file or Drag and Drop.</small>
                      </div>
                    )}
                  </Dropzone>

                  {selectedFile.length !== 0 && (
                    <div className="Uploaded-image">
                      <div className="image_file_name">
                        <div className="image">
                          <img
                            src={logo}
                            alt="Pdf fiels"
                            height="60px"
                            className="p-2"
                          />
                          <span
                            onClick={removeImage}
                            className="nav-link-remove"
                          >
                            X
                          </span>
                        </div>
                        <div className="file_name" onClick={fileView}>
                          {selectedFile[0].name}
                        </div>
                        <small>
                          Click on "{selectedFile[0].name}" to check upload file
                          preview.
                        </small>
                      </div>
                    </div>
                  )}

                  {item.sla_document_old && selectedFile.length === 0 && (
                    <div className="Uploaded-image">
                      <div className="image_file_name">
                        <div className="image">
                          <img
                            src={logo}
                            alt="Pdf fiels"
                            height="60px"
                            className="p-2"
                          />
                        </div>
                        <div className="file_name" onClick={fileViewUpload}>
                          {item.sla_document_name}
                        </div>
                        <small>
                          Click on "{item.sla_document_name}" to check upload
                          file preview.
                        </small>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
              <Form.Control type="hidden" name="_id" ref={register({})} />
              <Row className="mt-5 ml-1">
                <Col md={2} sm={2} lg={2}>
                  <SubmitButton title={item._id ? "Submit" : "Submit"} />
                </Col>
              </Row>
            </Form>
          </MuiThemeProvider>
        </DialogContent>
      </Dialog>
      {viewPdf && (
        <PDFView
          open={viewPdf}
          handleClose={handleClosePDFView}
          detail={pdfUrl}
        />
      )}
    </div>
  );
}
