import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { Form, Row, Col } from "react-bootstrap";
import SubmitButton from "../../Component/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { loadToasterData } from "../../actions/baseActions";
import { PDF } from "../../assets/img/index";
import PDFView from "./pdfViewer";
import Spinner from "../../Component/Loader";
import { uploadSlaDocument } from "../../actions/auditRequestActions";

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
  const { open, detail, handleSlaClose } = props;
  const dispatch = useDispatch();

  const [item] = useState(detail);
  const [selectedFile, setSelectedFile] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [spinner, setSpinner] = useState(false);
  const [viewPdf, setPdfViewer] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: item,
  });
  const handleClose = () => {
    props.handleClose(false);
  };
  const onSubmit = (data) => {
    if (selectedFile.length === 0 && !item.sla_document_sign_old) {
      dispatch(
        loadToasterData({
          open: true,
          message: "Please upload signed SLA document.",
          severity: "error",
        })
      );
      return false;
    }
    const formData = new FormData();
    formData.append("sla_document_sign_old", item.sla_document_sign_old);
    formData.append("_id", data._id);
    if (selectedFile.length !== 0) {
      formData.append("sla_document_sign", selectedFile[0]);
    }
    setSpinner(true);
    dispatch(
      uploadSlaDocument(formData, closeSpinner, handleClose, handleSlaClose)
    );
  };

  const handleDrop = (acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      dispatch(
        loadToasterData({
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
    setPdfUrl(item.sla_document_sign);
    setPdfViewer(true);
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
          Signature by self
        </DialogTitle>
        <DialogContent dividers>
          {spinner && <Spinner />}
          <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Row className="justify-content-center mx-auto">
              <Col md={12} lg={12}>
                <Dropzone onDrop={handleDrop} accept=".pdf" multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: "dropzone" })}>
                      <input {...getInputProps()} />
                      <p>
                        Upload signed SLA document File (You can only able to
                        choose .PDF)
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
                          src={PDF}
                          alt="Pdf fiels"
                          height="60px"
                          className="p-2"
                        />
                        <span onClick={removeImage} className="nav-link-remove">
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

                {item.sla_document_sign && selectedFile.length === 0 && (
                  <div className="Uploaded-image">
                    <div className="image_file_name">
                      <div className="image">
                        <img
                          src={PDF}
                          alt="Pdf fiels"
                          height="60px"
                          className="p-2"
                        />
                      </div>
                      <div className="file_name" onClick={fileViewUpload}>
                        {item.sla_document_sign_name}
                      </div>
                      <small>
                        Click on "{item.sla_document_sign_name}" to check upload
                        file preview.
                      </small>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <Form.Control type="hidden" name="_id" ref={register({})} />
            <Row className="mt-5 ml-1">
              <Col md={12} sm={12} lg={12}>
                <SubmitButton
                  title={item.sla_document_sign_old ? "Update" : "Submit"}
                />
              </Col>
            </Row>
          </Form>
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
