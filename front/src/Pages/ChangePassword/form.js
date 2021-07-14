import { makeStyles, TextField } from "@material-ui/core"
import React, { useState } from "react"
import { Col, Form, Row } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { updatePasswordData } from "../../actions/userActions"
import SubmitButton from "../../Component/Button"
import { MuiThemeProvider } from "@material-ui/core/styles"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import { formLabelsTheme } from "../../utils/helpers"

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
const Index = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.userInfo)

  const onSubmit = (data) => {
    dispatch(updatePasswordData(data))
  }
  const { register, errors, handleSubmit } = useForm()

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
    <div className="myaccount-edit-form">
      <strong className="form-title">Change Password</strong>
      <br />
      <br />

      <MuiThemeProvider theme={formLabelsTheme}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
          className="account-edit-form"
        >
          <Row>
            <Col md={12}>
              <Form.Group controlId="formBasicCurrentPassword">
                <TextField
                  id="outlined-current_password"
                  required
                  label="Current Password"
                  type={values.current_password ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  className={!errors.current_password ? classes.root : "w-100"}
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
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                      message:
                        "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
                    },
                  })}
                  helperText={
                    errors.current_password && errors.current_password.message
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
                  className={!errors.password ? classes.root : "w-100"}
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
                      message: "New password should not exceed 50 characters.",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!()@$%^&*-]).{6,}$/i,
                      message:
                        "New password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
                    },
                  })}
                  helperText={errors.password && errors.password.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={handleClickShowPasswordNew}>
                          {values.password ? <Visibility /> : <VisibilityOff />}
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
            </Col>
          </Row>
          <Form.Control
            type="hidden"
            name="id"
            defaultValue={user._id}
            ref={register({})}
          />
          <Row>
            <Col md={4} sm={12}>
              <SubmitButton title="Update" />
            </Col>
          </Row>
        </Form>
      </MuiThemeProvider>
    </div>
  )
}

export default Index
