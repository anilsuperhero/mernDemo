import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { submitFaqData, createFaqData } from "../../actions/faqActions";
import { useForm } from "react-hook-form";
import CKEditor from "ckeditor4-react";
import SubmitButton from "../../Component/Button";
import BackButton from "../../Component/BackButton";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
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
  const dispatch = useDispatch();
  const classes = useStyles();
  const { item } = props;
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const { register, errors, handleSubmit, setValue } = useForm();
  const onSubmit = (data) => {
    if (item._id) {
      dispatch(submitFaqData(data, goToPreviousPath));
    } else {
      dispatch(createFaqData(data, goToPreviousPath));
    }
  };

  useEffect(() => {
    register("description");
    setValue("description", item.description);
  });

  return (
    <>
      <MuiThemeProvider theme={formLabelsTheme}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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
              label="Question"
              defaultValue={item.title}
              variant="outlined"
              autoFocus={true}
              fullWidth
              className={!errors.title ? classes.root : "w-100"}
              error={errors.title ? true : false}
              name="title"
              inputRef={register({
                required: "Please enter question.",
                minLength: {
                  value: 3,
                  message: "Question should contain at least 3 characters.",
                },
                maxLength: {
                  value: 1000,
                  message: "Question should not exceed 1000 characters.",
                },
                validate: {
                  isSpace: (value) =>
                    checkSpace(value) ||
                    "Remove trailing spaces from question.",
                },
              })}
              helperText={errors.title && errors.title.message}
            />
          </Form.Group>
          <Form.Group controlId="formBasicdescription">
            <InputLabel required={true}>Answer</InputLabel>
            <CKEditor
              data={item.description}
              config={{
                allowedContent: true,
                height: 250,
              }}
              onChange={(evt) => setValue("description", evt.editor.getData())}
            />
            {errors.description && errors.description.type === "required" && (
              <label className="invalid-feedback text-left">
                Please enter your description
              </label>
            )}
          </Form.Group>
          <Row>
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
