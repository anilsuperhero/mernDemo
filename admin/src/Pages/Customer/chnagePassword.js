import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as customerActions from "../../actions/customerActions";
import Aux from "../../hoc/_Aux";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import Breadcrum from "../../Component/Breadcrum";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Index = (props) => {
  const { title, requestParams, actions, status } = props;
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const { register, errors, handleSubmit } = useForm({
    defaultValues: requestParams,
  });

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (status) {
      history.push(`/users/customer`);
    }
  }, [status, history]);

  const onSubmit = (data) => {
    actions.updatePasswordData(data);
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
      <Breadcrum title={title} />
      <Aux>
        <Row>
          <Col>
            <Card></Card>
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
                        {requestParams.first_name.charAt(0).toUpperCase() +
                          requestParams.first_name.slice(1) +
                          " " +
                          requestParams.last_name.charAt(0).toUpperCase() +
                          requestParams.last_name.slice(1)}
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
                  <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Control
                        type="hidden"
                        name="id"
                        ref={register({})}
                      />

                      <Form.Group controlId="formBasicPassword">
                        <TextField
                          id="outlined-password"
                          label="Password*"
                          type={values.password ? "text" : "password"}
                          variant="outlined"
                          className="w-100"
                          error={errors.password ? true : false}
                          name="password"
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
                              ? "Your password should contain atleast 6 characters"
                              : errors.password &&
                                errors.password.type === "pattern" &&
                                " Your password should contain at-least 1 Uppercase,1 Lowercase, 1 Numeric and 1 special character"
                          }
                          size={"small"}
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
                          label="Confirm Password*"
                          type={
                            values.password_confirmation ? "text" : "password"
                          }
                          variant="outlined"
                          className="w-100"
                          error={errors.password_confirmation ? true : false}
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
                            errors.password_confirmation.type === "required"
                              ? "Please enter your password confirmation"
                              : errors.password_confirmation &&
                                errors.password_confirmation.type ===
                                  "minLength"
                              ? "Your password confirmation should contain atleast 6 characters"
                              : errors.password_confirmation &&
                                errors.password_confirmation.type ===
                                  "pattern" &&
                                " Your password confirmation should contain at-least 1 Uppercase,1 Lowercase, 1 Numeric and 1 special character"
                          }
                          size={"small"}
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

                      <SubmitButton
                        title={"Update"}
                        className={"btn btn-primary shadow-2 mb-4 w-30"}
                      />
                      <Button
                        variant="danger"
                        className="mb-4 shadow-2 w-30"
                        onClick={() => goToPreviousPath()}
                      >
                        Back
                      </Button>
                    </Form>
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

function mapStateToProps(state) {
  return {
    status: state.status,
    requestParams: state.requestParams,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(customerActions), dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
