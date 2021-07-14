import { makeStyles, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { updateProfileData } from "../../actions/userActions";
import SubmitButton from "../../Component/Button";
import { MuiThemeProvider } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import config from "../../config";
import { loadToasterData } from "../../actions/baseActions";
import {
  ValidateAlpha,
  formLabelsTheme,
  checkNumber,
  checkSpace,
  checkMobileNumber,
} from "../../utils/helpers";

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userInfo);
  const [state, setState] = useState("SA");
  const [selectedFile, setSelectedFile] = useState("");

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("abn_number", data.abn_number);
    formData.append("address", data.address);
    formData.append("id", data.id);
    formData.append("address_line", data.address_line);
    formData.append("city", data.city);
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("mobile_number", data.mobile_number);
    formData.append("postcode", data.postcode);
    if (selectedFile.name) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    dispatch(updateProfileData(formData, push));
  };
  const { register, errors, handleSubmit } = useForm({
    defaultValues: user,
  });

  const onChangePicture = (e) => {
    const imageFile = e.target.files[0];
    var size = parseFloat(imageFile.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      dispatch(
        loadToasterData({
          open: true,
          message: "Please select image size less than 2 MB.",
          severity: "error",
        })
      );
      return false;
    }
    if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
      dispatch(
        loadToasterData({
          open: true,
          message: "lease select valid image.",
          severity: "error",
        })
      );

      return false;
    }
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setSelectedFile(selectedFile);
    }
  };

  const handleSChange = (event) => {
    setState(event.target.value);
  };

  useEffect(() => {
    setState(user.state);
  }, [user]);

  return (
    <div className="myaccount-edit-form">
      <strong className="form-title">Update Profile</strong>
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
            <Col md={6}>
              <Form.Group controlId="formBasicFirstName">
                <TextField
                  id="outlined-first_name"
                  required
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(event) => ValidateAlpha(event)}
                  className={!errors.first_name ? classes.root : "w-100"}
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
                      message: "First name should not exceed 50 characters.",
                    },
                  })}
                  helperText={errors.first_name && errors.first_name.message}
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
                      message: "last name should not exceed 50 characters.",
                    },
                  })}
                  helperText={errors.last_name && errors.last_name.message}
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
                  className={!errors.mobile_number ? classes.root : "w-100"}
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
                      message: "Mobile number should not exceed 15 digits.",
                    },
                  })}
                  helperText={
                    errors.mobile_number && errors.mobile_number.message
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicABNNumber">
                <TextField
                  required
                  id="outlined-abn_number"
                  label="ABN Number"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(event) => checkNumber(event)}
                  className={!errors.abn_number ? classes.root : "w-100"}
                  error={errors.abn_number ? true : false}
                  InputProps={{
                    readOnly: true,
                  }}
                  name="abn_number"
                  inputRef={register({
                    required: "Please enter ABN Number.",
                    minLength: {
                      value: 11,
                      message: "ABN number should contain at least 11 digits.",
                    },
                    maxLength: {
                      value: 11,
                      message: "ABN number should not exceed 11 digits.",
                    },
                  })}
                  helperText={errors.abn_number && errors.abn_number.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicNumber">
                <Form.Label>Profile Image(.jpg, .jpeg, .png)</Form.Label>
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
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicAddress">
                <TextField
                  id="outlined-address"
                  required
                  label="Address Line 1"
                  variant="outlined"
                  fullWidth
                  className={!errors.address ? classes.root : "w-100"}
                  error={errors.address ? true : false}
                  name="address"
                  inputRef={register({
                    required: "Please enter address.",
                    minLength: {
                      value: 5,
                      message: "Address should contain at least 5 characters.",
                    },
                    maxLength: {
                      value: 500,
                      message: "Address should not exceed 500 characters.",
                    },
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from address.",
                    },
                  })}
                  helperText={errors.address && errors.address.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicAddressLine">
                <TextField
                  id="outlined-addressLine"
                  label="Address Line 2"
                  variant="outlined"
                  fullWidth
                  className={!errors.address_line ? classes.root : "w-100"}
                  error={errors.address_line ? true : false}
                  name="address_line"
                  inputRef={register({
                    maxLength: {
                      value: 500,
                      message: "Address should not exceed 500 characters.",
                    },
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from address.",
                    },
                  })}
                  helperText={
                    errors.address_line && errors.address_line.message
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicCity">
                <TextField
                  id="outlined-city"
                  required
                  label="City"
                  onKeyDown={(event) => ValidateAlpha(event)}
                  variant="outlined"
                  fullWidth
                  className={!errors.city ? classes.root : "w-100"}
                  error={errors.city ? true : false}
                  name="city"
                  inputRef={register({
                    required: "Please enter city.",
                    minLength: {
                      value: 5,
                      message: "City should contain at least 5 characters.",
                    },
                    maxLength: {
                      value: 10,
                      message: "city should not exceed 10 characters.",
                    },
                  })}
                  helperText={errors.city && errors.city.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicState">
                <FormControl variant="outlined" className="w-100">
                  <InputLabel id="demo-simple-select-outlined-label" required>
                    State
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    className="w-100"
                    value={state}
                    onChange={handleSChange}
                  >
                    {config.STATE.map((item, key) => (
                      <MenuItem value={item.id} key={key}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Form.Group>
              <Form.Group controlId="formBasicPostcode">
                <TextField
                  id="outlined-postcode"
                  required
                  label="Postal code"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(event) => checkNumber(event)}
                  className={!errors.postcode ? classes.root : "w-100"}
                  error={errors.postcode ? true : false}
                  name="postcode"
                  inputRef={register({
                    required: "Please enter Postal code.",
                    minLength: {
                      value: 4,
                      message: "Postal code should contain at least 4 digits.",
                    },
                    maxLength: {
                      value: 4,
                      message: "Postal code should not exceed 4 digits.",
                    },
                  })}
                  helperText={errors.postcode && errors.postcode.message}
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
  );
};

export default Index;
