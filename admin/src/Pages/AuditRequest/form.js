import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import BackButton from "../../Component/BackButton";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  loadTosterData,
  loadSelectedDocument,
} from "../../actions/baseActions";
import Dropzone from "react-dropzone";
import {
  formLabelsTheme,
  checkMobileNumber,
  checkCharges,
  checkSpace,
} from "../../utils/helpers";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  loadRegistrationGroupData,
  createRequestData,
} from "../../actions/auditRequestActions";
import logo from "../../assets/images/pdf.svg";
import PDFView from "./pdfViewer";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const RadioButton = withStyles({
  root: {
    color: "#50663c",
    "&$checked": {
      color: "#50663c",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const FormModal = (props) => {
  const [companyId, setCompanyId] = useState("");
  const [auditType, setAuditType] = useState("VERIFICATION");
  const dispatch = useDispatch();
  const classes = useStyles();
  const { item } = props;
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const { register, errors, handleSubmit, getValues, setValue } = useForm();
  const { companyList, registrationGroupList, selectedDocument } = useSelector(
    (state) => ({
      companyList: state.companyList,
      registrationGroupList: state.registrationGroupList,
      selectedDocument: state.selectedDocument,
    })
  );
  const onSubmit = (data) => {
    data.company_id = companyId;
    if (selectedFile.length === 0) {
      dispatch(
        loadTosterData({
          open: true,
          message: "Please upload SLA document.",
          severity: "error",
        })
      );
      return false;
    }
    if (selectedFileInvoice.length === 0) {
      dispatch(
        loadTosterData({
          open: true,
          message: "Please upload invoice.",
          severity: "error",
        })
      );
      return false;
    }
    if (registGroup.length === 0) {
      dispatch(
        loadTosterData({
          open: true,
          message: "Please select any one registration group.",
          severity: "error",
        })
      );
      return false;
    }

    const formData = new FormData();
    formData.append("company_id", companyId);
    formData.append("title", data.title);
    formData.append("size_of_company", data.size_of_company);
    formData.append("number_of_clients", data.number_of_clients);
    formData.append("invoice_number", data.invoice_number);
    formData.append("type", auditType);
    formData.append("amount", data.amount);
    formData.append("advance_payment", data.advance_payment);
    formData.append("final_payment", data.final_payment);
    if (data.remarks) {
      formData.append("remarks", data.remarks);
    }
    formData.append("sla_document", selectedFile[0]);
    formData.append("invoice", selectedFileInvoice[0]);
    formData.append("registration_group", JSON.stringify(registGroup));
    formData.append("selectedDocument", JSON.stringify(selectedDocument));
    dispatch(createRequestData(formData, goToPreviousPath));
  };
  const handleRadioChange = (event) => {
    setAuditType(event.target.value);
  };

  useEffect(() => {
    dispatch(loadRegistrationGroupData());
  }, [dispatch]);

  useEffect(() => {
    if (registrationGroupList.length > 0) {
      var rows = [];
      for (var i = 0; i < registrationGroupList.length; i++) {
        var item = registrationGroupList[i].document;
        for (var j = 0; j < item.length; j++) {
          var documentData = item[j];
          rows.push(documentData);
        }
      }
      setDocumentList(rows);
      dispatch(loadSelectedDocument(rows));
    }
    setRegistrationGroup(registrationGroupList);
    setRegistrationGroupData(registrationGroupList);
  }, [registrationGroupList, dispatch]);

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
  const [registGroup, setRegistrationGroup] = useState([]);
  const [registrationGroup, setRegistrationGroupData] = useState([]);
  const [documentListData, setDocumentList] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFileInvoice, setSelectedFileInvoice] = useState([]);
  const [pdfUrl, setPdfUrl] = useState();
  const [viewPdf, setPdfViewer] = useState(false);

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

  const handleDropInvoice = (acceptedFiles) => {
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
    setSelectedFileInvoice(acceptedFiles);
    var pdfUrl = URL.createObjectURL(acceptedFiles[0]);
    setPdfUrl(pdfUrl);
  };

  const removeImage = () => {
    setSelectedFile([]);
  };
  const removeInvoiceFile = () => {
    setSelectedFileInvoice([]);
  };
  const fileView = (type) => {
    if (type === "SLA") {
      var pdfUrl = URL.createObjectURL(selectedFile[0]);
      setPdfUrl(pdfUrl);
    } else {
      pdfUrl = URL.createObjectURL(selectedFileInvoice[0]);
      setPdfUrl(pdfUrl);
    }
    setPdfViewer(true);
  };

  const handleClosePDFView = () => {
    setPdfViewer(false);
  };

  const handleRegistrationClick = (e, value) => {
    setRegistrationGroupData(value);
    if (value.length > 0) {
      var rows = [];
      for (var i = 0; i < value.length; i++) {
        var item = value[i].document;
        for (var j = 0; j < item.length; j++) {
          var documentData = item[j];
          rows.push(documentData);
        }
      }
      dispatch(loadSelectedDocument(rows));
    } else {
      dispatch(loadSelectedDocument([]));
    }
  };

  const handleDocumentClick = (e, value) => {
    dispatch(loadSelectedDocument(value));
    var rows = [];
    for (var i = 0; i < value.length; i++) {
      var item = value[i].registration_group_id;
      for (var j = 0; j < registGroup.length; j++) {
        var itemData = registGroup[j];
        if (itemData._id === item._id) {
          rows.push(itemData);
        }
      }
    }
    const result = rows.filter((v, i) => {
      return rows.map((val) => val.title).indexOf(v.title) === i;
    });
    setRegistrationGroupData(result);
  };

  return (
    <>
      <MuiThemeProvider theme={formLabelsTheme}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Form.Control
            type="hidden"
            name="id"
            defaultValue={item._id}
            ref={register({})}
          />
          <Row>
            <Col md={6} lg={6}>
              <Form.Group controlId="formBasicCompany">
                <FormLabel component="legend">Audit Type</FormLabel>
                <Form.Group controlId="formBasic_type_request">
                  <RadioGroup
                    aria-label="quiz"
                    name="quiz"
                    value={auditType}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="VERIFICATION"
                      control={<RadioButton />}
                      label="Verification"
                    />
                    <FormControlLabel
                      value="CERTIFICATION"
                      control={<RadioButton />}
                      label="Certification"
                    />
                  </RadioGroup>
                </Form.Group>
                <Autocomplete
                  id="combo-box-demo"
                  options={companyList}
                  onChange={(event, value) => setCompanyId(value._id)}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Select Company"
                      variant="outlined"
                      fullWidth
                      error={errors.company_id ? true : false}
                      name="company_id"
                      inputRef={register({
                        required: "Please choose any one company.",
                      })}
                      helperText={
                        errors.company_id && errors.company_id.message
                      }
                    />
                  )}
                />
              </Form.Group>
              <Form.Group controlId="formBasicTitle">
                <TextField
                  required
                  id="outlined-title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  className={!errors.title ? classes.root : "w-100"}
                  error={errors.title ? true : false}
                  name="title"
                  inputRef={register({
                    required: "Please enter title.",
                    minLength: {
                      value: 3,
                      message: "Title should contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 100,
                      message: "Title should not exceed 100 characters.",
                    },
                  })}
                  helperText={errors.title && errors.title.message}
                />
              </Form.Group>
              <Form.Group controlId="formSizeOfCompany">
                <TextField
                  id="outlined-size_of_company"
                  required
                  label="Size Of Company"
                  variant="outlined"
                  fullWidth
                  className={!errors.size_of_company ? classes.root : "w-100"}
                  onKeyDown={(event) => checkMobileNumber(event)}
                  error={errors.size_of_company ? true : false}
                  name="size_of_company"
                  inputRef={register({
                    required: "Please enter Size of Company.",
                    minLength: {
                      value: 1,
                      message:
                        "Size of Company should contain at least 1 digits.",
                    },
                    maxLength: {
                      value: 5,
                      message: "Size of Company should not exceed 5 digits.",
                    },
                  })}
                  helperText={
                    errors.size_of_company && errors.size_of_company.message
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicnumber_of_clients">
                <TextField
                  id="outlined-number_of_clients"
                  required
                  label="Number of participants / Clients"
                  variant="outlined"
                  fullWidth
                  className={!errors.number_of_clients ? classes.root : "w-100"}
                  onKeyDown={(event) => checkMobileNumber(event)}
                  error={errors.number_of_clients ? true : false}
                  name="number_of_clients"
                  inputRef={register({
                    required: "Please enter participants / Clients.",
                    minLength: {
                      value: 1,
                      message:
                        "Participants / Clients should contain at least 1 digits.",
                    },
                    maxLength: {
                      value: 7,
                      message:
                        "Participants / Clients should not exceed 7 digits.",
                    },
                  })}
                  helperText={
                    errors.number_of_clients && errors.number_of_clients.message
                  }
                />
              </Form.Group>
              <Form.Group controlId="formInvoice">
                <TextField
                  id="outlined-invoice_number"
                  required
                  label="Invoice Number"
                  variant="outlined"
                  fullWidth
                  className={!errors.invoice_number ? classes.root : "w-100"}
                  onKeyDown={(event) => checkMobileNumber(event)}
                  error={errors.invoice_number ? true : false}
                  name="invoice_number"
                  inputRef={register({
                    required: "Please enter invoice number.",
                    minLength: {
                      value: 1,
                      message:
                        "Invoice number should contain at least 1 digits.",
                    },
                    maxLength: {
                      value: 15,
                      message: "Invoice number should not exceed 15 digits.",
                    },
                  })}
                  helperText={
                    errors.invoice_number && errors.invoice_number.message
                  }
                />
              </Form.Group>

              {auditType === "CERTIFICATION" && (
                <Form.Group controlId="formBasicAdvance_payment">
                  <TextField
                    required
                    id="outlined-Advance_payment"
                    label="Advance payment"
                    variant="outlined"
                    fullWidth
                    onChange={checkPaymentValues}
                    onKeyDown={(event) => checkCharges(event)}
                    className={!errors.advance_payment ? classes.root : "w-100"}
                    error={errors.advance_payment ? true : false}
                    name="advance_payment"
                    inputRef={register({
                      required: "Please enter advance payment.",
                    })}
                    helperText={
                      errors.advance_payment && errors.advance_payment.message
                    }
                  />
                </Form.Group>
              )}
              {auditType === "CERTIFICATION" && (
                <Form.Group controlId="formBasicFinal_payment">
                  <TextField
                    required
                    id="outlined-Final_payment"
                    label="Final payment"
                    variant="outlined"
                    fullWidth
                    onChange={checkPaymentValues}
                    onKeyDown={(event) => checkCharges(event)}
                    className={!errors.final_payment ? classes.root : "w-100"}
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
                    readOnly: auditType === "CERTIFICATION" ? true : false,
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
                  rows={4}
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
                  helperText={errors.remarks && errors.remarks.message}
                />
              </Form.Group>
            </Col>
            <Col md={6} lg={6}>
              {registGroup.length > 0 && (
                <Form.Group controlId="formBasicCompany">
                  <Autocomplete
                    multiple
                    limitTags={3}
                    id="checkboxes-tags-demo"
                    options={registrationGroupList}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    value={registrationGroup}
                    onChange={(event, value) =>
                      handleRegistrationClick(event, value)
                    }
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Registration Groups"
                        fullWidth
                        name="registration_group"
                        required
                      />
                    )}
                  />
                </Form.Group>
              )}
              <Form.Group controlId="formBasicCompany">
                {documentListData.length > 0 && (
                  <Autocomplete
                    multiple
                    limitTags={3}
                    id="checkboxes-tags-demo"
                    options={documentListData}
                    disableCloseOnSelect
                    value={selectedDocument}
                    onChange={(event, value) =>
                      handleDocumentClick(event, value)
                    }
                    getOptionLabel={(option) => option.title}
                    groupBy={(option) => option.registration_group_id.title}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Choose Documents"
                        fullWidth
                        name="choose_document"
                        required
                      />
                    )}
                  />
                )}
              </Form.Group>
              <Row>
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

                        <div
                          className="file_name"
                          onClick={() => fileView("SLA")}
                        >
                          {selectedFile[0].name}
                        </div>
                        <small>
                          Click on "{selectedFile[0].name}" to check upload file
                          preview.
                        </small>
                      </div>
                    </div>
                  )}
                </Col>
                <Col md={6} lg={6}>
                  <Dropzone
                    onDrop={handleDropInvoice}
                    accept=".pdf"
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: "dropzone" })}>
                        <input {...getInputProps()} />
                        <p>
                          Upload Invoice File (You can only able to choose .PDF)
                        </p>
                        <small>Click to select file or Drag and Drop.</small>
                      </div>
                    )}
                  </Dropzone>
                  {selectedFileInvoice.length !== 0 && (
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
                            onClick={removeInvoiceFile}
                            className="nav-link-remove"
                          >
                            X
                          </span>
                        </div>
                        <div
                          className="file_name"
                          onClick={() => fileView("INVOICE")}
                        >
                          {selectedFileInvoice[0].name}
                        </div>
                        <small>
                          Click on "{selectedFileInvoice[0].name}" to check
                          upload file preview.
                        </small>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={2} sm={2}>
              <SubmitButton title={item._id ? "Update" : "Submit"} />
            </Col>
            <Col md={2} sm={2}>
              <BackButton onClick={() => goToPreviousPath()} />
            </Col>
          </Row>
        </Form>
      </MuiThemeProvider>
      {viewPdf && (
        <PDFView
          open={viewPdf}
          handleClose={handleClosePDFView}
          detail={pdfUrl}
        />
      )}
    </>
  );
};

export default FormModal;
