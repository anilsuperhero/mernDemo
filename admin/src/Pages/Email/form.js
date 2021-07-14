import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { submitEmailData, createEmailData } from "../../actions/emailActions";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import CKEditor from "ckeditor4-react";
import SubmitButton from "../../Component/Button";
import BackButton from "../../Component/BackButton";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme, checkSpace } from "../../utils/helpers";
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

const FormModal = (props) => {
  const GreenCheckbox = withStyles({
    root: {
      color: "#50663c",
      "&$checked": {
        color: "#50663c",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { item } = props;
  const [state, setState] = useState({
    globalHeader: item.globalHeader,
    globalFooter: item.globalFooter,
  });
  const { register, errors, handleSubmit, setValue } = useForm();
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const dispatch = useDispatch();
  const classes = useStyles();

  const onSubmit = (data) => {
    data.globalHeader = state.globalHeader;
    data.globalFooter = state.globalFooter;
    if (item._id) {
      dispatch(submitEmailData(data, goToPreviousPath));
    } else {
      dispatch(createEmailData(data, goToPreviousPath));
    }
  };

  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" };
    }
    return { __html: "" };
  };

  useEffect(() => {
    register("description");
    register("keyword");
    setValue("description", item.description);
  });

  return (
    <>
      <MuiThemeProvider theme={formLabelsTheme}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Row>
            <Col md={6}>
              <Form.Control
                type="hidden"
                name="id"
                defaultValue={item._id}
                ref={register({})}
              />
              <Form.Group controlId="formBasicTitle">
                <TextField
                  id="outlined-basic"
                  required
                  label="Title"
                  defaultValue={item.title}
                  variant="outlined"
                  fullWidth
                  className={!errors.title ? classes.root : "w-100"}
                  error={errors.title ? true : false}
                  name="title"
                  inputProps={{
                    readOnly: item.title ? true : false,
                  }}
                  inputRef={register({
                    required: "Please enter title.",
                    minLength: {
                      value: 3,
                      message: "Title should contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 150,
                      message: "Title should not exceed 150 characters.",
                    },
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from title.",
                    },
                  })}
                  helperText={errors.title && errors.title.message}
                  autoFocus={true}
                />
              </Form.Group>
              <Form.Group controlId="formBasicSubject">
                <TextField
                  id="outlined-subject"
                  required
                  label="Subject"
                  defaultValue={item.subject}
                  variant="outlined"
                  fullWidth
                  className={!errors.subject ? classes.root : "w-100"}
                  error={errors.subject ? true : false}
                  name="subject"
                  inputRef={register({
                    required: "Please enter subject.",
                    minLength: {
                      value: 3,
                      message: "Subject should contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 150,
                      message: "Subject should not exceed 150 characters.",
                    },
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from subject.",
                    },
                  })}
                  helperText={errors.subject && errors.subject.message}
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      value="true"
                      inputRef={register({})}
                      checked={state.globalHeader}
                      onChange={handleChange}
                      name="globalHeader"
                    />
                  }
                  label="Use Global Header"
                />
                <FormControlLabel
                  control={
                    <GreenCheckbox
                      value="true"
                      inputRef={register({})}
                      checked={state.globalFooter}
                      onChange={handleChange}
                      name="globalFooter"
                    />
                  }
                  label="Use Global Footer"
                />
              </Form.Group>
              <Form.Group controlId="formBasicdescription">
                <InputLabel required={true}>Description</InputLabel>
                <CKEditor
                  data={item.description}
                  config={{
                    allowedContent: true,
                    height: 350,
                  }}
                  onChange={(evt) =>
                    setValue("description", evt.editor.getData())
                  }
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {item._id ? (
                <Form.Group controlId="formBasickeyword">
                  <Form.Label>keyword</Form.Label>
                  <div
                    className="page_content table-responsive"
                    dangerouslySetInnerHTML={prepareHtml(item.keyword)}
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="formBasickeyword">
                  <Form.Label>keyword*</Form.Label>
                  <CKEditor
                    data={item.keyword}
                    config={{
                      allowedContent: true,
                      height: 150,
                    }}
                    onChange={(evt) =>
                      setValue("keyword", evt.editor.getData())
                    }
                  />
                  {errors.keyword && errors.keyword.type === "required" && (
                    <label className="invalid-feedback text-left">
                      Please enter your keyword.
                    </label>
                  )}
                </Form.Group>
              )}
            </Col>

            <Col md={2} sm={2}>
              <SubmitButton title={item._id ? "Update" : "Submit"} />
            </Col>
            <Col md={2} sm={2}>
              <BackButton onClick={() => goToPreviousPath()} />
            </Col>
          </Row>
        </Form>
      </MuiThemeProvider>
    </>
  );
};

export default FormModal;
