import React, { useEffect } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSettingData,
  getSettingData,
} from "../../actions/settingActions";
import Aux from "../../hoc/_Aux";
import { useForm } from "react-hook-form";
import Button from "../../Component/Button";
import Breadcrum from "../../Component/Breadcrum";
import TextField from "@material-ui/core/TextField";
import CKEditor from "ckeditor4-react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  formLabelsTheme,
  checkSpace,
  checkMobileNumber,
} from "../../utils/helpers";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { setting } = useSelector((state) => ({
    setting: state.setting,
  }));
  const { register, errors, handleSubmit, setValue } = useForm();
  useEffect(() => {
    register("email_header");
    register("email_footer");
    register("definition");
    register("payment_terms");
    register("banck_information");
  });

  useEffect(() => {
    const fetchData = () => {
      dispatch(getSettingData());
    };
    fetchData();
    document.title = title;
    setValue("email_header", setting.email_header);
    setValue("email_footer", setting.email_footer);
    setValue("definition", setting.definition);
    setValue("payment_terms", setting.payment_terms);
    setValue("banck_information", setting.banck_information);
  }, [
    title,
    setting.email_header,
    setting.email_footer,
    setting.definition,
    setting.payment_terms,
    setting.banck_information,
    dispatch,
    setValue,
  ]);

  const onSubmit = (data) => {
    dispatch(updateSettingData(data));
  };

  return (
    <>
      <Breadcrum title={title} />
      <Aux>
        <Row className="pt-3">
          <Col>
            {setting._id && (
              <MuiThemeProvider theme={formLabelsTheme}>
                <Form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  autoComplete="off"
                >
                  <Card>
                    <Card.Header>
                      <h4>General</h4>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Control
                            type="hidden"
                            defaultValue={setting._id}
                            name="id"
                            ref={register({})}
                          />
                          <Form.Group controlId="formBasicFirstName">
                            <TextField
                              id="outlined-name"
                              required
                              label="Platform Name"
                              defaultValue={setting.name}
                              variant="outlined"
                              autoFocus={true}
                              fullWidth
                              className={!errors.name ? classes.root : "w-100"}
                              error={errors.name ? true : false}
                              name="name"
                              inputRef={register({
                                required: "Please enter platform name.",
                                minLength: {
                                  value: 3,
                                  message:
                                    "Platform name should contain at least 3 characters.",
                                },
                                maxLength: {
                                  value: 100,
                                  message:
                                    "Platform name should not exceed 100 characters.",
                                },
                                validate: {
                                  isSpace: (value) =>
                                    checkSpace(value) ||
                                    "Remove trailing spaces from platform name.",
                                },
                              })}
                              helperText={errors.name && errors.name.message}
                            />
                          </Form.Group>
                          <Form.Group controlId="formBasicSortName">
                            <TextField
                              id="outlined-name"
                              required
                              label="Platform Short Name"
                              defaultValue={setting.sort_name}
                              variant="outlined"
                              fullWidth
                              className={
                                !errors.sort_name ? classes.root : "w-100"
                              }
                              error={errors.sort_name ? true : false}
                              name="sort_name"
                              inputRef={register({
                                required: "Please enter platform sort name.",
                                minLength: {
                                  value: 3,
                                  message:
                                    "Platform sort name should contain at least 3 characters.",
                                },
                                maxLength: {
                                  value: 100,
                                  message:
                                    "Platform sort name should not exceed 100 characters.",
                                },
                                validate: {
                                  isSpace: (value) =>
                                    checkSpace(value) ||
                                    "Remove trailing spaces from platform name.",
                                },
                              })}
                              helperText={errors.name && errors.name.message}
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
                              defaultValue={setting.email}
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
                          <Form.Group controlId="formBasicEmail">
                            <TextField
                              id="outlined-support_email"
                              required
                              label="Support Email"
                              variant="outlined"
                              fullWidth
                              className={
                                !errors.support_email ? classes.root : "w-100"
                              }
                              defaultValue={setting.support_email}
                              error={errors.support_email ? true : false}
                              name="support_email"
                              inputRef={register({
                                required: "Please enter support email address.",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address.",
                                },
                                maxLength: {
                                  value: 50,
                                  message:
                                    "Support email should not exceed 50 characters.",
                                },
                                validate: {
                                  isSpace: (value) =>
                                    checkSpace(value) ||
                                    "Remove trailing spaces from support email.",
                                },
                              })}
                              helperText={
                                errors.support_email &&
                                errors.support_email.message
                              }
                            />
                          </Form.Group>
                          <Form.Group controlId="formBasicNumber">
                            <TextField
                              id="outlined-number"
                              required
                              label="Number (123456789)"
                              variant="outlined"
                              onKeyDown={(event) => checkMobileNumber(event)}
                              fullWidth
                              className={
                                !errors.number ? classes.root : "w-100"
                              }
                              defaultValue={setting.number}
                              error={errors.number ? true : false}
                              name="number"
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
                                errors.number && errors.number.message
                              }
                            />
                          </Form.Group>
                          <Form.Group controlId="formBasicAddress">
                            <TextField
                              id="outlined-address"
                              required
                              label="Address"
                              defaultValue={setting.address}
                              variant="outlined"
                              fullWidth
                              className={
                                !errors.address ? classes.root : "w-100"
                              }
                              error={errors.address ? true : false}
                              name="address"
                              multiline={true}
                              inputRef={register({
                                required: "Please enter address.",
                                minLength: {
                                  value: 10,
                                  message:
                                    "Address should contain at least 10 characters.",
                                },
                                maxLength: {
                                  value: 500,
                                  message:
                                    "Address should not exceed 500 characters.",
                                },
                                validate: {
                                  isSpace: (value) =>
                                    checkSpace(value) ||
                                    "Remove trailing spaces from address.",
                                },
                              })}
                              helperText={
                                errors.address && errors.address.message
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formBasicCopyright">
                            <TextField
                              as="textarea"
                              id="outlined-copy_right"
                              required
                              label="Copyright"
                              defaultValue={setting.copy_right}
                              variant="outlined"
                              fullWidth
                              className={
                                !errors.copy_right ? classes.root : "w-100"
                              }
                              error={errors.copy_right ? true : false}
                              name="copy_right"
                              multiline={true}
                              inputRef={register({
                                required: "Please enter copyright.",
                                minLength: {
                                  value: 3,
                                  message:
                                    "Copyright should contain at least 3 characters.",
                                },
                                maxLength: {
                                  value: 500,
                                  message:
                                    "Copyright should not exceed 500 characters.",
                                },
                                validate: {
                                  isSpace: (value) =>
                                    checkSpace(value) ||
                                    "Remove trailing spaces from copyright.",
                                },
                              })}
                              helperText={
                                errors.copy_right && errors.copy_right.message
                              }
                            />
                          </Form.Group>
                          <Form.Group controlId="formBasicKeyPersonnel">
                            <InputLabel>Definition of Key Personnel</InputLabel>
                            <CKEditor
                              data={setting.definition}
                              config={{
                                allowedContent: true,
                                height: 250,
                              }}
                              onChange={(evt) =>
                                setValue("definition", evt.editor.getData())
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <h4>Email Templates</h4>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="formBasicCopyright">
                            <InputLabel required={true}>Header</InputLabel>
                            <CKEditor
                              data={setting.email_header}
                              config={{
                                allowedContent: true,
                                height: 150,
                              }}
                              onChange={(evt) =>
                                setValue("email_header", evt.editor.getData())
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formBasicCopyright">
                            <InputLabel required={true}>Footer</InputLabel>
                            <CKEditor
                              data={setting.email_footer}
                              config={{
                                allowedContent: true,
                                height: 150,
                              }}
                              onChange={(evt) =>
                                setValue("email_footer", evt.editor.getData())
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Header>
                      <h4>Payment</h4>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <Form.Group controlId="formBasicCopyright">
                            <InputLabel>Banck Information</InputLabel>
                            <CKEditor
                              data={setting.banck_information}
                              config={{
                                allowedContent: true,
                                height: 250,
                              }}
                              onChange={(evt) =>
                                setValue(
                                  "banck_information",
                                  evt.editor.getData()
                                )
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group controlId="formBasicCopyright">
                            <InputLabel>
                              Payment Terms and Conditions
                            </InputLabel>
                            <CKEditor
                              data={setting.payment_terms}
                              config={{
                                allowedContent: true,
                                height: 250,
                              }}
                              onChange={(evt) =>
                                setValue("payment_terms", evt.editor.getData())
                              }
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={2}>
                          <Button title={"Update"} />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Form>
              </MuiThemeProvider>
            )}
          </Col>
        </Row>
      </Aux>
    </>
  );
};

export default Index;
