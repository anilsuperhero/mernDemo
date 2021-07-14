import React from "react";
import { submitContactRequest } from "../../actions/homePageActions";
import { useDispatch } from "react-redux";
import { Container, Form } from "react-bootstrap";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Iframe from "react-iframe";
import { formLabelsTheme, checkSpace } from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../../Component/Button";
import Breadcrumb from "../../Component/Breadcrumb";
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
  const { register, errors, handleSubmit } = useForm();
  const classes = useStyles();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(submitContactRequest(data));
  };

  return (
    <>
      <Breadcrumb {...props} />
      <section className="page-title green-bg">
        <Container>
          <div className="page-title-contant">
            <h2>Contact us</h2>
          </div>
        </Container>
      </section>
      <section className="main-contant-wrapper">
        <Container>
          <div className="page-contant">
            <div className="contact-page">
              <div className="contact-form">
                <MuiThemeProvider theme={formLabelsTheme}>
                  <h3>Leave Us a Message</h3>
                  <Form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    autoComplete="off"
                    className="dontctformgrp"
                  >
                    <div className="formgrpouter">
                      <Form.Group controlId="formBasicFirstName">
                        <TextField
                          required
                          id="outlined-first_name"
                          label="First Name"
                          variant="outlined"
                          fullWidth
                          className={
                            !errors.first_name ? classes.root : "w-100"
                          }
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
                          autoFocus={true}
                        />
                      </Form.Group>
                    </div>
                    <div className="formgrpouter">
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
                              message:
                                "last name should not exceed 50 characters.",
                            },
                            pattern: {
                              value: /^[a-zA-Z]+$/i,
                              message:
                                "Last name must contain only valid characters.",
                            },
                          })}
                          helperText={
                            errors.last_name && errors.last_name.message
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className="formgrpouter">
                      <Form.Group controlId="formBasicNumber">
                        <TextField
                          id="outlined-number"
                          required
                          label="Number (123456789)"
                          variant="outlined"
                          fullWidth
                          className={
                            !errors.mobile_number ? classes.root : "w-100"
                          }
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
                              message:
                                "Mobile number should not exceed 15 digits.",
                            },
                            pattern: {
                              value: /^[0-9\b]+$/i,
                              message: "Mobile number format is invalid.",
                            },
                            validate: {
                              isSpace: (value) =>
                                checkSpace(value) ||
                                "Remove trailing spaces from mobile number.",
                            },
                          })}
                          helperText={
                            errors.mobile_number && errors.mobile_number.message
                          }
                        />
                      </Form.Group>
                    </div>
                    <div className="formgrpouter">
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
                      />
                    </div>
                    <div className="formgrpouter textareafull">
                      <Form.Group controlId="formBasicMessage">
                        <TextField
                          id="outlined-message"
                          multiline
                          rows={4}
                          required
                          label="Your Message"
                          variant="outlined"
                          fullWidth
                          className={!errors.message ? classes.root : "w-100"}
                          error={errors.message ? true : false}
                          name="message"
                          inputRef={register({
                            required: "Please enter message.",
                            minLength: {
                              value: 10,
                              message:
                                "Message should contain at least 10 characters.",
                            },
                            validate: {
                              isSpace: (value) =>
                                checkSpace(value) ||
                                "Remove trailing spaces from message.",
                            },
                          })}
                          helperText={errors.message && errors.message.message}
                        />
                      </Form.Group>
                    </div>
                    <Button title={"Send"} className={"login-btn green-bg"} />
                  </Form>
                </MuiThemeProvider>
              </div>

              <div className="map-outer">
                <Iframe
                  url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.102814893646!2d77.15731141508111!3d28.566675182443838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMjjCsDM0JzAwLjAiTiA3N8KwMDknMzQuMiJF!5e0!3m2!1sen!2sin!4v1612437698495!5m2!1sen!2sin"
                  width="100%"
                  height="650px"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Index;
