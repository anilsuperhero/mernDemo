import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword, resendOtpPassword } from "../../../actions/userActions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme } from "../../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../../Component/Button";
import Breadcrumb from "../../../Component/Breadcrumb";
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

const Index = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { push } = useHistory();
  const { userParams } = useSelector((state) => ({
    userParams: state.userParams,
  }));
  const { register, errors, handleSubmit } = useForm({
    defaultValues: userParams,
  });

  const onSubmit = (data) => {
    let params = data;
    params.email = userParams.email;
    dispatch(resetPassword(data, push));
  };
  const [values, setValues] = useState({
    password: false,
  });
  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    });
  };

  const resendOtpClick = (e) => {
    e.preventDefault();
    const data = {};
    data.email = userParams.email;
    dispatch(resendOtpPassword(data));
  };

  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password });
  };
  return (
    <>
      <Breadcrumb {...props} />
      <section className="login-page-contant green-bg">
        <Container>
          <div className="login-form">
            <MuiThemeProvider theme={formLabelsTheme}>
              <h1 className="black-text pb-3">UPDATE PASSWORD</h1>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Form.Group controlId="formBasicEmail">
                  <TextField
                    id="outlined-otp"
                    required
                    label="OTP"
                    variant="outlined"
                    type="tel"
                    autoFocus={true}
                    fullWidth
                    className={!errors.otp ? classes.root : "w-100"}
                    error={errors.otp ? true : false}
                    name="otp"
                    inputRef={register({
                      required: "Please enter OTP.",
                      minLength: {
                        value: 4,
                        message: "OTP should contain at least 4 digits.",
                      },
                      maxLength: {
                        value: 4,
                        message: "OTP should not exceed 4 digits.",
                      },
                      pattern: {
                        value: /^[0-9\b]+$/,
                        message: "Invalid OTP.",
                      },
                    })}
                    helperText={errors.otp && errors.otp.message}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicNewPassword">
                  <TextField
                    id="outlined-password"
                    required
                    label="New Password"
                    type={values.password ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    className={!errors.password ? classes.root : "w-100"}
                    error={errors.password ? true : false}
                    name="password"
                    inputRef={register({
                      required: "Please enter new password.",
                      minLength: {
                        value: 6,
                        message:
                          "Password should contain at least 6 characters.",
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
                <Form.Group controlId="formBasicConPassword">
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
                          "Confirm password should contain at least 6 characters.",
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
                <div className="text-right">
                  <div className="text-right">
                    <NavLink
                      exact
                      to="#!"
                      onClick={(e) => resendOtpClick(e)}
                      className="forgot dark-gray"
                    >
                      Resent OTP
                    </NavLink>
                  </div>
                </div>

                <div className="login_btn">
                  <Button
                    title={"Submit"}
                    className={"btn btn-primary shadow-2  mt-3  w-100"}
                  />
                  <div className="text-center">
                    <div className="text-center">
                      <NavLink exact to="/" className="forgot dark-gray">
                        Back To Login
                      </NavLink>
                    </div>
                  </div>
                </div>
              </Form>
            </MuiThemeProvider>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Index;
