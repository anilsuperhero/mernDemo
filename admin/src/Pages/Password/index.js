import React, { useEffect, useState } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { updatePasswordData } from "../../actions/userActions"
import Aux from "../../hoc/_Aux"
import { useForm } from "react-hook-form"
import Button from "../../Component/Button"
import Breadcrum from "../../Component/Breadcrum"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { formLabelsTheme } from "../../utils/helpers"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#50663c",
    },
    "& .Mui-focused": {
      color: "#50663c",
    },
  },
})

const Index = (props) => {
  const { title } = props
  const dispatch = useDispatch()
  const classes = useStyles()
  const { superUserInfo } = useSelector((state) => ({
    superUserInfo: state.superUserInfo,
  }))
  const { register, errors, handleSubmit } = useForm()

  useEffect(() => {
    document.title = title
  }, [title])

  const onSubmit = (data) => {
    dispatch(updatePasswordData(data))
  }

  const [values, setValues] = useState({
    current_password: false,
    password: false,
    password_confirmation: false,
  })

  const handleClickShowPassword = () => {
    setValues({ ...values, current_password: !values.current_password })
  }

  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password })
  }

  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    })
  }

  return (
    <>
      <Breadcrum title={title} />
      <Aux>
        <Row>
          <Col>
            <Row className="pt-3">
              <Col md={3}>
                <Card>
                  <div className="card-block">
                    <div className="text-center project-main">
                      <img
                        className="img-fluid rounded-circle"
                        src={superUserInfo.image}
                        alt="dashboard-user"
                      />
                      <h5 className="mt-4">
                        {superUserInfo.first_name.charAt(0).toUpperCase() +
                          superUserInfo.first_name.slice(1) +
                          " " +
                          superUserInfo.last_name.charAt(0).toUpperCase() +
                          superUserInfo.last_name.slice(1)}
                      </h5>
                      <span className="d-block">Last Login</span>
                      <span className="d-block">
                        {superUserInfo.last_login_at}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col md={9}>
                <Card>
                  <Card.Header>
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
                          defaultValue={superUserInfo._id}
                          name="id"
                          ref={register({})}
                        />

                        <Form.Group controlId="formBasicCurrentPassword">
                          <TextField
                            id="outlined-current_password"
                            required
                            label="Current Password"
                            type={values.current_password ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            className={
                              !errors.current_password ? classes.root : "w-100"
                            }
                            error={errors.current_password ? true : false}
                            name="current_password"
                            inputRef={register({
                              required: "Please enter current password.",
                              minLength: {
                                value: 6,
                                message:
                                  "Current Password should contain at least 6 characters.",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Current password should not exceed 50 characters.",
                              },
                              pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                                message:
                                  "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
                              },
                            })}
                            helperText={
                              errors.current_password &&
                              errors.current_password.message
                            }
                            autoFocus={true}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <IconButton onClick={handleClickShowPassword}>
                                    {values.current_password ? (
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

                        <Form.Group controlId="formBasicPassword">
                          <TextField
                            id="outlined-password"
                            required
                            label="New Password"
                            type={values.password ? "text" : "password"}
                            variant="outlined"
                            fullWidth
                            className={
                              !errors.password ? classes.root : "w-100"
                            }
                            error={errors.password ? true : false}
                            name="password"
                            inputRef={register({
                              required: "Please enter new password.",
                              minLength: {
                                value: 6,
                                message:
                                  "New password should contain at least 6 characters.",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "New password should not exceed 50 characters.",
                              },
                              pattern: {
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                                message:
                                  "New password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
                              },
                            })}
                            helperText={
                              errors.password && errors.password.message
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
                            label="Confirm New Password"
                            type={
                              values.password_confirmation ? "text" : "password"
                            }
                            variant="outlined"
                            fullWidth
                            className={
                              !errors.password_confirmation
                                ? classes.root
                                : "w-100"
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
                                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
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
                        <Row>
                          <Col md={2}>
                            <Button title={"Update"} />
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
  )
}

export default Index
