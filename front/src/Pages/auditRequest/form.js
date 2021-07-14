import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme, checkMobileNumber } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import SubmitButton from "../../Component/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { useSelector, useDispatch } from "react-redux";
import { createRequestData } from "../../actions/auditRequestActions";
import { loadToasterData } from "../../actions/baseActions";
import View from "./agreeTerm";
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

export default function CustomizedDialogs(props) {
  const handleClose = () => {
    props.handleClose();
  };
  const { open, keyItem } = props;
  const [auditType, setAuditType] = useState("VERIFICATION");
  const [agree, setAgree] = useState(false);
  const [registGroup, setRegistrationGroup] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm({
    defaultValues: keyItem,
  });
  const arr = [];
  const { setting, registrationGroup } = useSelector((state) => ({
    setting: state.setting,
    registrationGroup: state.registrationGroup,
  }));

  const [item] = useState(keyItem);
  const onSubmit = (data) => {
    if (registGroup.length === 0) {
      dispatch(
        loadToasterData({
          open: true,
          message: "Please select any one registration group.",
          severity: "error",
        })
      );
      return false;
    }
    data.agree = true;
    data.registration_group = registGroup;
    data.type = auditType;
    dispatch(createRequestData(data, handleClose));
  };

  const handleRadioChange = (event) => {
    setAuditType(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setAgree(event.target.checked);
  };

  const handleRegistrationChange = (event, val) => {
    if (event.target.checked) {
      const found = registGroup.some((el) => el._id === val._id);
      if (!found) {
        arr.push(val);
        setRegistrationGroup((registGroup) => [...registGroup, val]);
      }
    } else {
      setRegistrationGroup(registGroup.filter((item) => item._id !== val._id));
    }
  };

  const agreeTerm = (event) => {
    event.preventDefault();
    setOpenDialogView(true);
  };
  const handleCloseView = () => {
    setOpenDialogView(false);
  };
  const [openDialogView, setOpenDialogView] = useState(false);
  const label = (
    <span>
      I agree all&nbsp;
      <a href="#!" onClick={agreeTerm}>
        Terms and Conditions
      </a>
      &nbsp;of {setting.name}.
    </span>
  );

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {item._id ? "Create Audit Request" : "Create Audit Request"}
        </DialogTitle>
        <DialogContent dividers>
          <MuiThemeProvider theme={formLabelsTheme}>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Row className="justify-content-center mx-auto">
                <Col md={6} lg={5}>
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
                          message:
                            "Title should contain at least 3 characters.",
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
                      className={
                        !errors.size_of_company ? classes.root : "w-100"
                      }
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
                          message:
                            "Size of Company should not exceed 5 digits.",
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
                      className={
                        !errors.number_of_clients ? classes.root : "w-100"
                      }
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
                        errors.number_of_clients &&
                        errors.number_of_clients.message
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasic_type_request">
                    <FormLabel component="legend">Type of Audit</FormLabel>
                    <RadioGroup
                      aria-label="quiz"
                      name="quiz"
                      value={auditType}
                      onChange={handleRadioChange}
                    >
                      <FormControlLabel
                        value="VERIFICATION"
                        control={<Radio />}
                        label="Verification"
                      />
                      <FormControlLabel
                        value="CERTIFICATION"
                        control={<Radio />}
                        label="Certification"
                      />
                    </RadioGroup>
                  </Form.Group>
                  <Form.Group controlId="formBasic">
                    <FormControlLabel
                      control={
                        <Checkbox
                          required
                          checked={agree}
                          onChange={handleCheckboxChange}
                          name="agree"
                          color="primary"
                          inputRef={register({
                            required: "Please agree all Terms and Conditions.",
                          })}
                        />
                      }
                      label={label}
                    />
                    {errors.agree && (
                      <FormHelperText error={errors.agree ? true : false}>
                        {errors.agree.message}
                      </FormHelperText>
                    )}
                  </Form.Group>
                </Col>
                <Col md={6} lg={7}>
                  <h5>Registration Groups </h5>
                  <div className="multiselect-group">
                    <ul>
                      {registrationGroup &&
                        registrationGroup.map((item, key) => (
                          <li key={key}>
                            <input
                              type="checkbox"
                              value={item._id}
                              onChange={(e) =>
                                handleRegistrationChange(e, item)
                              }
                            />
                            <label>{item.title}</label>
                          </li>
                        ))}
                    </ul>
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md={2} sm={2} lg={2}>
                  <SubmitButton title={item._id ? "Update" : "Submit"} />
                </Col>
              </Row>
            </Form>
          </MuiThemeProvider>
        </DialogContent>
      </Dialog>
      {openDialogView && (
        <View
          open={openDialogView}
          handleClose={handleCloseView}
          keyItem={item}
        />
      )}
    </div>
  );
}
