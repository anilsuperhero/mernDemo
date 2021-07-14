import { notice, check, toast } from "react-interaction";
import { createTheme } from "@material-ui/core/styles";
import Moment from "moment";
var ucfirst = require("ucfirst");
export const formLabelsTheme = createTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: "#f00",
        "&$error": {
          color: "#f00",
        },
      },
    },
  },
});
export const setToaster = (value, color = "#0fab32") => {
  toast(value, {
    time: 5000,
    style: {
      borderRadius: 5,
      backgroundColor: color,
      color: "#fff",
    },
  });
};

export const checkConform = async (callback, message) => {
  try {
    const isConfirmed = await check(message, {
      okStyle: {
        backgroundColor: "#50663c",
        color: "#fff",
      },
      contentClassName: "account-logout",
      contentStyle: {
        width: 600,
      },
      okText: "Yes",
      cancelClassName: "my-check-cancel",
      cancelStyle: {
        backgroundColor: "#87c846",
        color: "#fff",
      },
      cancelText: "No",
    });

    if (isConfirmed) {
      callback();
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const showToaster = (value) => {
  notice(value, {
    time: 4000,
    okStyle: {
      backgroundColor: "#0e81e4",
      fontSize: 18,
      color: "#fff",
    },
    okText: "Cancel",
  });
};

export const renderTitle = (title) => {
  if (!title) {
    return "";
  } else {
    var str = title;
    var n = str.length;
    if (n === 0) {
      return "";
    } else {
      var res = str.slice(0, 30);
      var dot = "";
      if (n > 30) {
        dot = "...";
      }
      return res + dot;
    }
  }
};

export const catchError = (response) => {
  if (response instanceof Error) {
    throw new Error(response.response.data.message);
  }
};

export const toUcFirst = function (str) {
  return ucfirst(str);
};

export const checkSpace = function (aa) {
  if (aa.startsWith(" ") || aa.endsWith(" ")) {
    return false;
  } else {
    return true;
  }
};
export const date = function (date) {
  return Moment(date).format("DD-MM-YYYY");
};

export const removeSpaceFromStart = (e) => {
  const value = e.target.value;
  // only for react useState value variable will be the initail value and after change value
  if (e.key === "Enter" || (value.length === 0 && e.key === " ")) {
    e.preventDefault();
  } else {
    if (value.endsWith(" ")) {
      e.preventDefault();
      return true;
    }
  }
};

export const checkNumber = (event) => {
  var k = event.keyCode;
  if (k === 9) {
    return true;
  }
  if (k !== 8) {
    if ((k < 48 || k > 57) && (k < 96 || k > 105)) {
      event.preventDefault();
      return false;
    }
  }
};

export const checkMobileNumber = (event) => {
  var value = event.target.value;
  var k = event.keyCode;
  if (k === 9) {
    return true;
  }
  if (parseInt(event.key) === 0 && value.length === 0) {
    event.preventDefault();
    return false;
  } else if (k !== 8) {
    if ((k < 48 || k > 57) && (k < 96 || k > 105)) {
      event.preventDefault();
      return false;
    }
  }
};

export const checkCharges = (event) => {
  var value = event.target.value;
  var k = event.keyCode;
  if (k === 9) {
    return true;
  }
  if (parseInt(event.key) === 0 && value.length === 0) {
    event.preventDefault();
    return false;
  } else if (k !== 8) {
    if (k === 110 || k === 190) {
      return true;
    }
    if ((k < 48 || k > 57) && (k < 96 || k > 105)) {
      event.preventDefault();
      return false;
    }
  }
};

export const ValidateAlpha = (event) => {
  var k = event.keyCode;
  if (k === 9) {
    return true;
  }
  if (k !== 8) {
    if (k > 31 && (k < 65 || k > 90) && (k > 97 || k < 122)) {
      event.preventDefault();
      return false;
    }
  }
};

export const datefromNow = function (date) {
  return Moment(date).fromNow();
};
