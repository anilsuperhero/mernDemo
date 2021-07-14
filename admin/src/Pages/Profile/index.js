import React, { useEffect, useState } from "react"
import { Row, Col, Card, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { updateProfileData } from "../../actions/userActions"
import Aux from "../../hoc/_Aux"
import { useForm } from "react-hook-form"
import Button from "../../Component/Button"
import Breadcrum from "../../Component/Breadcrum"
import TextField from "@material-ui/core/TextField"
import { MuiThemeProvider } from "@material-ui/core/styles"
import {
  formLabelsTheme,
  checkSpace,
  setToaster,
  checkMobileNumber,
  ValidateAlpha,
} from "../../utils/helpers"
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
  const { register, errors, handleSubmit } = useForm({
    defaultValues: superUserInfo,
  })
  const [selectedFile, setSelectedFile] = useState("")

  useEffect(() => {
    document.title = title
  }, [title])

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("first_name", data.first_name)
    formData.append("last_name", data.last_name)
    formData.append("email", data.email)
    formData.append("mobile_number", data.mobile_number)
    if (selectedFile.name) {
      formData.append("image", selectedFile, selectedFile.name)
    }
    dispatch(updateProfileData(formData))
  }

  const onChangePicture = (e) => {
    const imageFile = e.target.files[0]
    var size = parseFloat(imageFile.size / (1024 * 1024)).toFixed(2)
    if (size > 2) {
      setToaster("Please select image size less than 2 MB.", "#f44236")
      return false
    }
    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      setToaster("Please select valid image.", "#f44236")
      return false
    }
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setSelectedFile(selectedFile)
    }
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
                          name="id"
                          ref={register({})}
                        />
                        <Form.Group controlId="formBasicFirstName">
                          <TextField
                            id="outlined-first_name"
                            required
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            onKeyDown={(event) => ValidateAlpha(event)}
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
                            })}
                            helperText={
                              errors.first_name && errors.first_name.message
                            }
                            autoFocus={true}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicLastName">
                          <TextField
                            id="outlined-last_name"
                            required
                            label="Last Name"
                            variant="outlined"
                            onKeyDown={(event) => ValidateAlpha(event)}
                            fullWidth
                            className={
                              !errors.last_name ? classes.root : "w-100"
                            }
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
                            })}
                            helperText={
                              errors.last_name && errors.last_name.message
                            }
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                          <TextField
                            id="outlined-email"
                            required
                            label="Email Address"
                            variant="outlined"
                            fullWidth
                            className={!errors.email ? classes.root : "w-100"}
                            error={errors.email ? true : false}
                            name="email"
                            inputRef={register({
                              required: "Please enter email address.",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address.",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Email should not exceed 50 characters.",
                              },
                              validate: {
                                isSpace: (value) =>
                                  checkSpace(value) ||
                                  "Remove trailing spaces from email.",
                              },
                            })}
                            helperText={errors.email && errors.email.message}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicNumber">
                          <TextField
                            id="outlined-number"
                            required
                            label="Number (123456789)"
                            variant="outlined"
                            fullWidth
                            onKeyDown={(event) => checkMobileNumber(event)}
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
                            })}
                            helperText={
                              errors.mobile_number &&
                              errors.mobile_number.message
                            }
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicNumber">
                          <Form.Label>
                            Profile Image(.jpg, .jpeg, .png)
                          </Form.Label>
                          <div className="profile_pic">
                            <div className="change_profile_pic">
                              <input
                                type="file"
                                accept=".png, .jpeg, .jpg"
                                onChange={onChangePicture}
                              />
                            </div>
                          </div>
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
