import React from "react";
import { Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { forgotPassword } from "../../../actions/userActions";
import TextField from "@material-ui/core/TextField";
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
  const { push } = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { userParams } = useSelector((state) => ({
    userParams: state.userParams,
  }));
  const { register, errors, handleSubmit } = useForm({
    defaultValues: userParams,
  });

  const onSubmit = (data) => {
    dispatch(forgotPassword(data, push));
  };

  return (
    <>
      <Breadcrumb {...props} />
      <section className="login-page-contant green-bg">
        <Container>
          <div className="login-form">
            <MuiThemeProvider theme={formLabelsTheme}>
              <h1 className="black-text pb-3">FORGOT PASSWORD</h1>
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

                <div className="login_btn">
                  <Button
                    title={"Submit"}
                    className={"btn btn-primary shadow-2  mt-3  w-100"}
                  />
                  <div className="text-center">
                    <div className="text-center">
                      Already have an account ?
                      <NavLink exact to="/" className="forgot dark-gray">
                        &nbsp;Sign in
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
