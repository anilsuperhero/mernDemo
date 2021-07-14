import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  submitauditorData,
  createauditorData,
} from "../../actions/auditorActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  formLabelsTheme,
  checkSpace,
  setToaster,
  checkMobileNumber,
  ValidateAlpha,
} from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import BackButton from "../../Component/BackButton";
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

const FormModal = (props) => {
  const { item } = props;
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState("");
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("first_name", data.first_name);
    formData.append("id", data.id);
    formData.append("last_name", data.last_name);
    formData.append("mobile_number", data.mobile_number);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    if (selectedFile.name) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    if (item._id) {
      dispatch(submitauditorData(formData, goToPreviousPath));
    } else {
      dispatch(createauditorData(formData, goToPreviousPath));
    }
  };

  const [values, setValues] = useState({
    password: false,
  });

  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password });
  };

  const onChangePicture = (e) => {
    const imageFile = e.target.files[0];
    var size = parseFloat(imageFile.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setToaster("Please select image size less than 2 MB.", "#f44236");
      return false;
    }
    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      setToaster("Please select valid image.", "#f44236");
      return false;
    }
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setSelectedFile(selectedFile);
    }
  };

  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    });
  };

  return (
    <>
      <MuiThemeProvider theme={formLabelsTheme}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicFirstName">
                <TextField
                  required
                  id="outlined-first_name"
                  defaultValue={item.first_name}
                  onKeyDown={(event) => ValidateAlpha(event)}
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
                      message: "First name should not exceed 50 characters.",
                    },
                  })}
                  autoFocus={true}
                  helperText={errors.first_name && errors.first_name.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <TextField
                  id="outlined-last_name"
                  required
                  defaultValue={item.last_name}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(event) => ValidateAlpha(event)}
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
                  })}
                  helperText={errors.last_name && errors.last_name.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <TextField
                  id="outlined-email"
                  required
                  label="Email Address"
                  variant="outlined"
                  defaultValue={item.email}
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
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from email.",
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
                  onKeyDown={(event) => checkMobileNumber(event)}
                  defaultValue={item.mobile_number}
                  className={!errors.mobile_number ? classes.root : "w-100"}
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
                  })}
                  helperText={
                    errors.mobile_number && errors.mobile_number.message
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicNumber">
                <Form.Label>Profile Image(.jpg, .jpeg, .png)</Form.Label>
                <div className="profile_pic">
                  <div className="change_profile_pic">
                    <input
                      type="file"
                      accept=".png, .jpeg, .jpg"
                      onChange={onChangePicture}
                    />
                  </div>
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              {!item._id && (
                <Form.Group controlId="formBasicPassword">
                  <TextField
                    id="outlined-password"
                    required
                    label="Password"
                    type={values.password ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    className={!errors.password ? classes.root : "w-100"}
                    error={errors.password ? true : false}
                    name="password"
                    inputRef={register({
                      required: "Please enter your password",
                      minLength: {
                        value: 6,
                        message:
                          "Password should contain at least 6 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Password should not exceed 50 characters.",
                      },
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                        message:
                          "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
                      },
                    })}
                    helperText={errors.password && errors.password.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={handleClickShowPasswordNew}>
                            {values.password ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              )}
              {!item._id && (
                <Form.Group controlId="formBasicConfirmation">
                  <TextField
                    id="outlined-password_confirmation"
                    required
                    label="Confirm New Password"
                    type={values.password_confirmation ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    className={
                      !errors.password_confirmation ? classes.root : "w-100"
                    }
                    error={errors.password_confirmation ? true : false}
                    name="password_confirmation"
                    inputRef={register({
                      required: "Please enter confirm new password.",
                      minLength: {
                        value: 6,
                        message:
                          "Confirm password should contain at least 6 characters long.",
                      },
                      maxLength: {
                        value: 50,
                        message:
                          "confirm password should not exceed 50 characters.",
                      },
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                        message:
                          "Confirm Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
                      },
                    })}
                    helperText={
                      errors.password_confirmation &&
                      errors.password_confirmation.message
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={handleClickShowPasswordCon}>
                            {values.password_confirmation ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Form.Group>
              )}
            </Col>
          </Row>
          <Form.Control
            type="hidden"
            name="id"
            defaultValue={item._id}
            ref={register({})}
          />
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
    </>
  );
};

export default FormModal;
