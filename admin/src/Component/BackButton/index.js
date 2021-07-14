import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #f44236 30%, #f44236 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px #f44236",
  },
  label: {
    textTransform: "capitalize",
  },
});

const Index = (props) => {
  const classes = useStyles();
  const handleclick = () => {
    props.onClick();
  };
  return (
    <Button
      classes={{
        root: classes.root,
        label: classes.label,
      }}
      size="large"
      color="primary"
      variant="contained"
      fullWidth
      onClick={() => handleclick()}
      startIcon={<ArrowBackIcon />}
    >
      Back
    </Button>
  );
};
export default Index;
