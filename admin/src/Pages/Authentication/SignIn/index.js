import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Button from "../../../Component/Button"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import { userLoginData } from "../../../actions/userActions"
import TextField from "@material-ui/core/TextField"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import logo from "../../../assets/images/logo.svg"
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
  const dispatch = useDispatch()
  const classes = useStyles()
  const { title } = props
  const { superUserParams } = useSelector((state) => ({
    superUserParams: state.superUserParams,
  }))
  const { register, errors, handleSubmit } = useForm({
    defaultValues: superUserParams,
  })
  const onSubmit = (data) => {
    let params = data
    params.role_id = 1
    dispatch(userLoginData(params))
  }
  const [values, setValues] = useState({
    password: false,
  })
  const handleClickShowPassword = () => {
    setValues({ ...values, password: !values.password })
  }
  useEffect(() => {
    document.title = title
  }, [title])
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
                  <div className="input-group mb-3 w-100">
                    <TextField
                      required
                      id="outlined-email"
                      label="Email Address"
                      variant="outlined"
                      autoFocus={true}
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
                  <div className="input-group mb-4">
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
                        required: "Please enter password.",
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
                  </div>
                  <div className="form-group text-left">
                    <div className="checkbox checkbox-fill d-inline">
                      <input
                        type="checkbox"
                        label="Remember me"
                        name="remember_me"
                        ref={register}
                        id="checkbox-fill-a1"
                      />
                      <label htmlFor="checkbox-fill-a1" className="cr">
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="w-100">
                    <Button title={"Submit"} />
                  </div>
                  <div className="pt-2">
                    <span className="redHint">
                      Fields marked with * are mandatory.
                    </span>
                  </div>
                  <br />
                  <p className="mb-2 text-muted">
                    Forgot password?&nbsp;
                    <NavLink to="/forgot-password">
                      Click here to reset.
                    </NavLink>
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
