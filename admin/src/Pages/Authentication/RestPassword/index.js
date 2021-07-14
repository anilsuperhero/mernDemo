import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Button from "../../../Component/Button"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import {
  updatePasswordWithOTP,
  resendOTPEmail,
} from "../../../actions/userActions"
import logo from "../../../assets/images/logo.svg"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { useHistory } from "react-router-dom"
import Link from "@material-ui/core/Link"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { formLabelsTheme } from "../../../utils/helpers"
import { makeStyles } from "@material-ui/core/styles"
import Alert from "../../../Component/Alert"
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
  const { superUserParams } = useSelector((state) => ({
    superUserParams: state.superUserParams,
  }))
  const classes = useStyles()
  const { push } = useHistory()
  const { register, errors, handleSubmit } = useForm({
    defaultValues: superUserParams,
  })
  useEffect(() => {
    document.title = title
  }, [title])

  const onSubmit = (data) => {
    dispatch(updatePasswordWithOTP(data, push))
  }
  const [values, setValues] = useState({
    password: false,
    password_confirmation: false,
  })
  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password })
  }
  const handleClickResendOTP = (e) => {
    e.preventDefault()
    const params = {}
    params.email = superUserParams.email
    dispatch(resendOTPEmail(params))
  }
  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    })
  }
  return (
    <>
      <Alert />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <div className="card">
            <div className="card-body text-center">
              <div className="mb-5">
                <img src={logo} alt="logo" />
              </div>
              <MuiThemeProvider theme={formLabelsTheme}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  autoComplete="off"
                >
                  <div className="input-group mb-4">
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
                  </div>
                  <div className="input-group mb-4">
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
                  </div>
                  <div className="input-group mb-4">
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
                  </div>
                  <Button title={"Submit"} />
                  <div className="pt-2">
                    <span className="redHint">
                      Fields marked with * are mandatory.
                    </span>
                  </div>
                  <br />
                  <Link href="#" onClick={(e) => handleClickResendOTP(e)}>
                    Resend OTP
                  </Link>
                  <p className="mb-2 text-muted">
                    <br />
                    <NavLink to="/">Back To Login</NavLink>
                  </p>
                </form>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
