import React, { useMemo, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import Icon from "@material-ui/core/Icon";
import useResponsiveFontSize from "./useResponsiveFontSize";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { loadToasterData } from "../../actions/baseActions";
import { useDispatch, useSelector } from "react-redux";

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#9e2146",
        },
      },
    }),
    [fontSize]
  );

  return options;
};

const CardForm = (prop) => {
  const { setToken } = prop;
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: user.company_name,
        email: user.email,
      },
    });

    if (error) {
      setLoading(false);
      dispatch(
        loadToasterData({
          open: true,
          message: error.message,
          severity: "error",
        })
      );
    } else {
      setLoading(false);
      setToken(paymentMethod.id, setLoading);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement options={options} />
      </label>

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
    </form>
  );
};

export default CardForm;
