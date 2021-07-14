import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form } from "react-bootstrap";
import { updatePasswordData } from "../../actions/auditorActions";
import Aux from "../../hoc/_Aux";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
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

const Index = (props) => {
  const { title } = props;
  const { requestParams } = useSelector((state) => ({
    requestParams: state.requestParams,
  }));
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm({
    defaultValues: requestParams,
  });
  const classes = useStyles();
  useEffect(() => {
    document.title = title;
  }, [title]);

  const onSubmit = (data) => {
    dispatch(updatePasswordData(data, goToPreviousPath));
  };

  const [values, setValues] = useState({
    password: false,
    password_confirmation: false,
  });

  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password });
  };

  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    });
  };

  return (
    <>
      <Aux>
        <Row>
          <Col>
            <Row>
              <Col md={3}>
                <Card>
                  <div className="card-block">
                    <div className="text-center project-main">
                      <img
                        className="img-fluid rounded-circle"
                        src={requestParams.image}
                        alt="dashboard-user"
                      />
                      <h5 className="mt-4">
                        {requestParams.first_name}&nbsp;
                        {requestParams.last_name}
                      </h5>
                      {requestParams.last_login_at && (
                        <>
                          <span className="d-block">Last Login</span>
                          <span className="d-block">
                            {requestParams.last_login_at}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col md={9}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">{title}</Card.Title>
                    <br />
                    <br />
                    <span className="redHint">
                      Fields marked with * are mandatory.
                    </span>
                  </Card.Header>
                  <Card.Body>
                    <MuiThemeProvider theme={formLabelsTheme}>
                      <Form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete="off"
                      >
                        <Form.Control
                          type="hidden"
                          name="id"
                          defaultValue={requestParams._id}
                          ref={register({})}
                        />
                        <Row>
                          <Col md={6}>
                            <Form.Group controlId="formBasicPassword">
                              <TextField
                                id="outlined-password"
                                required
                                label="Password"
                                type={values.password ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                className={
                                  !errors.password ? classes.root : "w-100"
                                }
                                error={errors.password ? true : false}
                                name="password"
                                autoFocus={true}
                                inputRef={register({
                                  required: true,
                                  minLength: 6,
                                  pattern: {
                                    value:
                                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                                  },
                                })}
                                helperText={
                                  errors.password &&
                                  errors.password.type === "required"
                                    ? "Please enter your password"
                                    : errors.password &&
                                      errors.password.type === "minLength"
                                    ? "Your password should contain at least 6 characters"
                                    : errors.password &&
                                      errors.password.type === "pattern" &&
                                      "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character."
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment>
                                      <IconButton
                                        onClick={handleClickShowPasswordNew}
                                      >
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

                            <Form.Group controlId="formBasicConfirmation">
                              <TextField
                                id="outlined-password_confirmation"
                                required
                                label="Confirm Password"
                                type={
                                  values.password_confirmation
                                    ? "text"
                                    : "password"
                                }
                                variant="outlined"
                                fullWidth
                                className={
                                  !errors.password_confirmation
                                    ? classes.root
                                    : "w-100"
                                }
                                error={
                                  errors.password_confirmation ? true : false
                                }
                                name="password_confirmation"
                                inputRef={register({
                                  required: true,
                                  minLength: 6,
                                  pattern: {
                                    value:
                                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                                  },
                                })}
                                helperText={
                                  errors.password_confirmation &&
                                  errors.password_confirmation.type ===
                                    "required"
                                    ? "Please enter your password confirmation"
                                    : errors.password_confirmation &&
                                      errors.password_confirmation.type ===
                                        "minLength"
                                    ? "Your password confirmation should contain at least 6 characters"
                                    : errors.password_confirmation &&
                                      errors.password_confirmation.type ===
                                        "pattern" &&
                                      "Confirm Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character."
                                }
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment>
                                      <IconButton
                                        onClick={handleClickShowPasswordCon}
                                      >
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
                          </Col>
                        </Row>

                        <Row>
                          <Col md={2} sm={2}>
                            <SubmitButton title="Update" />
                          </Col>
                          <Col md={2} sm={2}>
                            <BackButton onClick={() => goToPreviousPath()} />
                          </Col>
                        </Row>
                      </Form>
                    </MuiThemeProvider>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Aux>
    </>
  );
};

export default Index;
