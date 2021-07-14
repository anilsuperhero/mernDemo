import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { submitPageData, createPageData } from "../../actions/pageActions";
import { useDispatch } from "react-redux";
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
  const { item } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const { register, errors, handleSubmit, setValue } = useForm();
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const onSubmit = (data) => {
    if (item._id) {
      dispatch(submitPageData(data, goToPreviousPath));
    } else {
      dispatch(createPageData(data, goToPreviousPath));
    }
  };
  useEffect(() => {
    register("content");
    setValue("content", item.content);
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
              label="Title"
              defaultValue={item.title}
              variant="outlined"
              autoFocus={true}
              fullWidth
              className={!errors.title ? classes.root : "w-100"}
              error={errors.title ? true : false}
              name="title"
              inputRef={register({
                required: "Please enter title.",
                minLength: {
                  value: 3,
                  message: "Title should contain at least 3 characters.",
                },
                maxLength: {
                  value: 50,
                  message: "Title should not exceed 50 characters.",
                },
                validate: {
                  isSpace: (value) =>
                    checkSpace(value) || "Remove trailing spaces from title.",
                },
              })}
              helperText={errors.title && errors.title.message}
            />
          </Form.Group>
          <Form.Group controlId="formBasiccontent">
            <InputLabel required={true}>Description</InputLabel>
            <CKEditor
              required
              data={item.content}
              config={{
                allowedContent: true,
                height: 250,
              }}
              onChange={(evt) => setValue("content", evt.editor.getData())}
            />
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
