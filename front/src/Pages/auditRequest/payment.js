import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CurrencyFormat from "react-currency-format";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "./paymentForm";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles, MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { formLabelsTheme, checkSpace } from "../../utils/helpers";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import {
  submitPayment,
  submitPaymentTransfer,
} from "../../actions/auditRequestActions";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const { REACT_APP_CURRENCY, REACT_APP_STRIPE_KEY } = process.env;
const stripePromise = loadStripe(REACT_APP_STRIPE_KEY);
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

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

export default function View(props) {
  const handleClose = () => {
    props.handleClose({});
  };
  const { open, keyItem } = props;
  const [item] = useState(keyItem);
  const [type, setType] = useState("ONLINE");
  const { setting } = useSelector((state) => ({
    setting: state.setting,
  }));
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" };
    }
    return { __html: "" };
  };
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const RadioButton = withStyles({
    root: {
      color: "#50663c",
      "&$checked": {
        color: "#50663c",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = (data) => {
    setLoading(true);
    data.id = item._id;
    data.type = type;
    if (item.type === "Certification") {
      data.amount = item.advance_payment;
    } else {
      data.amount = item.amount;
    }
    dispatch(submitPaymentTransfer(data, setLoading, history));
  };

  const onSubmitStripe = (token, showLoading) => {
    showLoading(true);
    const request = {};
    request.id = item._id;
    request.token = token;
    request.type = type;
    if (item.type === "Certification") {
      request.amount = item.advance_payment;
    } else {
      request.amount = item.amount;
    }
    dispatch(submitPayment(request, showLoading, history));
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Payment for {item.type} Audit (#{item.audit_number})
          <FormHelperText error={true}>{item.title}</FormHelperText>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <div className="file-outer">
              <div className="amount">
                <h5>Amount</h5>
                <span className="amount-value">
                  <CurrencyFormat
                    value={item.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={REACT_APP_CURRENCY}
                  />
                </span>
              </div>
              {item.type === "Certification" && (
                <div className="remark-advance">
                  <div className="remark">
                    <strong>Advance Payment</strong>
                    <CurrencyFormat
                      value={item.advance_payment}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={REACT_APP_CURRENCY}
                    />
                  </div>

                  <div className="advance">
                    <strong>Final Payment</strong>
                    <CurrencyFormat
                      value={item.final_payment}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={REACT_APP_CURRENCY}
                    />
                  </div>
                </div>
              )}
            </div>
            <Grid item xs={12} md={12}>
              {type === "BANKTRANSFER" && (
                <div className="file-outer">
                  <div className="remarkonly">
                    <strong>Bank Details:</strong>
                    <div
                      dangerouslySetInnerHTML={prepareHtml(
                        setting.banck_information
                      )}
                    ></div>
                  </div>
                </div>
              )}
              <div className="file-outer">
                <div className="nots">
                  <strong>Payment Terms and Conditions:</strong>
                  <div
                    dangerouslySetInnerHTML={prepareHtml(setting.payment_terms)}
                  ></div>
                </div>
              </div>
              <div className="card-detail-outer">
                <form className="payoption">
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="quiz"
                      name="PAYMENT"
                      value={type}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="ONLINE"
                        control={<RadioButton />}
                        label="Online"
                      />
                      <FormControlLabel
                        value="BANKTRANSFER"
                        control={<RadioButton />}
                        label="Bank Transfer"
                      />
                    </RadioGroup>
                  </FormControl>
                </form>
                {type === "ONLINE" ? (
                  <Elements stripe={stripePromise}>
                    <CardForm setToken={onSubmitStripe} />
                  </Elements>
                ) : (
                  <MuiThemeProvider theme={formLabelsTheme}>
                    <Form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      autoComplete="off"
                    >
                      <Form.Group controlId="formBasicRemarks">
                        <TextField
                          as="textarea"
                          id="outlined-remarks"
                          label="Transaction details"
                          variant="outlined"
                          fullWidth
                          className={!errors.remarks ? classes.root : "w-100"}
                          error={errors.remarks ? true : false}
                          name="remarks"
                          multiline
                          inputRef={register({
                            required: "Please enter transaction details.",
                            maxLength: {
                              value: 500,
                              message:
                                "Transaction details should not exceed 500 characters.",
                            },
                            validate: {
                              isSpace: (value) =>
                                checkSpace(value) ||
                                "Remove trailing spaces from transaction details.",
                            },
                          })}
                          helperText={errors.remarks && errors.remarks.message}
                        />
                      </Form.Group>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        fullWidth
                        type="submit"
                        endIcon={<Icon>Pay</Icon>}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <CircularProgress color="inherit" size={30} />
                          </>
                        ) : (
                          <>Pay</>
                        )}
                      </Button>
                    </Form>
                  </MuiThemeProvider>
                )}
              </div>
              <div></div>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
