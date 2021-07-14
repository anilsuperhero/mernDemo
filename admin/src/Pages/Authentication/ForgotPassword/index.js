import React, { useEffect } from "react"
import { NavLink, useHistory } from "react-router-dom"
import Button from "../../../Component/Button"
import { useForm } from "react-hook-form"
import { forgotPasswordEmail } from "../../../actions/userActions"
import logo from "../../../assets/images/logo.svg"
import TextField from "@material-ui/core/TextField"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { formLabelsTheme } from "../../../utils/helpers"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
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
    let params = data
    dispatch(forgotPasswordEmail(params, push))
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
            <MuiThemeProvider theme={formLabelsTheme}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
              >
                <div className="card-body text-center">
                  <div className="mb-5">
                    <img src={logo} alt="logo" />
                  </div>
                  <div className="input-group mb-3">
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
                  <Button title={"Submit"} />
                  <div className="pt-2">
                    <span className="redHint">
                      Fields marked with * are mandatory.
                    </span>
                  </div>
                  <br />
                  <p className="mb-2 text-muted">
                    Already have an account?{" "}
                    <NavLink to="/">Click here to login.</NavLink>
                  </p>
                </div>
              </form>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
