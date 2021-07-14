import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import {
  formLabelsTheme,
  checkMobileNumber,
  checkSpace,
} from "../../utils/helpers";
import { useForm } from "react-hook-form";
import { Form, Row, Col } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DateRangeIcon from "@material-ui/icons/DateRange";
import InputAdornment from "@material-ui/core/InputAdornment";
import SubmitButton from "../../Component/Button";
import {
  createKeyPersonalData,
  updateKeyPersonalData,
} from "../../actions/keyPersonalActions";
import { useDispatch } from "react-redux";
import { loadToasterData } from "../../actions/baseActions";
import HelpIcon from "@material-ui/icons/Help";
import Definition from "./definition";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: keyItem,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [item] = useState(keyItem);
  const [date, setDate] = useState(keyItem.dob);
  const onSubmit = (data) => {
    if (date === null) {
      dispatch(
        loadToasterData({
          open: true,
          message: "Please select Date of Birth.",
          severity: "error",
        })
      );
      return false;
    }
    data.dob = date;
    data.type = type;
    if (data._id) {
      data.id = data._id;
      dispatch(updateKeyPersonalData(data, handleClose));
    } else {
      dispatch(createKeyPersonalData(data, handleClose));
    }
  };
  const handleClickDate = (date) => {
    setValue("dob", date);
    setDate(date);
  };
  useEffect(() => {
    if (item.dob) {
      setValue("dob", moment(new Date(item.dob)).format("YYYY-MM-DD"));
      setDate(moment(new Date(item.dob)).format("YYYY-MM-DD"));
    }
  }, [item, setValue]);
  const renderInputDate = (props) => (
    <TextField
      type="text"
      onClick={props.onClick}
      value={date}
      name="dob"
      id="outlined-formDate"
      label="DOB"
      className={!errors.dob ? classes.root : "w-100"}
      error={errors.dob ? true : false}
      helperText={"Age Should be more than 18 years"}
      required
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment>
            {date && (
              <IconButton onClick={() => setDate(item.dob)}>
                <HighlightOffIcon />
              </IconButton>
            )}
            <IconButton onClick={props.onClick}>
              <DateRangeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
  const handleDefinitionClose = () => {
    setOpenDialog(false);
  };
  const openDefinition = () => {
    setOpenDialog(true);
  };

  const [type, setType] = useState(item.type ? item.type : "PERSONNEL");
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const RadioButton = withStyles({
    root: {
      color: "#50663c",
      "&$checked": {
        color: "#50663c",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

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
          {item._id ? "Update Key Personnel" : "Create Key Personnel"}
          &nbsp;
          <IconButton aria-label="help" onClick={openDefinition}>
            <HelpIcon />
          </IconButton>
          <FormHelperText error={true}>
            Fields marked with * are mandatory.
          </FormHelperText>
        </DialogTitle>
        <DialogContent dividers>
          <MuiThemeProvider theme={formLabelsTheme}>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
            >
              <Row className="justify-content-center mx-auto">
                <Col md={6} lg={6}>
                  <Form.Group controlId="formBasicFirstName">
                    <TextField
                      required
                      id="outlined-first_name"
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      className={!errors.first_name ? classes.root : "w-100"}
                      error={errors.first_name ? true : false}
                      name="first_name"
                      inputRef={register({
                        required: "Please enter first name.",
                        minLength: {
                          value: 3,
                          message:
                            "First name should contain at least 3 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message:
                            "First name should not exceed 50 characters.",
                        },
                        pattern: {
                          value: /^[a-zA-Z]+$/i,
                          message:
                            "First name must contain only valid characters.",
                        },
                      })}
                      helperText={
                        errors.first_name && errors.first_name.message
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicMiddleName">
                    <TextField
                      id="outlined-middle-name"
                      label="Middle Name ( If Any )"
                      variant="outlined"
                      fullWidth
                      className={!errors.middle_name ? classes.root : "w-100"}
                      error={errors.middle_name ? true : false}
                      name="middle_name"
                      inputRef={register({
                        minLength: {
                          value: 3,
                          message:
                            "Last name should contain at least 3 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "last name should not exceed 50 characters.",
                        },
                        pattern: {
                          value: /^[a-zA-Z]+$/i,
                          message:
                            "Last name must contain only valid characters.",
                        },
                      })}
                      helperText={
                        errors.middle_name && errors.middle_name.message
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <TextField
                      id="outlined-last_name"
                      required
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      className={!errors.last_name ? classes.root : "w-100"}
                      error={errors.last_name ? true : false}
                      name="last_name"
                      inputRef={register({
                        required: "Please enter last name.",
                        minLength: {
                          value: 3,
                          message:
                            "Last name should contain at least 3 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "last name should not exceed 50 characters.",
                        },
                        pattern: {
                          value: /^[a-zA-Z]+$/i,
                          message:
                            "Last name must contain only valid characters.",
                        },
                      })}
                      helperText={errors.last_name && errors.last_name.message}
                    />
                  </Form.Group>
                  <Form.Group>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        autoOk
                        clearable={date ? true : false}
                        disableFuture
                        format="yyyy-MM-dd"
                        id="date-picker-inline"
                        className="w-100"
                        value={date}
                        maxDate={
                          new Date(
                            new Date().getFullYear() - 18,
                            new Date().getMonth(),
                            new Date().getDate()
                          )
                        }
                        onChange={(date) =>
                          handleClickDate(
                            date
                              ? moment(new Date(date)).format("YYYY-MM-DD")
                              : null
                          )
                        }
                        TextFieldComponent={renderInputDate}
                      />
                    </MuiPickersUtilsProvider>
                  </Form.Group>
                </Col>
                <Col md={6} lg={6}>
                  <Form.Group controlId="formBasicEmail">
                    <TextField
                      id="outlined-email"
                      required
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      className={!errors.email ? classes.root : "w-100"}
                      error={errors.email ? true : false}
                      name="email"
                      inputRef={register({
                        required: "Please enter email address.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address.",
                        },
                        maxLength: {
                          value: 50,
                          message: "Email should not exceed 50 characters.",
                        },
                      })}
                      helperText={errors.email && errors.email.message}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicNumber">
                    <TextField
                      id="outlined-number"
                      required
                      label="Number (123456789)"
                      variant="outlined"
                      fullWidth
                      className={!errors.mobile_number ? classes.root : "w-100"}
                      onKeyDown={(event) => checkMobileNumber(event)}
                      error={errors.mobile_number ? true : false}
                      name="mobile_number"
                      inputRef={register({
                        required: "Please enter mobile number.",
                        minLength: {
                          value: 7,
                          message:
                            "Mobile number should contain at least 7 digits.",
                        },
                        maxLength: {
                          value: 15,
                          message: "Mobile number should not exceed 15 digits.",
                        },
                        pattern: {
                          value: /^[0-9\b]+$/i,
                          message: "Mobile number format is invalid.",
                        },
                      })}
                      helperText={
                        errors.mobile_number && errors.mobile_number.message
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPositionHeld">
                    <TextField
                      id="outlined-positionHeld"
                      required
                      name="positionHeld"
                      label="Position Held"
                      variant="outlined"
                      fullWidth
                      className={!errors.positionHeld ? classes.root : "w-100"}
                      error={errors.positionHeld ? true : false}
                      inputRef={register({
                        required: "Please enter Position Held.",
                        minLength: {
                          value: 5,
                          message:
                            "Position Held should contain at least 5 characters.",
                        },
                        maxLength: {
                          value: 500,
                          message:
                            "Position Held should not exceed 500 characters.",
                        },
                        validate: {
                          isSpace: (value) =>
                            checkSpace(value) ||
                            "Remove trailing spaces from positionHeld.",
                        },
                      })}
                      helperText={
                        errors.positionHeld && errors.positionHeld.message
                      }
                    />
                  </Form.Group>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="type"
                      name="type"
                      value={type}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="PERSONNEL"
                        control={<RadioButton />}
                        label="Key Personnel"
                      />
                      <FormControlLabel
                        value="STAFF"
                        control={<RadioButton />}
                        label="Key Staff"
                      />
                    </RadioGroup>
                  </FormControl>
                </Col>
              </Row>
              <Form.Control type="hidden" name="_id" ref={register({})} />
              <Row className="mt-5">
                <Col md={2} sm={2} lg={6}>
                  <SubmitButton title={item._id ? "Update" : "Submit"} />
                </Col>
              </Row>
            </Form>
          </MuiThemeProvider>
        </DialogContent>
      </Dialog>
      {openDialog && (
        <Definition open={openDialog} handleClose={handleDefinitionClose} />
      )}
    </div>
  );
}
