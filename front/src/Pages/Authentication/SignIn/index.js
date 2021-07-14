import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userLoginData } from "../../../actions/userActions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
    dispatch(userLoginData(data, push));
  };
  const [values, setValues] = useState({
    password: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, password: !values.password });
  };
  return (
    <>
      <Breadcrumb {...props} />
      <section className="login-page-contant green-bg">
        <Container>
          <div className="login-form">
            <MuiThemeProvider theme={formLabelsTheme}>
              <h1 className="black-text pb-3">LOG IN</h1>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <Form.Group controlId="formBasicEmail">
                  <TextField
                    required
                    variant="outlined"
                    id="outlined-email"
                    label="Email Address"
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
                        message:
                          "Email address should not exceed 15 characters.",
                      },
                    })}
                    helperText={errors.email && errors.email.message}
                    autoFocus={true}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
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
                      required: "Please enter your password.",
                    })}
                    helperText={errors.password && errors.password.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={handleClickShowPassword}>
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
                <div className="d-flex justify-content-between align-items-center">
                  <div className="checkbox_login d-flex">
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="remember_me"
                          checked={userParams.remember_me}
                          inputRef={register({})}
                        />
                      }
                      label="Remember me"
                    />
                  </div>
                  <div>
                    <NavLink
                      exact
                      to="/forgot-password"
                      className="forgot dark-gray"
                    >
                      Forget Password?
                    </NavLink>
                  </div>
                </div>
                <div className="login_btn">
                  <Button
                    title={"Submit"}
                    className={"btn btn-primary shadow-2  mt-3  w-100"}
                  />
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
