import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateRangeIcon from "@material-ui/icons/DateRange";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import moment from "moment";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Row, Col, Card, Form } from "react-bootstrap";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useLocation } from "react-router-dom";
import { checkSpace } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import { loadToasterData } from "../../actions/baseActions";
import { useDispatch } from "react-redux";
import HelpIcon from "@material-ui/icons/Help";
const queryString = require("query-string");

const Search = (prop) => {
  const { date, show, title, status, back, keyPerson, openDefinition } = prop;
  const [keyword, setKeyword] = useState("");
  const [fromDate, handleFromDateChange] = useState(null);
  const [toDate, handleToDateChange] = useState(null);
  const [itemStatus, handleStatushange] = useState("");
  const location = useLocation();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const handleClickFilter = () => {
    setKeyword("");
    handleFromDateChange(null);
    handleToDateChange(null);
    prop.onClick();
  };
  const onSubmit = () => {
    const params = {};
    if (keyword) {
      params.keyword = keyword;
    }
    if (fromDate) {
      params.from = fromDate;
    }
    if (toDate) {
      params.to = toDate;
    }
    if (itemStatus) {
      params.status = itemStatus;
    }
    var size = Object.keys(params).length;
    if (size === 0) {
      dispatch(
        loadToasterData({
          open: true,
          message: "Please select any search criteria to search the records.",
          severity: "error",
        })
      );
    }
    prop.onSearch(params);
  };

  const handleClickDate = (date, type) => {
    if (type === "from") {
      handleFromDateChange(date);
    } else if (type === "to") {
      handleToDateChange(date);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    if (params.get("sort")) {
    }
    if (params.get("keyword")) {
      var keyword = queryStringParsed["keyword"];
      setKeyword(keyword);
    }
    if (params.get("from")) {
      var from = queryStringParsed["from"];
      handleFromDateChange(from);
    }
    if (params.get("to")) {
      var to = queryStringParsed["to"];
      handleToDateChange(to);
      handleStatushange(true);
    }
    if (params.get("status")) {
      var status = queryStringParsed["status"];
      handleStatushange(status);
    } else {
      handleStatushange("");
    }
  }, [location]);

  const handleClickAdd = () => {
    const item = {};
    prop.handleFormClick(item);
  };

  const renderInputFromDate = (props) => (
    <TextField
      type="text"
      onClick={props.onClick}
      value={props.value}
      className="w-100"
      id="outlined-formDate"
      label="From"
      variant="outlined"
      size={"small"}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            {fromDate && (
              <IconButton onClick={() => handleFromDateChange(null)}>
                <HighlightOffIcon />
              </IconButton>
            )}
            <IconButton onClick={props.onClick}>
              <DateRangeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
  const renderInputToDate = (props) => (
    <TextField
      type="text"
      onClick={props.onClick}
      value={props.value}
      onChange={props.onChange}
      className="w-100"
      id="outlined-Todate"
      label="To"
      variant="outlined"
      size={"small"}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            {toDate && (
              <IconButton onClick={() => handleToDateChange(null)}>
                <HighlightOffIcon />
              </IconButton>
            )}
            <IconButton onClick={props.onClick}>
              <DateRangeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  const handleChange = (event) => {
    const val = event.target.value;
    handleStatushange(val);
  };

  const handleClickBack = () => {
    prop.handleBackButtonClick();
  };

  return (
    <Col>
      <Card>
        <Card.Header>
          <Card.Title>
            {/* <div className="float-left">Search</div> */}
            {back && (
              <div className="float-right">
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleClickBack}
                  startIcon={<ArrowBackIcon fontSize="large" />}
                >
                  Back
                </Button>
              </div>
            )}
            {show && (
              <div className="float-right pr-3">
                <Button
                  variant="contained"
                  onClick={handleClickAdd}
                  startIcon={<AddCircleIcon fontSize="large" />}
                >
                  Add New
                </Button>
              </div>
            )}
            {keyPerson && (
              <div className="float-right pr-3">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={openDefinition}
                  startIcon={<HelpIcon fontSize="large" />}
                >
                  Definition of key Personnel
                </Button>
              </div>
            )}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Row className="dashboard_row_change">
              <Col md={5} className="mb-2">
                <TextField
                  className="w-100"
                  id="outlined-basic"
                  label={title ? title : "Search by Title"}
                  value={keyword}
                  name="keyword"
                  error={errors.keyword ? true : false}
                  variant="outlined"
                  onChange={(event) => setKeyword(event.target.value)}
                  size={"small"}
                  inputRef={register({
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from keyword.",
                    },
                  })}
                  helperText={errors.keyword && errors.keyword.message}
                />
              </Col>
              {status && (
                <Col md={5} className="mb-2">
                  <Select
                    native
                    value={itemStatus}
                    label="Status"
                    className="w-100 searchOption"
                    inputProps={{
                      name: "status",
                      id: "outlined-age-native-simple",
                    }}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                    size={"small"}
                  >
                    <option aria-label="None" value="">
                      All
                    </option>
                    <option value={1}>Published</option>
                    <option value={0}>Unpublished</option>
                  </Select>
                </Col>
              )}
            </Row>
            <Row className="dashboard_row_change">
              {date && (
                <Col md={5} className="mb-2">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      autoOk
                      clearable={fromDate ? true : false}
                      disableFuture
                      format="yyyy-MM-dd"
                      id="date-picker-inline"
                      className="w-100"
                      value={fromDate}
                      size={"small"}
                      onChange={(date) =>
                        handleClickDate(
                          date
                            ? moment(new Date(date)).format("YYYY-MM-DD")
                            : null,
                          "from"
                        )
                      }
                      TextFieldComponent={renderInputFromDate}
                    />
                  </MuiPickersUtilsProvider>
                </Col>
              )}
              {date && (
                <Col md={5} className="mb-2">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      autoOk
                      clearable={toDate ? true : false}
                      disableFuture
                      format="yyyy-MM-dd"
                      id="date-picker-inline"
                      className="w-100"
                      label="To (Registered At)"
                      value={toDate}
                      size={"small"}
                      onChange={(date) =>
                        handleClickDate(
                          date
                            ? moment(new Date(date)).format("YYYY-MM-DD")
                            : null,
                          "to"
                        )
                      }
                      TextFieldComponent={renderInputToDate}
                    />
                  </MuiPickersUtilsProvider>
                </Col>
              )}
            </Row>
            <div className="mt-3">
              <Button
                variant="contained"
                color="default"
                className="mr-3"
                type="submit"
                startIcon={<SearchIcon />}
              >
                Search
              </Button>

              <Button
                variant="contained"
                color="secondary"
                startIcon={<RefreshIcon />}
                onClick={() => handleClickFilter()}
              >
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Search;
