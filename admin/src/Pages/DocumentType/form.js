import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  submitDocumentTypeData,
  createDocumentTypeData,
} from "../../actions/documentTypeActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import BackButton from "../../Component/BackButton";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme, checkSpace } from "../../utils/helpers";
import CKEditor from "ckeditor4-react";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";

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
  const [type, setType] = useState("Company");
  const { item } = props;
  const history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const { register, errors, handleSubmit, setValue } = useForm();
  const { documentParams } = useSelector((state) => ({
    documentParams: state.documentParams,
  }));

  const onSubmit = (data) => {
    const param = data;
    param.type = type;
    param.extension = personName;
    param.registration_group_id = documentParams._id;
    if (param.id) {
      dispatch(submitDocumentTypeData(param, goToPreviousPath));
    } else {
      dispatch(createDocumentTypeData(param, goToPreviousPath));
    }
  };

  useEffect(() => {
    register("description");
    if (item._id) {
      setValue("description", item.description);
      setPersonName(item.extension);
      setType(item.type);
    }
  }, [item, register, setValue]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleChangeExtension = (event) => {
    const val = event.target.value;
    setPersonName(val);
  };

  const names = [
    ".pdf",
    ".jpg",
    ".jpeg",
    ".png",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const [personName, setPersonName] = useState([
    ".pdf",
    ".jpg",
    ".doc",
    ".docx",
  ]);

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
          <Row>
            <Col md={6}>
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
                        checkSpace(value) ||
                        "Remove trailing spaces from title.",
                    },
                  })}
                  helperText={errors.title && errors.title.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicDescription">
                <InputLabel>Description</InputLabel>
                <CKEditor
                  data={item.description}
                  config={{
                    allowedContent: true,
                    height: 250,
                  }}
                  onChange={(evt) =>
                    setValue("description", evt.editor.getData())
                  }
                />
                {errors.description &&
                  errors.description.type === "required" && (
                    <label className="invalid-feedback text-left">
                      Please enter your description
                    </label>
                  )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formBasicDescription">
                <InputLabel required={true}>Type</InputLabel>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Company"
                      control={<Radio />}
                      label="Company"
                    />
                    <FormControlLabel
                      value="Staff"
                      control={<Radio />}
                      label="Staff"
                    />
                  </RadioGroup>
                </FormControl>
              </Form.Group>
              <Form.Group controlId="formBasicDescription">
                <InputLabel required={true}>Document Type</InputLabel>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="type"
                    name="type"
                    value={type}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Single"
                      control={<Radio />}
                      label="Single"
                    />
                    <FormControlLabel
                      value="Multiple"
                      control={<Radio />}
                      label="Multiple"
                    />
                  </RadioGroup>
                </FormControl>
              </Form.Group>
              <FormControl className="w-100">
                <InputLabel required={true}>Extension</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  variant="outlined"
                  value={personName}
                  onChange={handleChangeExtension}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}&nbsp;
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Col>
          </Row>

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
