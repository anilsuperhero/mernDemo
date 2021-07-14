import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  submitRegistrationgroupData,
  createRegistrationgroupData,
} from "../../actions/registrationGroupActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import BackButton from "../../Component/BackButton";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme, checkSpace } from "../../utils/helpers";

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
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (item._id) {
      dispatch(submitRegistrationgroupData(data, goToPreviousPath));
    } else {
      dispatch(createRegistrationgroupData(data, goToPreviousPath));
    }
  };

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
                  value: 1000,
                  message: "Title should not exceed 1000 characters.",
                },
                validate: {
                  isSpace: (value) =>
                    checkSpace(value) || "Remove trailing spaces from title.",
                },
              })}
              helperText={errors.title && errors.title.message}
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
